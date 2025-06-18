import { axiosApi } from '../utils/axiosApi';

const trackProgress = async (taskId) => {
  const { data } = await axiosApi.post('/progress/track', taskId);
  return data;
};

const getSkillProgress = async (skillId) => {
  const { data } = await axiosApi.get(`/progress/${skillId}`);
  return data;
};

export { trackProgress, getSkillProgress };
