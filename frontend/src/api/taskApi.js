import { axiosApi } from '../utils/axiosApi';

//* create task
const createTask = async (body) => {
  const { data } = await axiosApi.post('/tasks/create', body);
  return data;
};

//* update task
const updateTask = async (body) => {
  const { data } = await axiosApi.put('/tasks/update', body);
  return data;
};

//* delete task || always send data through parsms for delete method
const deleteTask = async ({ skillId, taskId }) => {
  const { data } = await axiosApi.delete(`/tasks/delete/${skillId}/${taskId}`);
  return data;
};

//* get one task
const getTask = async (taskId) => {
  const { data } = await axiosApi.get(`/tasks/get/${taskId}`);
  return data;
};

//* get one task i created
const getMyTask = async (taskId) => {
  const { data } = await axiosApi.get(`/tasks/my-task/${taskId}`);
  return data;
};

export { createTask, updateTask, deleteTask, getTask, getMyTask };
