import toast from 'react-hot-toast';
import {
  deleteVideo,
  getVideo,
  updateVideo,
  uploadVideo,
} from '../api/videoApi';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Hook to upload video
const useUploadVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadVideo,
    onError: (error) => {
      const message = error?.response?.data?.message;
      toast.error(message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['video', data?.content?.public_id],
      });
      console.log('upload video', data);
      toast.success('Video uploaded successfully.');
    },
  });
};

// Hook to update video
const useUpdateVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateVideo,
    onError: (error) => {
      const message = error?.response?.data?.message;
      toast.error(message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['video', data?.content?.public_id],
      });
      console.log('update video', data);
      toast.success('Video updated successfully.');
    },
  });
};

// Hook to update video
const useDeleteVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVideo,
    onError: (error) => {
      const message = error?.response?.data?.message;
      toast.error(message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['video', data?.public_id] });
      console.log('delete video', data);
      toast.success('Video Delete successfully.');
    },
  });
};

// hook to get video
const useGetVideo = (publicId) => {
  return useQuery({
    queryKey: ['video', publicId],
    queryFn: () => getVideo(publicId),
  });
};

export { useUploadVideo, useUpdateVideo, useDeleteVideo, useGetVideo };
