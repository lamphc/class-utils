import axios from 'axios';
import { getToken } from '.';
import { Toast } from 'antd-mobile';


const BASE_URL = 'https://tlias3.boxuegu.com';
// 创建请求实例
// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: BASE_URL,
  // timeout: 2000
});

// Alter defaults after instance has been created
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  Toast.loading('加载中...', 0);
  // Do something before request is sent
  const { url } = config;
  if (url.startsWith('/user') && !url.startsWith('/user/registered') &&
    !url.startsWith('/user/login')) {
    config.headers.authorization = getToken()
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  console.log(response)
  Toast.hide()
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  const data = {
    status: response.status,
    data: response.data
  }
  if (response.data.description) data.description = response.data.description;
  return data;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export { BASE_URL }
export default instance