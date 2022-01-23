import axios from 'axios';

import { API_URL } from 'config/config.js';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use(function (req) {
  //console.log(`${req.method} ${req.url}`);
  //console.log('add jwt:::???', jwt);
  const jwt = localStorage.getItem('userJwt');
  if (jwt) {
    //console.log('dodaj jwt????????');
    req.headers.Authorization = 'Bearer ' + jwt;
  }
  return req;
});

export default axiosInstance;
