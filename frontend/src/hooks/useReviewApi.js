import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createReview,
  deleteReview,
  getReview,
  getReviews,
  updateReview,
} from '../api/reviewApi';
import { toast } from 'react-hot-toast';

//* Hook to review on skill ✅
const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,
    onError: (error) => {
      const message = error?.response?.data?.message;
      toast.error(message);
    },
    onSuccess: (data, v) => {
      queryClient.invalidateQueries({ queryKey: ['review', v.skillId] });
      queryClient.invalidateQueries({ queryKey: ['skill', v.skillId] });
      toast.success('Review created.');
    },
  });
};

//* Hook to update review ✅
const useUpdateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateReview,
    onError: (error) => {
      const message = error?.response?.data?.message;
      toast.error(message);
    },
    onSuccess: (data, v) => {
      queryClient.invalidateQueries({ queryKey: ['review', v.skillId] });
      queryClient.invalidateQueries({ queryKey: ['skill', v.skillId] });
      queryClient.invalidateQueries({
        queryKey: ['skill', v.skillId, v.reviewId],
      });
      toast.success('Review updated.');
    },
  });
};

//* Hook to delete review ✅
const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReview,
    onError: (error) => {
      const message = error?.response?.data?.message;
      toast.error(message);
    },
    onSuccess: (data, v) => {
      queryClient.invalidateQueries({ queryKey: ['review', v.skillId] });
      queryClient.invalidateQueries({ queryKey: ['skill', v.skillId] });
      toast.success('Review Deleted.');
    },
  });
};

//* hook to get all skill review ✅
const useGetReviews = (skillId) => {
  return useQuery({
    queryKey: ['review', skillId],
    queryFn: () => getReviews(skillId),
  });
};

//* hook to get one skill review ✅
const useGetReview = (skillId, reviewId) => {
  return useQuery({
    queryKey: ['review', skillId, reviewId],
    queryFn: () => getReview(skillId, reviewId),
  });
};

export {
  useCreateReview,
  useUpdateReview,
  useDeleteReview,
  useGetReviews,
  useGetReview,
};
