import axios from "axios";
import { getTokenFromLocalStorage, removeTokenFromLocalStorage } from "../helpers/localstorage.helper";

export const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    Authorization: `Bearer ` + getTokenFromLocalStorage() || '',
  },
});

instance.interceptors.request.use((config) => {
  const token = getTokenFromLocalStorage();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeTokenFromLocalStorage('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);