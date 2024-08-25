import axios, { AxiosRequestConfig, Method } from 'axios';
import history from './history';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_CANISTER_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,  // This ensures cookies are sent with the request
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define the type for the API function parameters
interface ApiParams {
  data?: Record<string, any>;
  url: string;
  method?: Method;
  auth?: boolean;
  query?: Record<string, any>;
}

// Define the type for the API response (assuming a generic response)
interface ApiResponse<T = any> {
  data: T;
}

// API function with TypeScript
const api = async <T = any>({
  data = {},
  url,
  method = 'GET',
  auth = false,
  query = {},
}: ApiParams): Promise<ApiResponse<T> | {}> => {
  try {
    let headers: Record<string, string> = {};

    if (auth) {
      const token = localStorage.getItem('token');
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    const config: AxiosRequestConfig = {
      method,
      url,
      headers,
      params: query,
      ...(method !== 'GET' && { data }),
    };

    const res = await axiosInstance(config);

    return res.data;
  } catch (err: any) {
    toast.error(
      err.response?.data.error.message || 'An error occurred while making the API call'
    );
    if (err.response?.data.error.code === 401) {
      localStorage.removeItem('token');
      history.push('/auth/login-page');
    }
    return {};
  }
};

export default api;
