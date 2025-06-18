import { axiosApi } from '../utils/axiosApi';

const registerUser = async (userData) => {
  const { data } = await axiosApi.post('/users/register', userData);
  return data;
};

const loginUser = async (userData) => {
  const { data } = await axiosApi.post('/users/login', userData);
  return data;
};

const updateUser = async (updatedData) => {
  const { data } = await axiosApi.put('/users/profile', updatedData);
  return data;
};

const getUser = async () => {
  const { data } = await axiosApi.get('/users/profile');
  return data;
};

export { registerUser, loginUser, updateUser, getUser };
