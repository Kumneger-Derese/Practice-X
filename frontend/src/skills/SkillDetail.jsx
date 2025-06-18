import { useState } from 'react';
import SkillBrief from './SkillBrief';
import Button from '../components/Button';
import ReviewList from '../review/ReviewList';
import { useAuth } from '../store/useAuthStore';
import { useGetSkill } from '../hooks/useSkillApi';
import { useGetReviews } from '../hooks/useReviewApi';
import { useNavigate, useParams } from 'react-router-dom';
import CreateReviewModal from '../review/CreateReviewModal';
import { useGetSkillProgress } from '../hooks/useProgressApi';
import SkillDetailList from './SkillDetailList';

const SkillDetail = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const { skillId } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(' ');

  // review api
  const {
    data: reviewList,
    isLoading: loadingReview,
    error,
  } = useGetReviews(skillId);

  //skill and skill progress api
  const { data: skillDetail, isLoading } = useGetSkill(skillId);
  const { data: skillProgress, isLoading: progressLoading } =
    useGetSkillProgress(skillId);

  if (isLoading || progressLoading || loadingReview) {
    <div className='flex justify-center items-center h-screen w-full'>
      <span className='loading scale-200 loading-ring loading-lg'></span>
    </div>;
  }

  if (error) {
    <div className='flex justify-center items-center h-screen w-full'>
      <p>{error?.response?.data?.message || error.message} </p>
    </div>;
  }

  //checking if the user is creator of the skill
  const isCanEdit = userInfo._id === skillDetail?.createdBy._id;

  // handle delete modal open
  const handleOpenModal = (task) => {
    setIsModalOpen(true);
    setSelectedTask(task);
  };

  return (
    <div className='py-4 pl-2 sm:pl-8 w-full relative'>
      <section className='mx-auto w-5/6 md:w-1/2 mt-8'>
        {/* Skill detail */}
        <SkillBrief
          skillDetail={skillDetail}
          skillProgress={skillProgress}
          setIsReviewModalOpen={setIsReviewModalOpen}
        />

        {/* skill detail task list */}
        <div className='w-full mt-4'>
          {skillDetail?.tasks?.length <= 0 ? (
            <div className='py-6 px-4 flex items-center justify-center flex-col rounded-box border border-dashed'>
              <h1 className='text-xl font-bold'>No task found!</h1>
              {/* Create task button when there is no a task created and you can create */}
              {isCanEdit && (
                <Button onClick={() => navigate(`/create-task/${skillId}`)}>
                  Create Task
                </Button>
              )}
            </div>
          ) : (
            skillDetail?.tasks?.map((task, i) => {
              // check if the task is completed
              const isTaskCompleted = skillProgress?.completedTaskIds?.includes(
                task?._id
              );

              return (
                <SkillDetailList
                  i={i}
                  key={task._id}
                  task={task}
                  handleOpenModal={handleOpenModal}
                  isCanEdit={isCanEdit}
                  isTaskCompleted={isTaskCompleted}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  selectedTask={selectedTask}
                  skillId={skillId}
                />
              );
            })
          )}

          {/* Create task button when there is a task created and you can create */}
          {isCanEdit && skillDetail?.tasks?.length > 0 && (
            <Button onClick={() => navigate(`/create-Task/${skillId}`)}>
              Create Task
            </Button>
          )}
        </div>
      </section>

      {/* Review Modal */}
      {isReviewModalOpen && (
        <CreateReviewModal
          skillId={skillId}
          setIsReviewModalOpen={setIsReviewModalOpen}
        />
      )}

      {/* Review Listing Section */}
      <div className='mx-auto w-5/6 md:w-1/2 mb-8'>
        <h1 className='font-bold text-xl my-8'>Reviews</h1>

        <div className='flex flex-col gap-y-4'>
          {/* Review list Empty space */}
          {reviewList?.length < 1 ? (
            <div className='py-6 px-4 mt-4 flex items-center justify-center flex-col rounded-box border border-dashed'>
              <h1 className='text-xl font-bold'>
                No Review found for this skill!
              </h1>
            </div>
          ) : (
            reviewList?.map((review) => (
              <ReviewList
                review={review}
                key={review._id}
                skillId={skillId}
                userInfo={userInfo}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default SkillDetail;
