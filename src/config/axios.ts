import axios from 'axios';
import { config } from './environments';


const Axios = axios.create({
  baseURL: config.host,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': 'true'
  },
});
// Change request data/error here
Axios.interceptors.request.use(
  (config) => {
    /* const token = Cookies.get(AUTH_TOKEN_KEY); */
    config.headers = {
      ...config.headers,
      /* Authorization: `Bearer ${token ? token : ''}`, */
    };
    return config;
  }
);

// Change response data/error here
Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      (error.response && error.response.status === 401) ||
      (error.response && error.response.status === 403) ||
      (error.response &&
        error.response.data.message === 'unauthenticated')
    ) {
      //   Cookies.remove(AUTH_TOKEN_KEY);
      //   Router.reload();
    }
    return Promise.reject(error);
  }
);

export class HttpClient {
  static async get<T>({ url, params }: { url: string, params?: unknown }) {
    const response = await Axios.get<T>(url, { params });
    return response.data;
  }

  static async post<T>({ url, data, options }: { url: string, data: any, options?: any }) {
    const response = await Axios.post<T>(url, data, options);
    return response.data;
  }

  static async put<T>({ url, data }: { url: string, data: unknown }) {
    const response = await Axios.put<T>(url, data);
    return response.data;
  }

  static async delete<T>({ url }: { url: string }) {
    const response = await Axios.delete<T>(url);
    return response.data;
  }
};