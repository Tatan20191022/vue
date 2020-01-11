import {Observable,pipe,of,from } from 'rxjs';
import {map,mapTo,mergeMap,startWith,endWith} from 'rxjs/operators';
import {Epic,ofType} from 'redux-observable';
import ajax from '../helpers/ajax';
import gameData from '../static_data/gameData'


// actions$ action被封装成Observable对象传入到函数内部
export const learn=(actions$,store)=>{
    return actions$.pipe(
        // ofType 匹配相应的action
        ofType('actionsString'),
        // mergeMap 返回新的Observable对象，后续方法取消action$的订阅，而订阅返回新的http对象
        mergeMap(action=>{
            return ajax({
                url:gameData,
                method:'GET',
                responseType:'json'
            }).pipe(
                map(res=>{
                    console.log(res)
                    try{
                        return res
                    } catch(err){
                        return console.error(res.err);
                    }
                })
            )
            
        })
    )
}


import { Observable, pipe, of, from } from 'rxjs';

import {
  map,
  mapTo,
  mergeMap,
  concat,
  concatMap,
  startWith,
  endWith
} from 'rxjs/operators';

import { Epic, ofType } from 'redux-observable';

import { PreferentialActivityStoreType } from '@/reducers/preferentialActivityPageReducer';

import { preferentialActivityAPI, cgAPI } from '@/services';

import { promoAPI } from '@/services';

import { helpers } from '@/utils';

import * as _ from 'lodash';

import * as Modals from '@/components/msgBox/modal';

import * as Toast from '@/components/msgBox/toast';
import { any, object } from 'prop-types';

interface Payload {
  [random: string]: any;
}
// dispatch传进来的action类型
interface PayloadIn {
  type: string;
  payload: {
    [random: string]: any;
  };
  handleCallback?: (value?: any) => void;
}
// epic传到reducer里的action类型
interface PayloadOut {
  type: string;
  payload: {
    [random: string]: any;
  };
}

export const fetchData: Epic<
  PayloadIn,
  PayloadOut,
  PreferentialActivityStoreType
> = (action$, store) => {
  return action$.pipe(
    ofType('preferentialActivity/fetchData'),
    mergeMap(action => {
      return promoAPI.fetchData(action.payload).pipe(
        map(res => {
          try {
            if (res.data.code === 0) {
              return helpers.createAction<Payload>(
                'preferentialActivity/getActivesReducer',
                res
              );
            }
            return helpers.createAction<typeof action.payload>(
              '@@ty/loadingHide'
            );
          } catch (err) {
            return helpers.createAction<typeof action.payload>(
              '@@ty/loadingHide'
            );
          }
        }),
        startWith(helpers.createAction<Payload>('@@ty/loadingShow')),
        endWith(helpers.createAction<Payload>('@@ty/loadingHide'))
      );
    })
  );
};

export const itemClick: Epic<
  PayloadIn,
  PayloadOut,
  PreferentialActivityStoreType
> = (action$, store) => {
  return action$.pipe(
    ofType('preferentialActivity/itemClick'),
    mergeMap(action => {
      return promoAPI.itemClick(action.payload).pipe(
        map(res => {
          try {
            if (res.data.code === 0) {
              return helpers.createAction<Payload>(
                'preferentialActivity/itemClickReducer',
                res
              );
            }
          } catch (err) {
            console.error(err);
          }
          return helpers.createAction<Payload>('@@ty/loadingHide');
        }),
        startWith(helpers.createAction<Payload>('@@ty/loadingShow')),
        endWith(helpers.createAction<Payload>('@@ty/loadingHide'))
      );
    })
  );
};

// 获取红利
export const getRedLi: Epic<
  PayloadIn,
  PayloadOut,
  PreferentialActivityStoreType
> = (action$, store) => {
  return action$.pipe(
    ofType('preferentialActivity/redLi'),
    mergeMap(action => {
      return promoAPI.getRedLi(action.payload).pipe(
        map(res => {
          try {
            if (res.data.code === 0) {
              if (action.payload.callBack) {
                action.payload.callBack({
                  redLi: res.data.data
                });
              }
              return helpers.createAction<Payload>(
                'preferentialActivity/redLiReducer',
                res
              );
            }
          } catch (err) {
            console.error(err);
          }
          return helpers.createAction<Payload>('@@ty/loadingHide');
        }),
        startWith(helpers.createAction<Payload>('@@ty/loadingShow')),
        endWith(helpers.createAction<Payload>('@@ty/loadingHide'))
      );
    })
  );
};

// 参加活动。
export const getJoin: Epic<
  PayloadIn,
  PayloadOut,
  PreferentialActivityStoreType
> = (action$, store) => {
  return action$.pipe(
    ofType('preferentialActivity/getJoin'),
    mergeMap(action => {
      return cgAPI.getJoin(action.payload).pipe(
        map(res => {
          try {
            if (action.payload.callBack) {
              action.payload.callBack({
                data: res.data
              });
            }
            return helpers.createAction<Payload>(
              'preferentialActivity/getBalanceReducer',
              res
            );
          } catch (err) {
            // console.error(err);
          }
          return helpers.createAction<Payload>('@@ty/loadingHide');
        }),
        startWith(helpers.createAction<Payload>('@@ty/loadingShow')),
        endWith(helpers.createAction<Payload>('@@ty/loadingHide'))
      );
    })
  );
};

// 是否有资格参加活动
export const Isjoin: Epic<
  PayloadIn,
  PayloadOut,
  PreferentialActivityStoreType
> = (action$, store) => {
  return action$.pipe(
    ofType('preferentialActivity/Isjoin'),
    mergeMap(action => {
      return cgAPI.Isjoin(action.payload).pipe(
        map(res => {
          try {
            const data = res.data;
            if (action.payload.callBack) {
              action.payload.callBack({
                data
              });
            }
            return helpers.createAction(
              'preferentialActivity/IsjoinDataReducer',
              { data }
            );
          } catch (err) {
            // console.error(err);
          }
          return helpers.createAction<Payload>('@@ty/loadingHide');
        }),
        startWith(helpers.createAction<Payload>('@@ty/loadingShow')),
        endWith(helpers.createAction<Payload>('@@ty/loadingHide'))
      );
    })
  );
};

// 获取场馆金额
export const getBalance: Epic<
  PayloadIn,
  PayloadOut,
  PreferentialActivityStoreType
> = (action$, store) => {
  return action$.pipe(
    ofType('preferentialActivity/getBalance'),
    mergeMap(action => {
      const gift = { ...action.payload.gift } as any;
      return cgAPI.getVenuesBalance(action.payload).pipe(
        map(res => {
          try {
            if (Number(res.data.code) === 0) {
              console.log('平台余额', res);
              return helpers.createAction<Payload>(
                'preferentialActivity/getBalanceReducer'
              );
            }
          } catch (err) {
            // console.error(err);
          }
          return helpers.createAction<Payload>('@@ty/loadingHide');
        }),
        startWith(helpers.createAction<Payload>('@@ty/loadingShow')),
        endWith(helpers.createAction<Payload>('@@ty/loadingHide'))
      );
    })
  );
};
// 检查详情活动
export const applyOffer: Epic<
  PayloadIn,
  PayloadOut,
  PreferentialActivityStoreType
> = (action$, store) => {
  return action$.pipe(
    ofType('preferentialActivity/applyOffer'),
    mergeMap(action => {
      const params = _.omit(action.payload, 'hd_type');
      const hd_type = _.get(action.payload, 'hd_type');
      return promoAPI.applyOffer(params).pipe(
        map(res => {
          try {
            if (res.data.code === 0) {
              if (action.payload.callBack) {
                return res.data;
              }
              if (action.payload.check_activity) {
                return helpers.createAction<Payload>(
                  'app/setCheckActivityStatusReducer',
                  {
                    status: true
                  }
                );
              } else {
                Modals.alertSuccess('提示', res.data.msg);
              }
            } else {
              Modals.alertError('提示', res.data.msg);
            }
            return helpers.createAction<Payload>('@@ty/loadingHide');
          } catch (err) {
            const resErr: any = {
              status_code: 403,
              message: '网络超时'
            };
            return helpers.createAction<Payload>('@@ty/loadingHide');
          }
        }),
        startWith(helpers.createAction<Payload>('@@ty/loadingShow')),
        endWith(helpers.createAction<Payload>('@@ty/loadingHide'))
      );
    })
  );
};

// 通过指定活动id获取优惠详情
export const queryPromoById: Epic<
  PayloadIn,
  PayloadOut,
  PreferentialActivityStoreType
> = (action$, store) => {
  return action$.pipe(
    ofType('preferentialActivity/queryPromoById'),
    mergeMap(action => {
      return promoAPI.queryPromoById(action.payload).pipe(
        map(res => {
          try {
            if (Number(res.data.code) === 0) {
              console.log('itemxiangq', res);
              if (action.payload.callBack) {
                action.payload.callBack({
                  item: res.data.data
                });
              }
              return helpers.createAction<Payload>(
                'preferentialActivity/setPreferentialDataReducer',
                {
                  // data: {
                  //   apiList: res.data.data.api_list,
                  //   item: res.data.data.data[0]
                  // }
                  ...res.data
                }
              );
            } else {
              Toast.error(res.data.msg);
              return helpers.createAction<Payload>('@@ty/loadingHide');
            }
          } catch (err) {
            // console.error(err);
          }
          return helpers.createAction<Payload>('@@ty/loadingHide');
        }),
        startWith(helpers.createAction<Payload>('@@ty/loadingShow')),
        endWith(helpers.createAction<Payload>('@@ty/loadingHide'))
      );
    })
  );
};

// 详情预览
export const detailPreview: Epic<
  PayloadIn,
  PayloadOut,
  PreferentialActivityStoreType
> = (action$, store) => {
  return action$.pipe(
    ofType('preferentialActivity/detailPreview'),
    mergeMap(action => {
      return promoAPI.detailPreview(action.payload).pipe(
        map(res => {
          try {
            if (Number(res.data.status_code) === 0) {
              console.log('yyyy', res);
              if (action.payload.callBack) {
                action.payload.callBack({
                  apiList: res.data.data.api_list,
                  item: res.data.data.data[0]
                });
              }
              return helpers.createAction<Payload>(
                'preferentialActivity/setPreferentialDataReducer',
                {
                  data: {
                    apiList: res.data.data.api_list,
                    item: res.data.data.data[0]
                  }
                }
              );
            } else {
              Toast.error(res.data.msg);
              return helpers.createAction<Payload>('@@ty/loadingHide');
            }
          } catch (err) {
            // console.error(err);
          }
          return helpers.createAction<Payload>('@@ty/loadingHide');
        }),
        startWith(helpers.createAction<Payload>('@@ty/loadingShow')),
        endWith(helpers.createAction<Payload>('@@ty/loadingHide'))
      );
    })
  );
};

// 获取活动配置
export const getFiveConfig: Epic<
  PayloadIn,
  PayloadOut,
  PreferentialActivityStoreType
> = (action$, store) => {
  return action$.pipe(
    ofType('preferentialActivity/getFiveConfig'),
    mergeMap(action => {
      return promoAPI.getFiveConfig(action.payload).pipe(
        map(res => {
          try {
            if (Number(res.data.status) === 6000) {
              return helpers.createAction<typeof action.payload>(
                'preferentialActivity/setFiveConfigReducer',
                {
                  data: res.data.result
                }
              );
            }
            return helpers.createAction<typeof action.payload>(
              '@@ty/loadingHide'
            );
          } catch (err) {
            return helpers.createAction<typeof action.payload>(
              '@@ty/loadingHide'
            );
          }
        })
      );
    })
  );
};

// 活动礼金奖励列表
export const getFiveGiftMoneyList: Epic<
  PayloadIn,
  PayloadOut,
  PreferentialActivityStoreType
> = (action$, store) => {
  return action$.pipe(
    ofType('preferentialActivity/getFiveGiftMoneyList'),
    mergeMap(action => {
      return promoAPI.getFiveGiftMoneyList(action.payload).pipe(
        map(res => {
          try {
            if (Number(res.data.status) === 6000) {
              return helpers.createAction<typeof action.payload>(
                'preferentialActivity/setFiveMoneyListReducer',
                {
                  data: res.data.result
                }
              );
            }
            return helpers.createAction<typeof action.payload>(
              '@@ty/loadingHide'
            );
          } catch (err) {
            return helpers.createAction<typeof action.payload>(
              '@@ty/loadingHide'
            );
          }
        })
      );
    })
  );
};

// 对战信息列表
export const getFiveBattleList: Epic<
  PayloadIn,
  PayloadOut,
  PreferentialActivityStoreType
> = (action$, store) => {
  return action$.pipe(
    ofType('preferentialActivity/getFiveBattleList'),
    mergeMap(action => {
      return promoAPI.getFiveBattleList(action.payload).pipe(
        map(res => {
          try {
            if (Number(res.data.status) === 6000) {
              return helpers.createAction<typeof action.payload>(
                'preferentialActivity/setFiveBattleListReducer',
                {
                  data: res.data.result
                }
              );
            }
            return helpers.createAction<typeof action.payload>(
              '@@ty/loadingHide'
            );
          } catch (err) {
            return helpers.createAction<typeof action.payload>(
              '@@ty/loadingHide'
            );
          }
        })
      );
    })
  );
};

/**
 * 获取红包雨规则及比赛信息
 */
export const getRedBagRainInfo: Epic<
  PayloadIn,
  PayloadOut,
  PreferentialActivityStoreType
> = (action$, store) => {
  return action$.pipe(
    ofType('redBagRain/getBattleInfo'),
    mergeMap(action => {
      return promoAPI.getBattleInfo(action.payload).pipe(
        map(res => {
          try {
            if (Number(res.data.status_code) === 200) {
              return helpers.createAction<typeof action.payload>(
                'preferentialActivity/setRedBagInfoReducer',
                {
                  data: res.data.result
                }
              );
            } else {
              Toast.error(res.data.msg, 1);
            }
            return helpers.createAction<typeof action.payload>(
              '@@ty/loadingHide'
            );
          } catch (error) {
            return helpers.createAction<typeof action.payload>(
              '@@ty/loadingHide'
            );
          }
        }),
        startWith(helpers.createAction<Payload>('@@ty/loadingShow')),
        endWith(helpers.createAction<Payload>('@@ty/loadingHide'))
      );
    })
  );
};

// 在未登录状态下获取礼品信息及活动相关配置内容
export const getLuxuryGiftConfig: Epic<
  PayloadIn,
  PayloadOut,
  PreferentialActivityStoreType
> = (action$, store) => {
  return action$.pipe(
    ofType('preferentialActivity/getLuxuryGiftConfig'),
    mergeMap(action => {
      return promoAPI.getLuxuryGiftConfig(action.payload).pipe(
        map(res => {
          try {
            if (Number(res.data.status_code) === 200) {
              return helpers.createAction<typeof action.payload>(
                'preferentialActivity/getLuxuryGiftConfigReducer',
                {
                  data: res.data.result
                }
              );
            }
            return helpers.createAction<typeof action.payload>(
              '@@ty/loadingHide'
            );
          } catch (err) {
            return helpers.createAction<typeof action.payload>(
              '@@ty/loadingHide'
            );
          }
        })
      );
    })
  );
};

// 会员登录后展示礼品信息数据
export const getMembersLuxuryGift: Epic<
  PayloadIn,
  PayloadOut,
  PreferentialActivityStoreType
> = (action$, store) => {
  return action$.pipe(
    ofType('preferentialActivity/getMembersLuxuryGift'),
    mergeMap(action => {
      return promoAPI.getMembersLuxuryGift(action.payload).pipe(
        map(res => {
          try {
            if (Number(res.data.status_code) === 200) {
              return helpers.createAction<typeof action.payload>(
                'preferentialActivity/getMembersLuxuryGiftReducer',
                {
                  data: res.data.result
                }
              );
            }
            return helpers.createAction<typeof action.payload>(
              '@@ty/loadingHide'
            );
          } catch (err) {
            return helpers.createAction<typeof action.payload>(
              '@@ty/loadingHide'
            );
          }
        })
      );
    })
  );
};

/**
 * 豪礼兑换接口
 */
export const luxuryGiftExchange: Epic<
  PayloadIn,
  PayloadOut,
  PreferentialActivityStoreType
> = (action$, store) => {
  return action$.pipe(
    ofType('preferentialActivity/luxuryGiftExchange'),
    mergeMap(action => {
      return promoAPI.luxuryGiftExchange(action.payload).pipe(
        map(res => {
          const actions: Array<any> = [
            helpers.createAction<typeof action.payload>('@@ty/loadingHide')
          ];
          try {
            if (Number(res.data.status_code) === 200) {
              actions.push(
                helpers.createAction<typeof action.payload>(
                  'preferentialActivity/luxuryGiftExchangeSuccessReducer',
                  {
                    data: true
                  }
                )
              );
              actions.push(
                helpers.createAction<typeof action.payload>(
                  'preferentialActivity/getMembersLuxuryGift'
                )
              );
            } else {
              Toast.error(res.data.msg, 1);
            }
            return from(actions);
          } catch (error) {
            const dataErr = {
              status_code: 403,
              message: '网络超时'
            };
            return from(actions);
          }
        }),
        startWith(of(helpers.createAction<Payload>('@@ty/loadingShow'))),
        endWith(of(helpers.createAction<Payload>('@@ty/loadingHide')))
      );
    }),
    concatMap(actions => actions)
  );
};

/**
 * 获取豪礼活动兑换提示接口
 */
export const luxuryGiftRemind: Epic<
  PayloadIn,
  PayloadOut,
  PreferentialActivityStoreType
> = (action$, store) => {
  return action$.pipe(
    ofType('preferentialActivity/luxuryGiftRemind'),
    mergeMap(action => {
      return promoAPI.luxuryGiftRemind(action.payload).pipe(
        map(res => {
          try {
            if (Number(res.data.status_code) === 200) {
              return helpers.createAction<typeof action.payload>(
                'preferentialActivity/luxuryGiftRemindReducer',
                {
                  data: true
                }
              );
            } else if (Number(res.data.status_code) === 806) {
              Toast.error(res.data.data, 1);
            } else if (Number(res.data.status_code) === 807) {
              Modals.Modal({
                title: '温馨提示',
                message: res.data.data,
                buttonConfirm: '确定',
                buttonNumber: 1,
                isShowIcon: false
              });
            } else {
              Toast.error(res.data.msg, 1);
            }
            return helpers.createAction<typeof action.payload>(
              '@@ty/loadingHide'
            );
          } catch (error) {
            return helpers.createAction<typeof action.payload>(
              '@@ty/loadingHide'
            );
          }
        }),
        startWith(helpers.createAction<Payload>('@@ty/loadingShow')),
        endWith(helpers.createAction<Payload>('@@ty/loadingHide'))
      );
    })
  );
};

/*
 * 获取欧洲双人行信息
 */
export const getTicketList: Epic<
  PayloadIn,
  PayloadOut,
  PreferentialActivityStoreType
> = (action$, store) => {
  return action$.pipe(
    ofType('europeanCouples/getTicketList'),
    mergeMap(action => {
      return preferentialActivityAPI.getTicketList(action.payload).pipe(
        map(res => {
          try {
            if (Number(res.data.status_code) === 200) {
              return helpers.createAction<typeof action.payload>(
                'preferentialActivity/getTicketListReducer',
                {
                  data: res.data.result
                }
              );
            } else {
              Toast.error(res.data.msg, 1);
            }

            return helpers.createAction<typeof action.payload>(
              '@@ty/loadingHide'
            );
          } catch (error) {
            return helpers.createAction<typeof action.payload>(
              '@@ty/loadingHide'
            );
          }
        }),
        startWith(helpers.createAction<Payload>('@@ty/loadingShow')),
        endWith(helpers.createAction<Payload>('@@ty/loadingHide'))
      );
    })
  );
};

/*
 * 获取当前登录会员投注信息
 */
export const getRanking: Epic<
  PayloadIn,
  PayloadOut,
  PreferentialActivityStoreType
> = (action$, store) => {
  return action$.pipe(
    ofType('europeanCouples/getRanking'),
    mergeMap(action => {
      return preferentialActivityAPI.getRanking(action.payload).pipe(
        map(res => {
          try {
            if (Number(res.data.status_code) === 200) {
              return helpers.createAction<typeof action.payload>(
                'preferentialActivity/getRankingReducer',
                {
                  data: res.data.result
                }
              );
            } else {
              Toast.error(res.data.msg, 1);
            }

            return helpers.createAction<typeof action.payload>(
              '@@ty/loadingHide'
            );
          } catch (error) {
            return helpers.createAction<typeof action.payload>(
              '@@ty/loadingHide'
            );
          }
        }),
        startWith(helpers.createAction<Payload>('@@ty/loadingShow')),
        endWith(helpers.createAction<Payload>('@@ty/loadingHide'))
      );
    })
  );
};
