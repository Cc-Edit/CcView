import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { Domain, Constant } from '@/config/constant';
import { getStorage } from '@/utils/common';
import Router from 'next/router';
// 初始化超时时间
const axiosInstance = axios.create({
  timeout: 30000,
  baseURL: Domain.baseURL
});

// 请求拦截，补充 accessToken
axiosInstance.interceptors.request.use(
  config => {
    const accessToken = getStorage(Constant.TokenKey, '');
    if (accessToken) {
      Object.assign(config.headers, {
        t: accessToken ? `${accessToken}` : ''
      });
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

/**
 * 处理响应的错误信息
 * @param error
 * @returns {Promise<never>}
 */
const handleResponseError = (error: AxiosError) => {
  if (error.response) {
    if (error.response?.status === 401) {
      // 状态编码为401，无权限，需要重定向到login页面
      window.location.replace('/login');
    }
    if (error.response?.status === 403) {
      // 状态编码为403，无权限，需要提示用户当前操作权限不足
      Router.push('/500');
    }
    return Promise.reject(error.response?.data);
  } else {
    const message = error.message;
    return Promise.reject(message.includes('timeout') ? '请求超时' : '服务异常');
  }
};

/**
 * 处理响应
 * @param response
 * @returns {Promise<never>}
 */
const handleResponseSuccess = (response: AxiosResponse) => {
  const res = response.data;
  if (res?.status && res.status !== 200) {
    res.message = '服务异常';
    return Promise.reject(res);
  } else {
    return Promise.resolve(res);
  }
};

// 响应拦截, 处理错误码和跳转拦截
axiosInstance.interceptors.response.use(
  handleResponseSuccess,
  handleResponseError
);

const request = <ResponseType = unknown>(url: string, options?: AxiosRequestConfig<unknown>): Promise<ResponseType> => {
  return new Promise((resolve, reject) => {
    axiosInstance({
      url,
      ...options
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => reject(err));
  });
};

export {
  axiosInstance,
  request
};