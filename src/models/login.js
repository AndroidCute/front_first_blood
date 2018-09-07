/**
 * Created by cuteandroid on 2018/8/21.
 */
import { routerRedux } from 'dva/router'
import { ReqLogin } from '../services/login'

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
      if (response.status === 0 ) {
        const { data } = response;
        data.status = 'ok';
        data.currentAuthority = data.ojrole;
        data.avatar = '';
        data.userid = data.id;
        data.notifyCount = 0;
        yield put({
          type: 'changeLoginStatus',
          payload: data,
        });
        // Login successfully
        yield put(routerRedux.push('/'));
      } else {
        const data = {};
        data.status = 'error';
        data.type = 'account';
        data.message = response.message;
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
