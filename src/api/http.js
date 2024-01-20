import axios from 'axios';
import Cookies from 'js-cookie';

// cehck user is loged in
const userToken = Cookies.get('userToken')
// Axios instance
const instance = axios.create({
  // baseURL: 'http://localhost:3000/',
  // baseURL: 'http://116.203.241.176:3000/',
  baseURL: 'http://api.mahditahavorgar.com/',
  timeout: 100000,
  headers: {
    'content-type': 'application/json',
    Authorization: userToken ? `Bearer ${userToken}` : '',
  },
});

// Request interceptor
// instance.interceptors.request.use(
//   (config) => config,
//   (error) => {
//     if (error.response.status === 401) {
//       window.location.replace('users/login');
//     }
//     return Promise.reject(error);
//   }
// );

// Response interceptor
// instance.interceptors.response.use(((response) => response, (error) => Promise.reject(error)));

export const https = {
  // auth
  login: (callback, catchError, data) => instance.post('users/login', data).then(callback).catch(catchError),
  register: (callback, catchError, data) => instance.post('users', data).then(callback).catch(catchError),
  getUser: (callback, catchError) => instance.get('users/me').then(callback).catch(catchError),
  logout: (callback, catchError, data) => instance.post('users/logout').then(callback).catch(catchError),
  addTasks: (callback, catchError, data) => instance.post(`tasks`, data).then(callback).catch(catchError),
  getTasks: (callback, catchError) => instance.get(`tasks`).then(callback).catch(catchError),
  getTask: (callback, catchError, id) => instance.get(`tasks/${id}`).then(callback).catch(catchError),
  addCategory: (callback, catchError, data) => instance.post(`/category`, data).then(callback).catch(catchError),
  deletCategory: (callback, catchError, id) => instance.delete(`/category/${id}`).then(callback).catch(catchError),
  getCategories: (callback, catchError) => instance.get(`/category`).then(callback).catch(catchError),
  deleteTasks: (callback, catchError, id) => instance.delete(`tasks/${id}`).then(callback).catch(catchError),
  getTaskByCategory: (callback, catchError, id) => instance.get(`tasks/category/${id}`).then(callback).catch(catchError),
  toggleTaskStatus: (callback, catchError, id, data) => instance.patch(`tasks/${id}`, data).then(callback).catch(catchError),
  updateTask: (callback, catchError, id, data) => instance.patch(`tasks/${id}`, data).then(callback).catch(catchError),
};