import * as Modals from '@/components/msgBox/modal';
import * as Toast from '@/components/msgBox/toast';
import { history } from '@/router';
import { message } from 'antd';
import { Observable, of } from 'rxjs';
import { ajax, AjaxRequest } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';
import { ResponseDataType } from '@/dto/request/response-data-type';
import { ResCodeType, LocalResCodeType } from '@/dto/request/code-type';
import { isObject } from 'lodash';
import { removeToken } from '@/utils/token-tool';
import { store } from '@/index';
import { createAction } from '@/utils/helpers';
import { actionApp } from '@/actions';

let jumpLock = false;

function processResponse(res) {
  const toLogin = () => history.replace('/login');

  if (isObject(res.response)) {
    const response = res.response as ResponseDataType<any>;
    switch (response.code) {
      case ResCodeType.AUTH_ERROR:
      case ResCodeType.LOGIN_ELSEWHERE_ERROR:
      case ResCodeType.ACCOUNT_BLOCKADE:
      case ResCodeType.PASSWORD_CHANGED:
        // token失效，其他地方或其他地方登录，账号禁用，则跳转登录页面
        sessionStorage.removeItem('userInfo');
        removeToken();
        // reducer中删除登录信息
        store.dispatch(createAction(actionApp.LOGOUT));
        Modals.alertError('提示', response.msg, toLogin, '确定', toLogin);
        break;

      case ResCodeType.IP_BLOCKADE:
        if (jumpLock === true) {
          break;
        }
        jumpLock = true;
        if (jumpLock) {
          // 处理多个接口都会走这里逻辑的问题
          // Toast.error(res.response.msg);
          sessionStorage.removeItem('userInfo');
          removeToken();
          store.dispatch(createAction(actionApp.LOGOUT));
          // history.replace('/login');
          Modals.alertError('提示', res.response.msg, toLogin, '确定', toLogin);
        }
        setTimeout(() => {
          jumpLock = false;
        }, 700);
        break;
      case ResCodeType.DEVICE_BLOCKADE:
        if (jumpLock === true) {
          break;
        }
        jumpLock = true;
        if (jumpLock) {
          // 处理多个接口都会走这里逻辑的问题
          sessionStorage.removeItem('userInfo');
          removeToken();
          store.dispatch(createAction(actionApp.LOGOUT));
          Modals.alertError('提示', res.response.msg, toLogin, '确定', toLogin);
        }
        setTimeout(() => {
          jumpLock = false;
        }, 700);
        break;
      case ResCodeType.SYSTEM_MAINTENANCE:
        history.replace('/maintenance');
        break;
    }
    return { data: response };
  }
  return {
    data: {
      code: LocalResCodeType.ERROR,
      data: null,
      msg: '请求异常，请重新尝试'
    }
  };
}

/**
 * @param  {string} url
 * @param  {object} options
 * @param  {boolean} isCheck
 * @returns Observable
 */
export default function request(
  options = {
    method: 'GET'
    // credentials: 'include'
  } as AjaxRequest,
  isCheck = true
): Observable<any> {
  if (!options.url) {
    alert('请求接口地址不能为空');
  }
  if (options && options.url) {
    if (
      options.url.includes('login') ||
      /queryBannerList$/i.test(options.url) ||
      /queryNoticeList$/i.test(options.url)
    ) {
      options.headers!['TB-TOKEN'] = '';
    }
  }
  return ajax({
    // withCredentials: true,
    ...options,
    // crossDomain: true,
    timeout: 30000
  }).pipe(
    map(processResponse),
    catchError(err => {
      const errStr = err.toString();
      if (errStr.indexOf('timeout') >= 0) {
        message.error('网络超时, 请重试', 1.5);
        return of({
          data: {
            code: LocalResCodeType.TIMEOUT,
            data: null,
            msg: '请求超时，请重新尝试'
          }
        });
      }

      if (err.status) {
        Toast.error(`网络异常：${err.status}`, 1);
      }

      return of({
        data: {
          code: LocalResCodeType.ERROR,
          data: null,
          msg: '请求异常，请重新尝试'
        }
      });
    })
  );
}

export interface OptionsType extends AjaxRequest {
  [key: string]: any;
  method?: 'GET' | 'POST' | 'DELETE' | 'OPTION' | 'PUT';
}

/**
 * 基本的请求方法
 * @param options
 */
export function baseRequest(
  options: OptionsType = { method: 'GET' }
): Observable<any> {
  return ajax({
    ...options,
    withCredentials: true,
    crossDomain: true,
    timeout: 15000
  });
}
