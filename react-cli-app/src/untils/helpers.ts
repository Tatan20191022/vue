import * as Modal from '@/components/msgBox/modal';
import { history } from '@/router';
import { Events } from '@/utils/eventProxy';
import { pieceAppkey } from '@/utils/serviceCommon';
import { message } from 'antd';
import { Base64 } from 'js-base64';
import * as _ from 'lodash';
import moment from 'moment';
import * as qs from 'qs';
import { DictFeedbackTypeListInterface } from './types';

/**
 * @param  {number} val
 * 选择时间范围, 例如'昨天'或'7天内'
 */
export function selectedDateRange(val) {
  let radioStartTime;
  let radioEndTime;
  switch (val) {
    // 今日
    case 0:
      radioStartTime = radioEndTime = moment().format('YYYY-MM-DD');
      break;
    // 昨日
    case 1:
      radioStartTime = radioEndTime = moment()
        .subtract(1, 'days')
        .format('YYYY-MM-DD');
      break;
    // 其他日期
    default:
      radioStartTime = moment()
        .subtract(val + 1, 'days')
        .format('YYYY-MM-DD');
      radioEndTime = moment()
        .subtract(1, 'days')
        .format('YYYY-MM-DD');
      break;
  }
  return [radioStartTime, radioEndTime];
}

/**
 *
 *
 * @param {number} val
 * @returns Moment
 * 根据传入的数值倒退当前天数
 */
export function getDayByNumber(val) {
  return moment()
    .subtract(val, 'days')
    .format('YYYY-MM-DD');
}

/**
 * @param  {string | number} val
 * 判断其他类型是否为空,不为空则返回原始值
 */
export function validateValue(val) {
  switch (val) {
    case '0':
      return undefined;
    case 'false':
      return undefined;
    case 0:
      return undefined;
    default:
      return val;
  }
}
// 本月第一天
export function showMonthFirstDay() {
  const now: any = new Date();
  const nowMonth: any = now.getMonth(); // 当前月
  const nowYear: any = now.getFullYear(); // 当前年
  return moment(new Date(nowYear, nowMonth, 1)).format('YYYY-MM-DD');
}

/**
 * @param  {string} format='YYYY-MM-DD'
 * 获取当前时间,默认按年月日返回
 */
export function momentGetNow(format = 'YYYY-MM-DD') {
  return moment().format(format);
}

export const getpattern = {
  mobile: /^1\d{10}$/,
  areaCode: /^\d+$/,
  fixedPhone: /^\d+$/,
  alphabetOrNumber: /^[A-Za-z0-9]+$/,
  characterOrNumber: /^[A-Za-z0-9\u4e00-\u9fa5]+$/,
  userName: /^[A-Za-z0-9\u4e00-\u9fa5]*[A-Za-z0-9]*$/,
  floatNumber: /^\d+(\.\d+)?$/,
  // 正数
  positiveNumber: /^([1-9]+(\.\d+)?)|(0\.\d+)$/,
  // 两位小数的正则
  TwoDecimalsNumber: /^([1-9]\d*(\.\d{1,2})?|0\.[1-9][0-9]?|0\.[0-9][1-9])$/,

  // 会员等级名称
  memberLevelName: /^([\u4e00-\u9fa5]{1,8}|[A-Za-z]{1,20})$/,
  // 整数;
  number: /^0|([1-9]\d*)$/,
  // 正整数
  positiveInteger: /^[1-9]\d*$/,
  // 1到90的正整数（天数限制）
  oneToNinety: /^[1-8][0-9]?$|^90$|^9$/,
  // 1 到 9999, 最大积分限制
  maxPoints: /^[1-9]\d{0,3}$/,
  // 1 到 99999, 最大积分限制
  maxPointsPlus: /^[1-9]\d{0,4}$/,
  // 消费的最大金额
  expenseMaxMoney: /^[1-9]\d{0,5}$/,
  // 固定电话正则:
  fixedNumber: /^\d{3,4}\-\d+(\-\d+)?$/,
  // 密码校验，只能输入数字和英文
  password: /^[A-Za-z0-9]+$/,
  // 真实姓名验证规则：   判断2-24位中文字符长度，
  // 仅允许中文、英文、空格和“•”   中文姓名，不允许出现空格，
  // 允许出现“•” , 空格和“•”不允许出现在第一位和最后一位
  realName: /(^[\u4E00-\u9FA5]((?!\.\.|\.•|•\.|\s\.|\.\s|••|•\s|\s•|\s{2,})[\u4E00-\u9FA5•\.]){0,22}[\u4E00-\u9FA5]$)|(^[a-zA-Z]((?!\.\.|\.•|•\.|\s\.|\.\s|••|•\s|\s•|\s{2,})[a-zA-Z\s•\.]){0,22}[a-zA-Z]$)/,
  // 会员卡升降级条件
  memberMaxPrice: /^[1-9]\d{0,7}$/,
  // 限制营业额指标 0-100000000;
  limitAmountTarget: /^[1-9]\d{0,8}$|^100000000$|^0$/,
  // 最大金额0-99999.99
  maxMoneyLimit: /^(0(?!\.0{1,2}$)(\.[0-9]{1,2})?|[1-9][0-9]{0,4}(\.[0-9]{1,2})?)$/,
  chinese: /[^\x00-\xff]+/
};

/**
 * @param  {object} SearchObj
 * 过滤没有数据的搜索参数
 */
export function validateSearChValue(SearchObj) {
  if (!SearchObj) {
    return;
  }
  const obj: any = {};
  Object.keys(SearchObj).forEach(key => {
    if (
      SearchObj[key] !== '' &&
      SearchObj[key] !== undefined &&
      SearchObj[key] !== null
    ) {
      obj[key] = SearchObj[key];
    }
  });
  return obj;
}

/**
 * @param  {string} startTime
 * @param  {string} endTime
 * 将时间转成天数差
 */
export function changeToDay(startTime, endTime) {
  const sday: any = moment(startTime);
  const eday: any = moment(endTime);
  return eday.diff(sday, 'days') + 1;
}

/**
 * @param  {string | array | object} param
 * 校验参数是否为空(空字符串、空数组、空对象等), 若为空则返回undefined
 */
export function validateParamIsEmptyAndTransferToUndefined(param) {
  if (_.isEmpty(param)) {
    return undefined;
  }
  return param;
}

/**
 * @param  {string} callerName
 * 作为装饰器装饰目标类方法, 以计算目标类方法的执行时间
 * 注意: 该装饰器会将this作用域指向类的实例中, 若需要监控的方法不能轻易改变this作用域则该方法建议不要使用
 */
export function calculExecuteTime(callerName: string) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const tempFunc = target[propertyKey];
    const proxyFunc = function(this: any, ...params) {
      let ret = undefined;
      console.time('runtime');
      ret = tempFunc.call(this, ...params);
      const str = console.timeEnd('runtime');
      console.info(`caller: ${callerName}`);
      return ret;
    };
    target[propertyKey] = proxyFunc;
    return target;
  };
}

/**
 * @param  {string} ...className
 * 解构react的className数组
 */
export function reactClassNameJoin(...className) {
  return className.join(' ');
}

/**
 * @param  {any} param
 */
export function returnResultByParam(param) {
  return (left, right) => {
    if (param) {
      return left;
    }
    return right;
  };
}

export const numTest = (str: string) => {
  return str.replace(/\D/g, '');
};
/**
 *
 *
 * @param {*} arr
 * @param {*} value
 * @returns boolean
 */
export function isInArray(arr, value) {
  for (let i = 0; i < arr.length; i++) {
    if (value === arr[i]) {
      return true;
    }
  }
  return false;
}

export function createAction<T>(type: string, payload?: T) {
  return {
    type,
    payload: payload || {}
  };
}

/**
 * 设置cookie
 * @param {string} name <cookie名称>
 * @param {string} value <cookie值>
 * @param {number} dateNum <cookie有效时间数值>
 * @param {string} dateType <cookie有效时间类型>
 * @param {string} path <Cookie设置的path>
 */
export function setCookie(
  name: string,
  value: string,
  dateNum?: number,
  dateType?: string,
  path = '/'
) {
  let cookieVal: string = `${name}=${escape(value)}`;

  if (dateNum) {
    const exp = new Date();

    exp.setTime(exp.getTime() + getDateTypeTime(dateNum, dateType));
    cookieVal += `;expires=${exp.toUTCString()};`;
  }
  // 增加默认path的限定
  cookieVal += ';path=/';
  document.cookie = cookieVal;
}

/**
 * 删除指定Cookie
 * @param name
 */
export function removeCookie(name: string): void {
  setCookie(name, '', new Date(0).getTime());
}

/**
 * 根据传入时间类型获对应取时间戳
 * @param {number} dateNum <时间数值>
 * @param {string} dateType <时间格式，如果不传默认返回天的时间戳>
 */
export function getDateTypeTime(dateNum: number, dateType?: string): number {
  const minuteTime: number = 60 * 1000;
  const hourTime: number = 60 * minuteTime;
  const dayTime: number = 24 * hourTime;

  switch (dateType) {
    case 'y':
      return dateNum * 365 * dayTime;
    case 'M':
      return dateNum * 30 * dayTime;
    case 'd':
      return dateNum * dayTime;
    case 'H':
      return dateNum * hourTime;
    case 'm':
      return dateNum * minuteTime;
    default:
      return dateNum * dayTime;
  }
}

export function setLocal(name, content) {
  if (!name) {
    return false;
  }
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

/**
 * 获取cookie
 * @param {string} name <需要获取cookie名>
 */
export function getCookie(name: string) {
  let arr: any;
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');

  if (isSSRMode()) {
    return '';
  }

  if ((arr = document.cookie.match(reg))) {
    return unescape(arr[2]);
  } else {
    return '';
  }
}

/**
 * 删除cookie
 * @param {string} name <需要删除的cookie名字>
 */
export function deleteCookie(name: string) {
  setCookie(name, '', -1);
}

export function isJudge(value) {
  return (trued, falsed) => {
    if (value) {
      return trued;
    } else {
      return falsed;
    }
  };
}

export function BrowserType() {
  const userAgent = window.navigator.userAgent;

  if (/^(?=.Safari)(?!.Chrome)/.test(userAgent)) {
    return 'Safari';
  }

  if (userAgent.indexOf('Edge') > -1) {
    return 'Edge';
  }

  if (userAgent.indexOf('Firefox') > -1) {
    return 'Firefox';
  }

  if (userAgent.indexOf('Chrome') > -1) {
    return 'Chrome';
  }

  if (userAgent.indexOf('.NET') > -1) {
    return 'IE';
  }
}
// 初始化排序通道列表
export function compare(property) {
  return (a, b) => {
    const before = a[property];
    const next = b[property];
    return before - next;
  };
}
// 用户进入活动页面触发需要登录的操作
export function isLoginToast() {
  message.error('您的操作需要先登录才能继续', 1);
}

export function isLogin(type?) {
  Events.trigger('response_401', 'logOut');
  const handleEvent = () => {
    if (type === 'login') {
      history.push('/login');
    } else {
      history.push('/app/home');
    }
  };
  Modal.Modal({
    title: '温馨提示',
    message: '请先登录账号,才能了解更多',
    buttonConfirm: '确定',
    buttonNumber: 1,
    type: 'error',
    onConfirm: handleEvent,
    onCancel: handleEvent,
    closeIcon: false,
    buttonClose: () => {
      const pathName = window.location.pathname.toLowerCase();
      if (pathName.includes('carnivalactivity')) {
        history.push('/app/home');
      }
    }
  });
}

// 返回2位小数字符串
export function Keep2strings(value) {
  if (value.indexOf('.') !== -1) {
    if (value.length - value.indexOf('.') > 3) {
      console.error(value);
      return value.substring(0, value.indexOf('.') + 3);
    } else {
      return getPlaceholderCount(value);
    }
  } else {
    return value;
  }
}
// 替换非数字字母
export const checkNumTest = (str: string) => {
  return str.replace(/[^(a-zA-Z0-9)]/g, '');
};
export const checkNumTest2 = (str: string) => {
  return str.replace(/[^(a-zA-Z0-9{@,.})]/g, '');
};
// 替换数字不含点的字符
export const checkNumTest3 = (str: string) => {
  return str.replace(/[(0-9{@,~！。$^ @#￥%：“”；\?<>`=+\-/&*（）？})]/g, '');
};
// 文字超过一定字数就显示省略号
export function overflowhiddenString(string, count = 5) {
  try {
    // 截取内容5个字符
    const subStr = string.substring(0, count);
    // 如果长度大于一定个数就添加省略号否则就添加空
    const data = subStr + (string.length > count ? '...' : '');
    return data;
  } catch (error) {
    console.log(error);
  }
}

// js统计字符串中包含的特定字符个数
function getPlaceholderCount(strSource) {
  const strArr = strSource.split('');
  let thisCount = 0;
  strArr.map((item, index) => {
    if (item === '.') {
      thisCount++;
    }
  });
  if (thisCount === 2) {
    return strSource.substring(0, strSource.length - 1);
  } else {
    return strSource;
  }
}

// 去左右空格;
export function trim(string) {
  return string.replace(/(^\s*)|(\s*$)/g, '');
}

export function getUrlParam(): any {
  try {
    const url = decodeURI(window.location.href);
    const thisParam = new Object();
    // 判断是否存在请求的参数
    if (url.indexOf('?') !== -1) {
      const str = url.split('?')[1];
      // 截取所有请求的参数，以数组方式保存
      const strs = str.split('&');
      for (let i = 0; i < strs.length; i++) {
        // 获取该参数名称，值。其中值以unescape()方法解码，有些参数会加密
        thisParam[strs[i].split('=')[0]] = strs[i].split('=')[1];
      }
    }
    // 返回改参数列表对象
    return thisParam;
  } catch (error) {
    return {};
  }
}

export function getUrlParamObj(): any {
  try {
    const str = window.location.href.split('?')[1];
    const urlArr = qs.parse(str);
    return urlArr;
  } catch (error) {
    return {};
  }
}

export function formatCollectCount(num) {
  // 判断是否小于0
  if (num < 0) {
    num = 0;
    return num;
    // 判断是否小于1W
  } else if (num < 10000) {
    return num + '元';
  }
  // 判断是否小于10W,或者大于等于10W
  if (num < 10000 * 10 && num >= 10000) {
    // 判断num求余之后是否大于0
    if (num % 10000 === 0) {
      // 返回该变量除于1W,返回多少W
      return num / 10000 + '万';
      // 否则该变量除于1W返回四舍五入保留2位小数
    } else {
      return (num / 10000).toFixed(2) + '万';
    }
  }
  // 判断是否小于100W或者大于等于10W
  if (num < 10000 * 100 && num >= 10000 * 10) {
    // 判断除余之后是否等于0
    if (num % 10000 === 0) {
      // 如果等于就返回除于1W后的个数
      return num / 10000 + '万';
      // 否则除于1W,四舍五入保留一位小数
    } else {
      return (num / 10000).toFixed(1) + '万';
    }
  }
  // 判断是否大于等于100W,条件成立返回四舍五入整数
  if (num >= 10000 * 100) {
    return Math.round(num / 10000) + '万';
  }
}

/**
 *
 *
 * @export
 * @param {array} args
 * @returns boolean
 * 接收若干个参数共同判断, 若一组参数全为true则函数返回true, 若有其中一个为false则函数返回false
 */
export function multiJudge(...args) {
  for (let i = 0; i < args.length; i++) {
    if (!args[i]) {
      return false;
    }
  }
  return true;
}

/**
 * 树形数据操作
 * @param {Array} treeData <树形数据体>
 * @param {String} labelKey <label对应key>
 * @param {String} childKey <子节点属性key>
 */
export class Tree {
  public data: Array<any>;
  public labelKey: string;
  public childKey: string;

  constructor(treeData: Array<any>, labelKey: string, childKey: string) {
    this.data = treeData;
    this.labelKey = labelKey;
    this.childKey = childKey;
  }

  /**
   * 根据父级获取子级
   * @memberof Tree
   */
  public getChilden = (parent: string, parents?: string): Array<any> => {
    let childer: Array<any> = [];
    const self = this;

    (function iterNode(list, _parent: any) {
      list.forEach((item: any) => {
        // 判断传入进来的父级的父级 和 当前遍历item的父级元素是否存在
        if (parents && _parent) {
          // 判断传入进来的父级的父级值 和 当前遍历item的父级元素的值是否相等
          // 并且当前item的值等于传入进来的父级值
          if (
            _parent[self.labelKey] === parents &&
            item[self.labelKey] === parent
          ) {
            // 直接返回当前item中的指定对象值
            return (childer = item[self.childKey]);
          } else {
            // 判断是否存在子对象
            if (item[self.childKey]) {
              iterNode(item[self.childKey], item);
            }
          }
        } else {
          // 判断当前item的值 和 传入进来的父级值是否相等
          if (item[self.labelKey] === parent) {
            // 直接返回当前item中的指定对象值
            return (childer = item[self.childKey]);
          } else {
            // 判断是否存在子对象
            if (item[self.childKey]) {
              iterNode(item[self.childKey], item);
            }
          }
        }
      });
    })(this.data, null);

    return childer;
  };

  /**
   * 根据子级获取父级
   * @memberof Tree
   */
  public getParent = (child: string): any => {
    let result: any = {};
    const self = this;

    (function iterNode(list, parent) {
      list.forEach((item: any) => {
        if (item[self.labelKey] === child) {
          return (result = parent);
        } else {
          if (item[self.childKey]) {
            iterNode(item[self.childKey], item);
          }
        }
      });
    })(this.data, {});

    return result;
  };
}

/**
 * 获取验证码图片url
 * @param {String} url <请求接口url>
 */
export const getValidateImgUrl = (url: string): Promise<any> => {
  url = `${url}?${qs.stringify(pieceAppkey())}`;
  return new Promise((resolve, reject) => {
    let xmlHttp;

    // xmlHttp兼容做处理
    if ((window as any).XMLHttpRequest) {
      xmlHttp = new XMLHttpRequest();
    } else {
      xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
    xmlHttp.open('get', url, true);
    xmlHttp.responseType = 'blob';
    xmlHttp.setRequestHeader('client-type', 'web');
    // 设置跨域请求
    // xmlHttp.withCredentials = true;

    // 监听请求状态
    xmlHttp.onreadystatechange = () => {
      const { status } = xmlHttp;

      if (status !== 200) {
        reject(new Error(status));
      }
    };

    xmlHttp.onload = (event: any) => {
      const response = event.target.response;
      const img = new Image();
      const code =
        xmlHttp.getResponseHeader('x-code') ||
        xmlHttp.getResponseHeader('X-Code') ||
        xmlHttp.getResponseHeader('X-CODE');

      img.src = window.URL.createObjectURL(response);
      img.onload = () => {
        resolve({
          url: img.src,
          code
        });
      };
    };

    xmlHttp.send();
  });
};

/**
 * 获取系统信息
 */
export const getSystemType = (): string => {
  const { userAgent } = window.navigator;
  let systemType = '';

  if (userAgent.indexOf('Windows') !== -1) {
    systemType = 'Windows';
  }
  if (userAgent.indexOf('Mac') !== -1) {
    systemType = 'Mac';
  }
  if (userAgent.indexOf('Linux') !== -1) {
    systemType = 'Linux';
  }
  return systemType;
};

/**
 * 去除前后空格
 * @param {string} str <传入的字符串>
 */
export function trimStr(str: string): string {
  return str.replace(/(^\s*)|(\s*$)/g, '');
}

/**
 * 启动第三方场馆url兼容处理
 * @param {string} strContent <传入字符串内容>
 */
export const startGameUri = (strContent: string): string => {
  let uri: string = '';

  if (strContent.indexOf('<iframe') !== -1) {
    const iframeReg = /<iframe.*?(?:>|\/>)/gi;
    const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
    const arr: any = strContent.match(iframeReg);

    for (let i = 0; i < arr.length; i++) {
      const src = arr[i].match(srcReg);

      if (src[1]) {
        uri = src[1];
      }
    }
  } else {
    uri = strContent;
  }

  return uri;
};

/**
 * 计算活动礼金
 * @param {string | number} money 申请金额
 * @param {string | number} rate 礼金比例
 * @param {string | number} lsyq 礼金倍数
 * @param {string | number} maxMonry 最大礼金
 */
export const calculationGift = (
  money: string | number = 0,
  rate: string | number = 0,
  lsyq: string | number = 0,
  maxMonry: string | number = 0
): any => {
  const moneyc = parseFloat(String(money)) * 100;
  const maxMonryc = parseFloat(String(maxMonry)) * 100;
  const lsyqc = parseInt(String(lsyq), 0);
  const ratec: number = parseInt(String(rate), 0) / 100;
  let lottery: number = ratec * moneyc; // 彩金
  let turnover: number = (lottery + moneyc) * lsyqc; // 流水

  if (lottery > maxMonryc) {
    lottery = maxMonryc;
    turnover = moneyc - lottery / ratec + (lottery / ratec + lottery) * lsyqc;
  }

  return {
    money: moneyc / 100,
    lottery: parseInt(String(lottery / 100), 0).toFixed(2),
    turnover: (Math.floor(turnover) / 100).toFixed(2)
  };
};

/**
 * 金额处理
 * @param {string | number} money 金额
 */
export const priceSwitch = (money: string | number) => {
  const spArr: Array<string> = parseFloat(String(money))
    .toFixed(2)
    .split('.');
  const num = spArr[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');

  return `${num}.${spArr[1]}`;
};
/**
 * 返回整数的金额
 * @param {string | number} money 金额
 */
export const parseIntPriceSwitch = (money: string | number) => {
  const spArr: Array<string> = parseFloat(String(money))
    .toFixed(2)
    .split('.');
  const num = spArr[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  return num;
};

/**
 * 保留两位小数，自动补充零
 * @param {string | number} money 金额
 */
export const returnFloat = (value: any) => {
  let num: any = Math.round(parseFloat(value) * 100) / 100;
  const xsd = num.toString().split('.');
  if (xsd.length === 1) {
    num = num.toString() + '.00';
    return num;
  }
  if (xsd.length > 1) {
    if (xsd[1].length < 2) {
      num = num.toString() + '0';
    }
    return num;
  }
};

/**
 * 是否整数或指定位数小数
 * @param value value值
 * @param bitNum 小数位数
 */
export const isNumOrFloat = (value: string, bitNum: number = 2) => {
  const reg = new RegExp(`^\\d+\\.?\\d{0,${bitNum}}$`);

  if (reg.test(value) || value === '') {
    return true;
  } else {
    return false;
  }
};

/**
 * 返回一个字符串，该字符串中的字母被转换为小写字母
 * @param {string} str 字符串
 * @example toLowerCase('YABO') => 'yabo'
 */
export const toLowerCase = (str: string): string => {
  return str ? str.toLowerCase() : '';
};

/**
 * 生成设备号
 */
export const generateDeviceNum = (): string => {
  let uuid = localStorage.getItem('uuid');
  // localStorage没有uuid就重新生成
  if (!uuid) {
    const { userAgent } = window.navigator;
    let systemType = '';
    if (userAgent.indexOf('Windows') !== -1) {
      systemType = 'windows';
    }
    if (userAgent.indexOf('Mac') !== -1) {
      systemType = 'mac';
    }
    if (userAgent.indexOf('Linux') !== -1) {
      systemType = 'linux';
    }
    uuid = `web-${systemType}-${Math.random()
      .toString(36)
      .substr(2)}-${Math.random()
      .toString(36)
      .substr(2)}`;
    localStorage.setItem('uuid', uuid);
  }

  return uuid;
};

/**
 * 替换非数字、非小数点
 * @param str 输入的值
 */
export const replaceFloatNumber = (str: string) => {
  return str.replace(/[^\d.]+/g, '').replace(/\.+/g, '.');
};

/**
 * 替换非数字
 * @param str 输入的值
 */
export const replaceNumber = (str: string) => {
  return str.replace(/[^\d]/g, '');
};
export const replaceSpace = (str: string) => {
  return str.replace(/\s/g, '');
};
/*
 * 是否包含中文
 * @param {string} s <传入字符串>
 */
export const isChina = (s: string) => {
  // [\u4E00-\u9FA5]表示汉字，[\uFE30-\uFFA0]表示全角
  const patrn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;

  if (!patrn.exec(s)) {
    return false;
  } else {
    return true;
  }
};

/**
 * 判断是否支持webp图片格式
 */
export const checkWebp = (): boolean => {
  try {
    // 因Safari浏览器不兼容webp，所以排除Safari
    if (BrowserType() === 'Safari') {
      return false;
    } else {
      return (
        document
          .createElement('canvas')
          .toDataURL('image/webp')
          .indexOf('data:image/webp') === 0
      );
    }
  } catch (err) {
    return false;
  }
};

/**
 * 判断是否存在某个字符串
 *  @param {string} judgeStr <需要判断的字符串>
 *  @param {string} string <原字符串>
 */
export const existString = (judgeStr: string, string: string): boolean => {
  try {
    if (string.indexOf(judgeStr) > -1) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

// 是否支持webp图片格式标识
export const isWebp: boolean = checkWebp();

/**
 * 生成webp格式图片
 * @param {string} url <静态资源路径>
 */
export const webp = (url: string): string => {
  if (isWebp) {
    return `${url}.webp`;
  } else {
    return url;
  }
};

/**
 * 组合静态资源链接地址
 * @param {string} url 静态资源链接
 * @example staticLink('/assets/dome.png') => /assets/dome.png?__static_hash__
 */
export const staticLink = (url: string): string => {
  if (existString('.mp4', url)) {
    return `${url}?__static_hash__`;
  } else {
    return `${webp(url)}?__static_hash__`;
  }
};

/**
 * 判断是否是SSR模式
 */
export const isSSRMode = (): boolean => process.env.SSR === 'server';

/**
 * 获取服务器时间
 */
export const getServerTime = async (): Promise<number> => {
  return new Promise((resolve, reject) => {
    try {
      let xmlhttp;
      const url: string = '/api/base/sysBasic/v1/getSysTime';

      // xmlHttp兼容做处理
      if (XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
      } else {
        xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
      }

      xmlhttp.open('POST', url, true);
      xmlhttp.setRequestHeader('TB-CLIENT-TYPE', 'web');
      xmlhttp.setRequestHeader('TB-TOKEN', 'HsrfTRj0s0ki4s2uLNDeB2qlYkIHvNZC');

      // 设置超时时间
      xmlhttp.timeout = 5000;

      // 监听请求状态
      xmlhttp.onreadystatechange = () => {
        try {
          const { status, readyState } = xmlhttp;
          if (status === 200 && readyState === 4) {
            const res = JSON.parse(xmlhttp.responseText);
            resolve(res.data.timeStamp);
          }
        } catch (e) {
          reject(e);
        }
      };
      // 超时处理
      xmlhttp.ontimeout = e => {
        reject(e);
      };
      xmlhttp.onerror = e => {
        reject(e);
      };
      xmlhttp.send();
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * 本地时间与服务器时间比较
 */
export const compareTime = (st): any => {
  const lt: number = new Date().getTime();
  const dt: number = st - lt;
  // 最大限制2分钟差值
  const maxDiff = 2 * 60 * 1000;

  if (Math.abs(dt) >= maxDiff && st > 0) {
    return {
      time: st,
      flag: true
    };
  } else {
    return {
      time: st,
      flag: false
    };
  }
};

/**
 * 本地时间与服务器时间差值
 */
// export const timeDiff = async () => {
//   let time: number = 0;
//   // try {
//   //   time = await getServerTime();
//   // } catch (error) {
//   //   console.log(error);
//   // }
//   return compareTime(time);
// };

/**
 * 字符串加密
 * @param {string} str {需要加密的字符串}
 */
export const encodeStr = (str: string | null | undefined = ''): string => {
  if (!str) {
    return '';
  }

  // 切割字符串成为数组
  const arrStr = str.split('');

  // 判断字符串长度
  if (arrStr.length >= 4) {
    // 使用结构性赋值调换字符串位置，字符串下标0与字符串下标2调换，字符串下标1与字符串下标3调换
    [arrStr[0], arrStr[1], arrStr[2], arrStr[3]] = [
      arrStr[2],
      arrStr[3],
      arrStr[0],
      arrStr[1]
    ];
  }

  // 将调换后的字符串进行base64加密
  const enStr = Base64.encode(arrStr.join(''));

  return enStr;
};

/**
 * 字符串加密
 * @param {string} str {需要解密的字符串}
 */
export const decodeStr = (str: string | null | undefined = ''): string => {
  if (!str) {
    return '';
  }

  // 使用base64将字符串进行解密，再切割成数组
  const arrStr = Base64.decode(str).split('');

  // 判断字符串长度
  if (arrStr.length >= 4) {
    // 使用结构性赋值调换字符串位置，字符串下标0与字符串下标2调换，字符串下标1与字符串下标3调换
    [arrStr[2], arrStr[3], arrStr[0], arrStr[1]] = [
      arrStr[0],
      arrStr[1],
      arrStr[2],
      arrStr[3]
    ];
  }

  return arrStr.join('');
};

/**
 * 获取上一次路由
 */
export const getLastRoute = () => {
  const lastRoute = sessionStorage.getItem('lastRoute')
    ? sessionStorage.getItem('lastRoute')
    : '';
  return lastRoute;
};

/**
 * 设置波动值
 * @param str 需要修改波动的值
 * @param min 最低波动值，默认为0
 * @param max 最高波动值，默认为0
 * @param status 波动状态，true为加，false为减，默认为true
 */
export const setVolatilityNumber = (
  str: number,
  min: number,
  max: number,
  status: boolean = true
): number => {
  if (str) {
    let newStr = str;
    const random = Math.floor(Math.random() * (max - min + 1)) + min; //  随机范围
    newStr = status ? newStr + random : newStr - random; // 处理加或减
    newStr = newStr <= 0 ? 1 : newStr; // 减少后不能为0或负数，最少为1
    return newStr;
  }
  return str;
};

/**
 * 打开页面
 * @param url 需要打开的地址
 */

export const turnToLink = (url: string, type: string = 'open') => {
  if (type === 'open') {
    window.open(url);
  } else {
    window.location.href = url;
  }
};

// 数据字典字符串转map
export const dictFeedbackTypeListToMap = (
  list: DictFeedbackTypeListInterface[]
) => {
  const temp = {} as any;
  list.map(item => {
    temp[item.sort] = item;
  });
  return temp;
};
/**
 * VIP icon
//  */
// export const vipimg = {
//   0: require('@/routes/vip/img/vip0.png'),
//   1: require('@/routes/vip/img/vip1.png'),
//   2: require('@/routes/vip/img/vip2.png'),
//   3: require('@/routes/vip/img/vip3.png'),
//   4: require('@/routes/vip/img/vip4.png'),
//   5: require('@/routes/vip/img/vip5.png'),
//   6: require('@/routes/vip/img/vip6.png'),
//   7: require('@/routes/vip/img/vip7.png'),
//   8: require('@/routes/vip/img/vip8.png'),
//   9: require('@/routes/vip/img/vip9.png'),
//   10: require('@/routes/vip/img/vip10.png')
// };

// export const vipMedalImg = {
//   0: require('@/routes/vip/img/vipmedal0.png'),
//   1: require('@/routes/vip/img/vipmedal1.png'),
//   2: require('@/routes/vip/img/vipmedal2.png'),
//   3: require('@/routes/vip/img/vipmedal3.png'),
//   4: require('@/routes/vip/img/vipmedal4.png'),
//   5: require('@/routes/vip/img/vipmedal5.png'),
//   6: require('@/routes/vip/img/vipmedal6.png'),
//   7: require('@/routes/vip/img/vipmedal7.png'),
//   8: require('@/routes/vip/img/vipmedal8.png'),
//   9: require('@/routes/vip/img/vipmedal9.png'),
//   10: require('@/routes/vip/img/vipmedal10.png')
// };

/**
 * 寻找json中birthCash不为0的第一项
 */
export const getBirthCashIndex = arr => {
  let result;
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    if (element.birthCash > 0) {
      result = index;
      break;
    }
  }
  return result;
};

export function getNextBirth(birthday: string) {
  let nextBirth;
  const current = `${moment().year()}-${moment(birthday).month() + 1}-${moment(
    birthday
  ).date()}`;

  if (moment(current).isBefore(moment())) {
    nextBirth = `${moment().year() + 1}-${moment(birthday).month() +
      1}-${moment(birthday).date()}`;
  } else {
    nextBirth = current;
  }
  return nextBirth;
}

// export function getPercent(
//   totalRecharge,
//   upgradeDeposit,
//   totalRecord,
//   upgradeFlows
// ) {
//   const percent: number =
//     (totalRecharge / upgradeDeposit + totalRecord / upgradeFlows) / 2;
//   if (
//     percent > 0.99 &&
//     (totalRecharge < upgradeDeposit || totalRecord < upgradeFlows)
//   ) {
//     percent = 1 * 100;
//   }
//   return percent * 100 || 0;
// }

export function getNextGrade(vipGrade, memberGradeConfigList) {
  if (vipGrade + 1 === memberGradeConfigList.length) {
    return vipGrade;
  } else {
    return vipGrade + 1;
  }
}

export function dispablePaste(e: any) {
  const val = e.clipboardData.getData('text');

  if (val && (val.includes(' ') || getpattern.chinese.test(val))) {
    e.preventDefault();
    return false;
  }
  return true;
}

export function toDecimal(money: number | string) {
  // return numSeparatorFormat(numTransPercentile(money));
  if (isNaN(money as any)) {
    money = 0;
  }
  return Number(money).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

/**
 * 判断用户是否登录
 */
export const isLogged = () => {
  return !!sessionStorage.getItem('tb-token');
};
/**
 * 判断是否火狐浏览器
 */
export const isFireFox = () => {
  if (navigator.userAgent.indexOf('Firefox') > 0) {
    return true;
  } else {
    return false;
  }
};

export function setFavicon(url: string) {
  const heads = Array.from(document.head.children);
  const icon = heads.find(
    x => x.tagName === 'LINK' && (x as HTMLLinkElement).rel.indexOf('icon') > -1
  ) as HTMLLinkElement;
  if (icon && icon.href !== url) {
    document.head.removeChild(icon);
    const _icon = document.createElement('link');
    _icon.rel = 'shortcut icon';
    _icon.href = url.replace(/(http|https):/, '');
    document.head.append(_icon);
  }
}

// 千位分隔符
export const formatNumberRgx = num => {
  const parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

// vip反水列表判断
export const percenViP = (min, max) => {
  return Number(min).toFixed(2) === Number(max).toFixed(2)
    ? Number(min).toFixed(2) === '0.00'
      ? '-'
      : Number(min).toFixed(2) + '%'
    : Number(min).toFixed(2) + '%-' + Number(max).toFixed(2) + '%';
};

// Myvip反水列表判断
export const percenMviP = max => {
  return Number(max).toFixed(2) === '0.00' ? '-' : Number(max).toFixed(2) + '%';
};
/**
 * 截取视频第一帧作为占位图片
 *
 * @param {string} videoElId
 * @param {string} imgElId
 */
export const getVideoFirstFrame = (videoElId: string, imgElId: string) => {
  let video;
  const scale = 1;
  // debugger;
  const initialize = () => {
    // output = document.getElementById('output');
    video = document.getElementById(videoElId);

    const captureImage = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth * scale;
      canvas.height = video.videoHeight * scale;
      if (canvas) {
        canvas
          .getContext('2d')
          .drawImage(video, 0, 0, canvas.width, canvas.height);
      }

      const img = document.getElementById(imgElId) as HTMLImageElement;
      if (img) {
        // debugger;
        img.src = canvas.toDataURL('image/png');
      }
      // output.appendChild(img);
    };

    video.addEventListener('loadeddata', captureImage);
  };

  initialize();
};

/**
 * 判断体育场馆是否开启
 *
 * @export
 * @param {*} props
 * @param {string} venueCode
 * @returns
 */
export function sportIsOpen(props: any, venueCode: string) {
  let result = false;
  if (props.app.venues && Object.keys(props.app.venues).length) {
    if (props.app.venues.ty) {
      const ty = props.app.venues.ty.find(x => x.channelCode === venueCode);
      result = (ty && ty.status === 0) || false;
    }
  }
  if (!result) {
    history.push('/app/home');
  }
  return result;
}
