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

export async function SearchStudent(params) {
  return request('/student/getList', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function ModifyStudent(params) {
  return request('/student/modify', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function DeleteStudent(params) {
  return request('/student/deleted', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function StatisticsStudent() {
  return request('/student/pieAgeCount');
}
