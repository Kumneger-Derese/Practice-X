import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { Target, User2 } from 'lucide-react';
import { useGetUser } from '../hooks/useUserApi';
import { GradientHeading2 } from '../components/GradientText';
import Loading from '../components/Loading';

const MySkills = () => {
  const { data: userData, isLoading } = useGetUser();

  if (isLoading) {
    return <Loading />;
  }

  const { completedSkills } = userData.user;

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center mb-6'>
        <GradientHeading2>My Skills</GradientHeading2>
        <Link
          to={'/dashboard/profile'}
          className='flex gap-x-2 border rounded-md border-purple-600 p-1'
        >
          <User2 className='text-purple-600' />
          <span className='font-bold text-indigo-800'>
            {userData?.user?.username}
          </span>
        </Link>
      </div>

      <section className='grid mx-2 sm:mx-0 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 -z-[50] gap-4 text-white'>
        {userData?.user?.joinedSkills.length < 1 ? (
          <div className='flex flex-col items-center justify-center  col-span-full'>
            <div className='text-black flex flex-col justify-center items-center w-full sm:w-3/6 px-4 py-6  border border-dashed rounded-md '>
              <p className='font-semibold text-xl'>
                You have not Joined Skill yet.
              </p>
              <Link to={'/skill-list'} className=''>
                <Button>Join Skill to Practice</Button>
              </Link>
            </div>
          </div>
        ) : (
          userData?.user?.joinedSkills.map((skill) => {
            const isCompleted = completedSkills.includes(skill._id);

            return (
              <div
                className={`card p-4 bg-linear-150 from-purple-700/80 from-20% to-80% relative to-indigo-900/80 mb-1
                ${
                  isCompleted && 'from-slate-700/80 from-20% to-80% to-cyan-600'
                }
                `}
                key={skill._id}
              >
                <p className='font-bold'>Title: {skill.title}</p>
                <p className='my-2 line-clamp-2'> {skill?.description}</p>

                <div className='card-actions justify-end'>
                  {/* complete badge */}
                  {isCompleted && (
                    <div className='badge badge-sm bg-green-600 text-white border-white font-medium absolute top-4 right-4'>
                      Completed
                    </div>
                  )}
                  <Link
                    className={'btn btn-dash  border-indigo-300 mt-4'}
                    to={`/skill-detail/${skill._id}`}
                  >
                    <Target size={19} /> Practice
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
};
export default MySkills;
