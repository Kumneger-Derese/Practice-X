import { toast } from 'react-hot-toast';
import { createTask, deleteTask, getTask, updateTask } from '../api/taskApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

//* Hook to create skill task
const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onError: (error) => {
      const message = error?.response?.data?.message;
      toast.error(message);
    },
    onSuccess: (data, v) => {
      queryClient.invalidateQueries({ queryKey: ['skill'] });
      queryClient.invalidateQueries({ queryKey: ['skill', v.skillId] });
      toast.success(`${data.title} task created.`);
    },
  });
};

//* Hook to update skill task
const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,
    onError: (error) => {
      const message = error?.response?.data?.message;
      toast.error(message);
    },
    onSuccess: (data, v) => {
      queryClient.invalidateQueries({ queryKey: ['skill'] });
      queryClient.invalidateQueries({ queryKey: ['task', v.taskId] });
      queryClient.invalidateQueries({ queryKey: ['skill', v.skillId] });
      toast.success('Task Updated.');
    },
  });
};

//* Hook to delete skill task
const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onError: (error) => {
      const message = error?.response?.data?.message;
      toast.error(message);
    },
    onSuccess: (data, v) => {
      queryClient.invalidateQueries({ queryKey: ['skill'] });
      queryClient.invalidateQueries({ queryKey: ['task', v.taskId] });
      queryClient.invalidateQueries({ queryKey: ['skill', v.skillId] });
      toast.success(`Task deleted.`);
    },
  });
};

//* Hook to get one task
const useGetTask = (id) => {
  return useQuery({
    queryKey: ['task', id],
    queryFn: () => getTask(id),
  });
};

const useGetMyTask = (id) => {
  return useQuery({
    queryKey: ['task', id],
    queryFn: () => getTask(id),
  });
};

export {
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
  useGetTask,
  useGetMyTask,
};
