import { axiosApi } from '../utils/axiosApi';

//* create skill to share
const createSkill = async (body) => {
  const { data } = await axiosApi.post('/skills/create', body);
  return data;
};

//* update skill created by yourself
const updateSkill = async (body) => {
  const { data } = await axiosApi.put(`/skills/update`, body);
  return data;
};

//* Delete one skill by the user
const deleteSkill = async (skillId) => {
  const { data } = await axiosApi.delete(`/skills/delete/${skillId}`);
  return data;
};

//* fetch all skills
const getSkills = async () => {
  const { data } = await axiosApi.get('/skills/list');
  return data;
};

//* fetch all skills
const getPagenatedSkills = async ({ search, category, page, limit }) => {
  const { data } = await axiosApi.get('/skills/pagenated-list', {
    params: { q: search, category, page, limit },
  });

  return data;
};

//* fetch one skill by the user
const getSkill = async (skillId) => {
  const { data } = await axiosApi.get(`/skills/skill/${skillId}`);
  return data;
};

//* fetch all skills created by the user
const getSkillsByMe = async () => {
  const { data } = await axiosApi.get('/skills/by-me');
  return data;
};

//* make user to join skill created by others
const joinSkill = async (skillId) => {
  const { data } = await axiosApi.post(`/skills/join`, skillId);
  return data;
};

//* make user to un enroll skill created by others
const unEnrollJoinedSkill = async (skillId) => {
  const { data } = await axiosApi.delete(`/skills/remove/${skillId}`);
  return data;
};

export {
  createSkill,
  updateSkill,
  deleteSkill,
  getSkills,
  getSkillsByMe,
  getSkill,
  joinSkill,
  unEnrollJoinedSkill,
  getPagenatedSkills,
};
