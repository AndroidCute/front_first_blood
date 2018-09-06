/**
 * Created by cuteandroid on 2018/8/21.
 */
import { routerRedux } from 'dva/router'

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
    *login({ payload }, { call, put }) {  // eslint-disable-line
      yield put(routerRedux.push('/Layout/Home'));
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
