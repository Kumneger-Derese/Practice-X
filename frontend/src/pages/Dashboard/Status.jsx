const Status = ({ userData, skillsByMe }) => {
  //* User statics data
  const totalJoinedSkill = userData?.user?.joinedSkills?.length;
  const totalJoinedTask = userData?.totalJoinedTask;
  const totalCompletedTask = userData?.totalCompletedTask;
  const totalCompletedSkill = userData?.user?.completedSkills?.length;

  const totalSkillCreated = skillsByMe?.length;
  const totalTaskCreated = skillsByMe
    ?.map((skill) => skill.tasks)
    .flat().length;

  return (
    <div className='p-4 gap-4 -bg-linear-300 from-purple-950 to-stone-600 text-white grid grid-cols-2 md:grid-cols-3 border-2 rounded-box m-4 mr-12'>
      <p>Joined Skill: {totalJoinedSkill ?? ''}</p>
      <p>Joined Task: {totalJoinedTask}</p>
      <p>Completed Skill: {totalCompletedSkill}</p>
      <p>Completed Task: {totalCompletedTask}</p>

      <p>Created skill: {totalSkillCreated}</p>
      <p>Created Task: {totalTaskCreated}</p>
    </div>
  );
};
export default Status;
