import { useState } from 'react';
import Confetti from 'react-confetti';
import { ArrowLeft } from 'lucide-react';
import { useWindowSize } from 'react-use';
import { useAuth } from '../store/useAuthStore';
import { useGetTask } from '../hooks/useTaskApi';
import FormatDate from '../components/FormatDate';
import { ButtonSuccess } from '../components/Button';
import { useTrackProgress } from '../hooks/useProgressApi';
import { useNavigate, useParams } from 'react-router-dom';
import { GradientHeading } from '../components/GradientText';
import Loading from '../components/Loading';
import FormatDuration from '../components/FormatDuration';

const TaskDetail = () => {
  const { taskId } = useParams();
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);

  const {
    mutate: toggleTask,
    data: progressData,
    isPending,
  } = useTrackProgress();
  const { data: taskDetail, isLoading, isError, error } = useGetTask(taskId);

  if (isLoading || isPending) {
    return <Loading />;
  }

  if (isError) {
    <div className='flex justify-center items-center h-screen w-full'>
      <p>{error?.response?.data?.message || error.message}</p>
    </div>;
  }

  //*checking if the user is creator of the task
  const isCanEdit = userInfo._id === taskDetail?.createdBy;

  //* if task is not completed it shows confetti else not bc when we hit btn task is completed
  const handleCompleteTask = () => {
    if (progressData?.isTracked) {
      setShowConfetti(false);
    } else {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 8000); // stops after 8 seconds
    }

    toggleTask({ taskId }); //complete or uncomplete tasks
  };

  return (
    <div className='p-4 relative overflow-hidden'>
      <button onClick={() => navigate(-1)}>
        <ArrowLeft className='abolute top-8 left-12' />
      </button>

      <div className='flex items-center justify-between mx-12 mb-4'>
        <GradientHeading>{taskDetail?.skillId?.title}</GradientHeading>
      </div>

      {/* Component to show celebrate */}
      {showConfetti && <Confetti width={width} height={height} />}

      <section className=' w-3/4 mx-auto'>
        <div className='w-full'>
          <h1 className='font-bold text-xl mb-2'>{taskDetail?.title}</h1>
          <p className='font-medium capitalize'>{taskDetail?.type}</p>

          {/* Date of skill creation and updation */}
          <div className='flex gap-x-4 font-medium text-sm my-2 text-neutral-500'>
            <span>
              CreatedAt: <FormatDate date={taskDetail?.createdAt} />
            </span>
            <span>
              UpdatedAt: <FormatDate date={taskDetail?.updatedAt} />
            </span>
          </div>

          {/* Task Content conditional rendering*/}
          {taskDetail?.type === 'text' ? (
            <div
              className='prose mb-8 lg:prose-base max-w-none md:max-w-2xl lg:max-w-4xl'
              dangerouslySetInnerHTML={{ __html: taskDetail?.content }}
            />
          ) : (
            <div>
              <video
                className='appearance-none text-purple-600'
                controlsList='nodownload'
                autoPlay={false}
                style={{ width: '100%', height: 'auto' }}
                width={taskDetail?.content?.width}
                height={taskDetail?.content?.height}
                controls
                src={taskDetail?.content?.secure_url}
              >
                Your Browser does not support video tag
              </video>

              <p className='mb-8 mt-2 font-semibold'>
                Duration :{' '}
                <FormatDuration
                  durationInSeconds={taskDetail?.content?.duration}
                />
              </p>
            </div>
          )}
        </div>

        <ButtonSuccess onClick={handleCompleteTask} disabled={isCanEdit}>
          {progressData?.isTracked ? 'Mark Uncomplete' : 'Mark Complete'}
        </ButtonSuccess>
      </section>
    </div>
  );
};
export default TaskDetail;
