import axios from 'axios';

import { API_URL } from 'config/config.js';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use(function (config) {
  const jwt = localStorage.getItem('userJwt');
  config.headers.Authorization = jwt ? `Bearer' ${jwt}` : '';
  return config;
});

export default axiosInstance;
