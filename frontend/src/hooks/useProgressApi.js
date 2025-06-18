import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getSkillProgress, trackProgress } from '../api/progressApi';
import toast from 'react-hot-toast';

//* Hook to track user skill progress
const useTrackProgress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: trackProgress,
    onError: (error) => {
      const message = error?.response?.data?.message;
      toast.error(message);
    },
    onSuccess: (data, v) => {
      queryClient.invalidateQueries({ queryKey: ['skill', v.taskId] });
      queryClient.invalidateQueries({ queryKey: ['skill'] });
      queryClient.invalidateQueries({ queryKey: ['task', v.taskId] });
      queryClient.invalidateQueries({ queryKey: ['task'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success(data?.message);
    },
  });
};

// Hook to get skill progress

const useGetSkillProgress = (skillId) => {
  return useQuery({
    queryKey: ['progress'],
    queryFn: () => getSkillProgress(skillId),
  });
};

export { useTrackProgress, useGetSkillProgress };
