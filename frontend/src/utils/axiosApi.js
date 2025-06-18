import axios from 'axios';

const baseURL = import.meta.env.VITE_BACKEND_URL;

const axiosApi = axios.create({ baseURL });

axiosApi.interceptors.request.use((config) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  if (userInfo) {
    config.headers.Authorization = `Bearer ${userInfo?.token}`;
  }

  return config;
});

export { axiosApi };
