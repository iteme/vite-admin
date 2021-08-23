import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { apiUrl } from '@/config';
import router from '@/router';
import { getTokenCache } from '@/utils/storage';

interface BaseResult<T> {
  success?: boolean;
  code: number;
  msg: string;
  result: T;
}

const http = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

http.interceptors.request.use(
  (config) => {
    if (config.url?.startsWith('/api/auth')) {
      return config;
    }
    const token = getTokenCache();
    if (token) {
      config.headers.token = getTokenCache();
    } else {
      router.push('/auth/login');
      config.cancelToken = new axios.CancelToken((cancel) => cancel('Cancel unauthorized request'));
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response: AxiosResponse<BaseResult<unknown>>) => {
    const data = response.data;
    data.success = data.code === 200;
    if (!data.success) {
      ElMessage.error(data.msg);
    }
    return response;
  },
  (error) => {
    const code = error.response?.status;
    if (code === 401) {
      ElMessage.error('登录信息失效，请重新登录');
      router.push('/auth/login');
    } else if (code) {
      router.push('/error');
      ElMessage.error(error.message);
    }
    return Promise.reject(error);
  }
);

export function get<T = unknown>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<BaseResult<T>>> {
  return http.get(url, config) as Promise<AxiosResponse<BaseResult<T>>>;
}

export function post<T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<BaseResult<T>>> {
  return http.post(url, data, config) as Promise<AxiosResponse<BaseResult<T>>>;
}

export default http;
