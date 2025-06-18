import { axiosApi } from '../utils/axiosApi';

// Upload video
const uploadVideo = async (videoFile) => {
  const formData = new FormData();
  formData.append('video', videoFile);

  const { data } = await axiosApi.post('/videos/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return data;
};

// Update video
const updateVideo = async ({ videoFile, publicId }) => {
  const formData = new FormData();
  formData.append('video', videoFile);
  formData.append('publicId', publicId);

  const { data } = await axiosApi.put('/videos/update', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return data;
};

// get video
const getVideo = async (publicId) => {
  const { data } = await axiosApi.get(`/videos/${publicId}`);
  return data;
};

// delete video
const deleteVideo = async ({ publicId }) => {
  const { data } = await axiosApi.delete(`/videos/delete`, {
    data: { publicId },
  });

  return data;
};

export { uploadVideo, updateVideo, getVideo, deleteVideo };
