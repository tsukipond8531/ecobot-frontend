import axios from 'axios';
import { API_URL } from 'config/constants';
import history from 'utils/history';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const api = async ({
  data = {},
  url,
  method = "GET",
  auth = false,
  query = {},
}) => {
  try {
    let headers = {
      "Content-Type": "application/json",
    };

    if (auth) {
      headers = {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
    }

    const config = {
      method,
      url,
      headers,
      params: query,
      ...(method !== "GET" && { data }),
    };

    const res = await axiosInstance(config);

    return res.data;
  } catch (err) {
    toast.error(
      `${err.response?.data.error.message}` ||
        "An error occurred while making the API call"
    );
    if (err.response?.data.error.code === 401) {
      localStorage.removeItem("token");
      history.push("/auth/login-page");
    }
    return {};
  }
};

export default api;
