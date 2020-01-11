import * as _ from 'lodash';

import { history } from '@/router';

import { Action } from '@/reducers/reducerInterface';
import { actionRecord } from '@/actions';
// import { getValidImgInfo } from '@/services/memberService';

export interface RecommendGiftItem {
  deviceId: string;
  id: number;
  ip: string;
  lastInvite: number;
  memberId: number;
  rechargeAmount: number;
  rechargeTime: number;
  recommendAccount: string;
  recommendId: number;
  registDate: number;
  registSource: number;
  registTime: number;
  rewardAmount: number;
  rewardBillNo: string;
  rewardTime: number;
  status: number;
  memberAccount: string;
  invitationInterval: number;
}

const initialStore = {
  history,
  loginResponse: [],
  bankList: [] as Array<any>,
  transRecordList: [] as Array<any>,
  betRecordList: [] as Array<any>,
  DiscountList: [],
  getVenuesBalanceList: [],
  caijin: 0,
  liushui: 0,
  ptMoney: 0,
  page: 0,
  currunt: 1,
  MessageList: [], // 站内信
  not_read_message_count: 0, // 未读站内信消息数量，
  not_read_activity_count: 0, // 未读公告消息数量，
  apiclientlist: [] as Array<any>, // 平台列表
  discountConfig: [], // vip 存款优惠比例
  fsConfig: [], // vip 返水比例
  withdrawConfig: [], // vip 提款额度
  subbranchList: [], // 支行列表
  matchCardInfo: false, // 自动匹配银行卡信息
  showReminderModal: false, // 显示催单上传图片弹窗
  totalPrize: '', // 推荐彩金金额
  inviteFriendConf: {
    activityRule: ''
  }, // 推荐活动配置
  inviteFriendLink: {}, // 推荐活动注册链接
  inviteSwitch: 0, // 推荐礼金分享按钮是否打开
  bankCnName: '',
  giftRecordList: [], // 奖品记录
  // 推荐礼金
  recommendGiftList: [] as Array<RecommendGiftItem>,
  rewardFee: 0,
  pageNum: 1,
  total: 0,
  reInvite: 0,
  memberNum: 0,
  venueNameList: [],
  gameList: []
};

export type MyCenterStoreType = typeof initialStore;

const namespace = 'MyCenter';

export default function MyCenterReducer(
  state: any = initialStore,
  action: Action
) {
  try {
    switch (action.type) {
      // 获取银行卡列表
      case `${namespace}/getBankListReducer`: {
        return _.assign({}, state, {
          bankList: action.payload
        });
      }

      // 读取站内信改变
      case `${namespace}/readMessage`: {
        const { type, amount } = action.payload;

        if (type) {
          return {
            ...state,
            not_read_activity_count:
              state.not_read_activity_count - action.payload.amount
          };
        } else {
          return {
            ...state,
            not_read_message_count:
              state.not_read_message_count - action.payload.amount
          };
        }
      }
      // 获取平台列表
      case `${namespace}/getApiClientListReducer`: {
        return _.assign({}, state, {
          apiclientlist: action.payload.data.data
        });
      }
      // 获取交易记录
      case `${namespace}/getTransacitonRecordReducer`: {
        const newList: any = [];
        action.payload.list.forEach(item => {
          item.dealRecordVOS.forEach(item2 => {
            newList.push(item2);
          });
        });
        return _.assign({}, state, {
          transRecordList: newList || [],
          page: action.payload.pageNum,
          currunt: 1,
          total: action.payload.total
        });
      }
      // 获取投注记录
      case `${namespace}/betRecordListReducer`: {
        if (action.payload.type === 'clear') {
          return _.assign({}, state, {
            betRecordList: []
          });
        } else {
          return _.assign({}, state, {
            betRecordList: action.payload.list || [],
            page: action.payload.page || 1,
            currunt: Math.ceil(action.payload.total / 8),
            total: action.payload.total || 0
          });
        }
      }
      // 获取推荐礼金
      case actionRecord.RECORD_INVITE_FRIEND_POST_REDUCER: {
        return _.assign({}, state, {
          recommendGiftList: action.payload.list || [],
          pageNum: Number(action.payload.pageNum),
          pageSize: Number(action.payload.pageSize),
          rewardFee: Number(action.payload.rewardFee),
          total: Number(action.payload.total),
          reInvite: Number(action.payload.reInvite),
          memberNum: Number(action.payload.memberNum)
        });
      }
      // 再次邀请
      case actionRecord.RECORD_FRIEND_INVITE_GET_REDUCER: {
        return _.assign({}, state);
      }
      // 获取活动配置列表
      case `${namespace}/getInviteFriendConfReducer`: {
        return _.assign({}, state, {
          inviteFriendConf: action.payload.dataList
        });
      }
      // 获取活动配置注册链接
      case `${namespace}/getInviteFriendLinkReducer`: {
        return _.assign({}, state, {
          inviteFriendLink: action.payload.UrlData
        });
      }
      // 各vip等级优惠
      case `${namespace}/getVipDiscountReducer`: {
        return _.assign({}, state, {
          DiscountList: action.payload.data.data
        });
      }
      // VIP场馆列表和最高最低比例
      case 'myVip/getViprateReducer': {
        return _.assign({}, state, {
          venueNameList: action.payload.data.data
        });
      }
      // VIP场馆列表和最高最低比例
      case 'myVip/getNameListReducer': {
        return _.assign({}, state, {
          gameList: action.payload.data.data
        });
      }
      // 获取 场馆金额
      case `${namespace}/getVenuesBalanceReducer`: {
        if (action.payload.type === 'clear') {
          return _.assign({}, state, {
            caijin: 0,
            liushui: 0,
            ptMoney: 0
          });
        } else {
          return _.assign({}, state, {
            caijin: action.payload.caijin,
            liushui: action.payload.liushui,
            ptMoney: action.payload.ptMoney
          });
        }
      }
      // 站内信
      case `${namespace}/getMessageReducer`: {
        return _.assign({}, state, {
          MessageList: action.payload.data.data.data
        });
      }
      // 所有站内信
      case `${namespace}/getMessage_amountReducer`: {
        const { activityCount, noticeCount } = action.payload.data;
        return _.assign({}, state, {
          not_read_message_count: Number(noticeCount),
          not_read_activity_count: Number(activityCount)
        });
      }
      // VIP 存款优惠比例
      case `${namespace}/getDiscountConfigReducer`: {
        return _.assign({}, state, {
          discountConfig: action.payload.data
        });
      }
      // VIP 返水比例
      case `${namespace}/getFsConfigReducer`: {
        return _.assign({}, state, {
          fsConfig: action.payload.data
        });
      }
      // VIP 提款额度
      case `${namespace}/getWithdrawConfigReducer`: {
        return _.assign({}, state, {
          withdrawConfig: action.payload.data
        });
      }
      // 用户获取默认头像列表
      case `${namespace}/getDefaultUserProfileReducer`: {
        return _.assign({}, state, {
          defaultHeadImg: action.payload.data.data
        });
      }
      // 设置头像
      case `${namespace}/setUserProfileReducer`: {
        return _.assign({}, state, {
          setImage: action.payload.data
        });
      }
      // 用户上传头像
      // case `${namespace}/uploadUserProfileReducer`: {
      //   return _.assign({}, state, {
      //     headImage: action.payload.data
      //   });
      // }
      // 删除用户头像
      case `${namespace}/deleteUserProfileReducer`: {
        return _.assign({}, state, {
          deleteImage: action.payload.data
        });
      }
      // 清空记录共用属性
      case `${namespace}/clearPublicVariableReducer`: {
        return _.assign({}, state, {
          page: 0,
          currunt: 1,
          total: 0
        });
      }
      case `${namespace}/getSubbranchInfoReducer`: {
        const subbranchNameList = [] as Array<any>;
        if (action.payload.data.length !== 0) {
          action.payload.data.map(item => {
            const label = {
              label: item.branchname,
              value: item.branchname
            };
            subbranchNameList.push(label);
          });
        }
        return _.assign({}, state, {
          subbranchList: subbranchNameList || []
        });
      }
      case `${namespace}/setMatchCardInfo`: {
        return _.assign({}, state, {
          matchCardInfo: action.payload.value
        });
      }
      case `${namespace}/SET_SHOW_REMINDER_MODAL`: {
        return _.assign({}, state, {
          showReminderModal: action.payload.value
        });
      }
      case `${namespace}/setOpenBankInfoReducer`: {
        return _.assign({}, state, {
          bankCnName: action.payload.code
        });
      }
      // 奖品记录
      case `${namespace}/giftRecordListReducer`: {
        return _.assign({}, state, {
          giftRecordList: action.payload.data.list,
          total: action.payload.data.total
        });
      }

      default:
        return state;
    }
  } catch (e) {
    return state;
  }
}
