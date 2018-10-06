/**
 * Created by cuteandroid on 2018/8/21.
 */
import { routerRedux } from 'dva/router'
import { ReqLogin } from '../services/login'
import { jwt } from '../utils/request'
import { notification } from 'antd';

export default {

  namespace: 'login',

  state: {
    username: 'Nn'
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(ReqLogin, payload);
      console.log("Resp:", response)
      if (response.status === 200 ) {
        const { msg } = response;
        jwt.Authorization = jwt.Authorization + msg;
        // Login successfully
        yield put(routerRedux.push('/Layout/Home'));
      } else {
        notification.error({
          message: `登录失败，${response.msg}`,
        });
      }
    },
  },

  reducers: {
    save(state, action) {
      let newState = { ...state, ...action.payload }
      console.log(newState)
      return newState;
    },
  },

};
