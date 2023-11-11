import axios from 'axios';
import Cookies from 'js-cookie';

// cehck user is loged in
const userToken = Cookies.get('userToken');

// Axios instance
const instance = axios.create({
  baseURL: 'https://mahdi-taskmanager.netlify.app/',
  timeout: 10000,
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
  addTasks: (callback, catchError, data) => instance.post(`tasks`, data).then(callback).catch(catchError),
  getTasks: (callback, catchError) => instance.get(`tasks`).then(callback).catch(catchError),
  deleteTasks: (callback, catchError, id) => instance.delete(`tasks/${id}`).then(callback).catch(catchError),
  toggleTaskStatus: (callback, catchError, id, data) => instance.patch(`tasks/${id}`, data).then(callback).catch(catchError),
};