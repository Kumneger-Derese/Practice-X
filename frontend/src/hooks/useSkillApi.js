import {
  createSkill,
  deleteSkill,
  getPagenatedSkills,
  getSkill,
  getSkills,
  getSkillsByMe,
  joinSkill,
  unEnrollJoinedSkill,
  updateSkill,
} from '../api/skillApi';
import { toast } from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

//* Hook to create skill ✅
const useCreateSkill = () => {
  const queryClent = useQueryClient();

  return useMutation({
    mutationFn: createSkill,
    onError: (error) => {
      const message = error?.response?.data?.message;
      toast.error(message);
    },
    onSuccess: (data) => {
      queryClent.invalidateQueries({ queryKey: ['skill'] });
      toast.success(`You created ${data.title} skill.`);
    },
  });
};

//* Hook to update skill ✅
const useUpdateSkill = () => {
  const queryClent = useQueryClient();

  return useMutation({
    mutationFn: updateSkill,
    onError: (error) => {
      const message = error?.response?.data?.message;
      toast.error(message);
    },
    onSuccess: (data, v) => {
      queryClent.invalidateQueries({ queryKey: ['skill'] });
      queryClent.invalidateQueries({ queryKey: ['skill', v.skillId] });
      toast.success(data?.message);
    },
  });
};

//* Hook to Delete skill
const useDeleteSkill = () => {
  const queryClent = useQueryClient();

  return useMutation({
    mutationFn: deleteSkill,
    onError: (error) => {
      const message = error?.response?.data?.message;
      toast.error(message);
    },
    onSuccess: (data, v) => {
      queryClent.invalidateQueries({ queryKey: ['skill'] });
      queryClent.invalidateQueries({ queryKey: ['skill', v.skillId] });
      toast.success(data?.message);
    },
  });
};

//* Hook to unenroll skill ✅
const useUnEnrollSkill = () => {
  const queryClent = useQueryClient();

  return useMutation({
    mutationFn: (skillId) => unEnrollJoinedSkill(skillId),
    onError: (error) => {
      const message = error?.response?.data?.message;
      toast.error(message);
    },
    onSuccess: (data, v) => {
      queryClent.invalidateQueries({ queryKey: ['skill'] });
      queryClent.invalidateQueries({ queryKey: ['user'] });
      queryClent.invalidateQueries({ queryKey: ['skill', v.skillId] });
      toast.success(data?.message);
    },
  });
};

//* Hook to join skill ✅
const useJoinSkill = () => {
  const queryClent = useQueryClient();

  return useMutation({
    mutationFn: (skillId) => joinSkill(skillId),
    onError: (error) => {
      const message = error?.response?.data?.message;
      toast.error(message);
    },
    onSuccess: (data, v) => {
      queryClent.invalidateQueries({ queryKey: ['skill'] });
      queryClent.invalidateQueries({ queryKey: ['user'] });
      queryClent.invalidateQueries({ queryKey: ['skill', v.skillId] });
      toast.success(data?.message);
    },
  });
};

//* Hook to fetch all skill data ✅
const useGetSkills = () => {
  return useQuery({
    queryKey: ['skill'],
    queryFn: getSkills,
  });
};

//* Hook to fetch all skill data ✅
const useGetPagenatedSkills = ({ search, category, page, limit }) => {
  return useQuery({
    queryKey: ['skill', search, category, page, limit],
    queryFn: () => getPagenatedSkills({ search, category, page, limit }),
    keepPreviousData: true,
  });
};

//* Hook to fetch one skill data
const useGetSkill = (id) => {
  return useQuery({
    queryKey: ['skill', id],
    queryFn: () => getSkill(id),
  });
};

//* Hook to fetch all skill created by logged in user ✅
const useGetSkillByMe = () => {
  return useQuery({
    queryKey: ['skill'],
    queryFn: getSkillsByMe,
  });
};

export {
  useCreateSkill,
  useUpdateSkill,
  useGetSkills,
  useGetSkill,
  useGetSkillByMe,
  useJoinSkill,
  useUnEnrollSkill,
  useDeleteSkill,
  useGetPagenatedSkills,
};
