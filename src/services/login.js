import request from '../utils/request';

export async function ReqLogin(params) {
  return request('/user/login', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function AddStudent(params) {
  return request('/student/create', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function StudentList() {
  return request('/student/getAll');
}
