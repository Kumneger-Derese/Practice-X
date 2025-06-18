import { MessageSquareDiff } from 'lucide-react';

const SkillBrief = ({ skillDetail, skillProgress, setIsReviewModalOpen }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
      {/* Skill detail */}
      <div className='flex justify-between col-span-full  items-center'>
        <h1 className='font-bold text-2xl mb-2 '>{skillDetail?.title}</h1>

        <button onClick={() => setIsReviewModalOpen(true)}>
          <MessageSquareDiff className='text-purple-600 hover:text-purple-800' />
        </button>
      </div>

      <p className='my-2 col-span-full'>
        Description: {skillDetail?.description}
      </p>
      <p className='my-2'>
        CreatedBy
        <span className='font-bold'> {skillDetail?.createdBy?.username}</span>
      </p>
      <p>
        Category:{' '}
        <span className='font-bold capitalize'>{skillDetail?.category}</span>{' '}
      </p>
      <p>Tasks: {skillProgress?.totalTasks ?? 0} tasks</p>
      <p>Completed: {skillProgress?.completedTasks ?? 0} tasks</p>
      <p className='my-2 font-bold'>
        {skillProgress?.percentage ?? 0}% completed{' '}
      </p>

      <div className='my-4 col-span-full'>
        <span className='pr-3 font-semibold'>Pregress:</span>
        <progress
          className={`progress-accent progress -z-10 ${
            skillProgress?.percentage === 100 && ''
          }`}
          value={skillProgress?.percentage ?? 0}
          max={100}
        />
      </div>
    </div>
  );
};
export default SkillBrief;
