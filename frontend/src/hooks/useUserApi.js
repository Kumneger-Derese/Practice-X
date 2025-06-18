import { toast } from 'react-hot-toast';
import { useAuth } from '../store/useAuthStore';
import { getUser, loginUser, registerUser, updateUser } from '../api/userApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

//* A hook to register user
const useRegisterUser = () => {
  const { setCredentials } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUser,
    onError: (error) => {
      const message = error?.response?.data?.message;
      toast.error(message);
    },
    onSuccess: (data) => {
      setCredentials(data);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success(`${data.username} registration Success.`);
    },
  });
};

//* A hook to login  user
const useLoginUser = () => {
  const { setCredentials } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onError: (error) => {
      const message = error?.response?.data?.message;
      toast.error(message);
    },
    onSuccess: (data) => {
      setCredentials(data);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success(`Welcome, ${data.username}`);
    },
  });
};

//* A hook to update user profile
const useUpdateUser = () => {
  const { setCredentials } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onError: (error) => {
      const message = error?.response?.data?.message;
      toast.error(message);
    },
    onSuccess: (data) => {
      setCredentials(data);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success(`Profile Updated.`);
    },
  });
};

//* A hook to get user profile
const useGetUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });
};

export { useRegisterUser, useLoginUser, useUpdateUser, useGetUser };
