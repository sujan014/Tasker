import axios from 'axios';
import { getCookie } from 'cookies-next';

export enum STATUS_CODE {
  SUCCESS = 200,
  CREATE_SUCCESS = 201,
  UNAUTHORIZED_WITH_MODAL_LOGIN = 40001,
  UNAUTHORIZED = 401,
}

const httpClient = axios.create({
  baseURL: process.env.NEXTAUTH_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use(
  function (config) {
    const token = getCookie('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  async function (error) {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  function (response) {
    if (response?.data?.code === STATUS_CODE.UNAUTHORIZED) {
      window.location.href = '/';
    }
    if (response.data && response.data?.error) {
      return Promise.reject(new Error(response.data.error.message));
    }
    return response;
  },

  async function (error) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(
        error.response?.data?.error
          ? new Error(error.response?.data?.error?.message as string)
          : error
      );
    } else {
      return Promise.reject(error);
    }
  }
);

export default httpClient;
