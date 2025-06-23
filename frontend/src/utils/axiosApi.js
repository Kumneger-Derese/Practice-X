import axios from 'axios';

const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + '/api',
});

axiosApi.interceptors.request.use((config) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  if (userInfo) {
    config.headers.Authorization = `Bearer ${userInfo?.token}`;
  }

  return config;
});

export { axiosApi };
