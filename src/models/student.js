/**
 * Created by cuteandroid on 2018/8/21.
 */
import { routerRedux } from 'dva/router'
import { AddStudent, StudentList, ModifyStudent, DeleteStudent, SearchStudent, StatisticsStudent } from '../services/login'
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
        yield put(routerRedux.push('/Layout/List'));
      } else {
        notification.error({
          message: `添加失败，${response.msg}`,
        });
      }
    },
    *getList({ payload }, { call, put }) {
      const response = yield call(StudentList);
      console.log("Resp:", response)
      if (response.status === 200 ) {
        yield put({type: "saveList", payload: response.msg})
      } else {
        notification.error({
          message: `获取失败，${response.msg}`,
        });
      }
    },
    *getSearchList({ payload }, { call, put }) {
      const response = yield call(SearchStudent, payload);
      console.log("Resp:", response)
      if (response.status === 200 ) {
        yield put({type: "saveList", payload: response.msg})
      } else {
        notification.error({
          message: `搜索失败，${response.msg}`,
        });
      }
    },
    *modify({ payload }, { call, put }) {
      const response = yield call(ModifyStudent, payload);
      console.log("Resp:", response)
      if (response.status === 200 ) {
        notification.success({
          message: `修改成功`,
        });
      } else {
        notification.error({
          message: `修改失败，${response.msg}`,
        });
      };
      yield put({type: "getList"})
    },
    *delete({ payload }, { call, put }) {
      const response = yield call(DeleteStudent, payload);
      console.log("Resp:", response)
      if (response.status === 200 ) {
      } else {
        notification.error({
          message: `删除失败，${response.msg}`,
        });
      };
      yield put({type: "getList"})
    },
    *piecount({ payload }, { call, put }) {
      const response = yield call(StatisticsStudent);
      console.log("Resp:", response)
      if (response.status === 200 ) {
        yield put({type: "savePiecount", payload: response.msg})
      } else {
        notification.error({
          message: `统计失败， ${response.msg}`,
        });
      };
    },
  },

  reducers: {
    save(state, action) {
      let newState = { ...state, ...action.payload }
      console.log(newState)
      return newState;
    },
    saveList(state, action) {
      let newState = { ...state, list: action.payload }
      console.log(newState)
      return newState;
    },
    savePiecount(state, action) {
      let newState = { ...state, piecount: action.payload }
      console.log(newState)
      return newState;
    },
  },

};
