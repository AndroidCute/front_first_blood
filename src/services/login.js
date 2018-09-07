import request from '../utils/request';

export async function ReqLogin(params) {
  return request('/user/login', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
