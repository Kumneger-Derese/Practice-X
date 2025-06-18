import { axiosApi } from '../utils/axiosApi';

const createReview = async (body) => {
  const { data } = await axiosApi.post('/reviews/create', body);
  return data;
};

const updateReview = async (body) => {
  const { data } = await axiosApi.put('/reviews/update', body);
  return data;
};

const deleteReview = async ({ skillId, reviewId }) => {
  const { data } = await axiosApi.delete(
    `/reviews/delete/${skillId}/${reviewId}`
  );
  return data;
};

const getReviews = async (skillId) => {
  const { data } = await axiosApi.get(`/reviews/get/${skillId}`);
  return data;
};

const getReview = async (skillId, reviewId) => {
  const { data } = await axiosApi.get(`/reviews/get/${skillId}/${reviewId}`);
  return data;
};

export { createReview, updateReview, deleteReview, getReviews, getReview };
