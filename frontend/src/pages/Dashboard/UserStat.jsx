import Status from './Status';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import JoinedSkillList from './JoinedSkillList';
import CreatedSkillList from './CreatedSkillList';
import { useGetUser } from '../../hooks/useUserApi';
import { useGetSkillByMe } from '../../hooks/useSkillApi';
import { GradientHeading } from '../../components/GradientText';
import Loading from '../../components/Loading';

const UserStat = () => {
  const { data: skillsByMe } = useGetSkillByMe();
  const { data: userData, isLoading, isError, error } = useGetUser();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className='flex items-center text-2xl font-bold text-red-700 justify-center w-full h-screen'>
        {error?.response?.userData?.message || error.message}
      </div>
    );
  }

  return (
    <div className='p-4 pl-4 sm:ml-52 sm:pl-12 pb-8'>
      <GradientHeading>User Stat</GradientHeading>
      {/* usrer statics data */}
      <Status skillsByMe={skillsByMe} userData={userData} />

      <div className='mx-auto rounded-xl  flex flex-col gap-y-4 p-2 text-stone-400'>
        {/* Joined Skills setion */}
        <section>
          <GradientHeading className='my-2'>Joined Skills</GradientHeading>

          <div className='grid grid-cols-1 text-white md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {/* if user have not joined skill*/}
            {userData?.user?.joinedSkills.length < 1 ? (
              <div className='text-black px-4 py-6 border border-dashed rounded-md col-span-2  place-content-center place-items-center'>
                <p className='font-semibold text-xl'>
                  You have not Joined Skill yet.
                </p>
                <Link to={'/skill-list'}>
                  <Button>Join Skill to Practice</Button>
                </Link>
              </div>
            ) : (
              //if user have joined skill
              userData?.user?.joinedSkills.map((skill) => (
                <JoinedSkillList skill={skill} key={skill?._id} />
              ))
            )}
          </div>
        </section>

        {/*Created Skills section */}
        <section>
          <GradientHeading className='my-2'>Created Skills</GradientHeading>

          <div className='grid grid-cols-1 text-white md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {/* If user have not created skill */}
            {skillsByMe?.length < 1 ? (
              <div className='text-black px-4 py-6 border border-dashed rounded-md col-span-2  place-content-center place-items-center'>
                <p className='font-semibold text-xl'>
                  You have not Created Skill yet.
                </p>
                <Link to={'/create-skill'}>
                  <Button>Create Skill To share</Button>
                </Link>
              </div>
            ) : (
              // if user have skill created
              skillsByMe?.map((skill) => (
                <CreatedSkillList skill={skill} key={skill._id} />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
export default UserStat;
