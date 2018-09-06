export default {
  namespace: 'products',
  state: [],
  reducers: {
    'delete'(state, { payload: id }) {
      return state.filter(item => item.id !==id);
    },
  },
};
/**
 * Created by cuteandroid on 2018/8/9.
 */
