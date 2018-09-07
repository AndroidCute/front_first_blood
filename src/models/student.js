/**
 * Created by cuteandroid on 2018/8/21.
 */
import { AddStudent } from '../services/login'
import { notification } from 'antd';

export default {

  namespace: 'student',

  state: {
    list: [],
    student: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *add({ payload }, { call, put }) {
      const response = yield call(AddStudent, payload);
      console.log("Resp:", response)
      if (response.status === 200 ) {
        notification.success({
          message: `添加成功`,
        });
      } else {
        notification.error({
          message: `添加失败，${response.msg}`,
        });
      }
    },
    *getList({ payload }, { call, put }) {
      const response = yield call(AddStudent, payload);
      console.log("Resp:", response)
      if (response.status === 200 ) {
        notification.success({
          message: `添加成功`,
        });
      } else {
        notification.error({
          message: `添加失败，${response.msg}`,
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
