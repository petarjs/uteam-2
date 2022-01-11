import axios from 'axios';

import { API_ENDPOINT } from 'config/config.js';

const axiosInstance = axios.create({
  baseURL: API_ENDPOINT,
  timeout: 1000,
});

export default axiosInstance;
