import DeleteModal from './DeleteModal';
import { Link } from 'react-router-dom';
import { CheckCheck, Pencil, PlayCircleIcon, Trash } from 'lucide-react';

const SkillDetailList = ({
  task,
  isTaskCompleted,
  i,
  isCanEdit,
  skillId,
  isModalOpen,
  handleOpenModal,
  selectedTask,
  setIsModalOpen,
}) => {
  return (
    <div key={task._id} className='mb-4 '>
      <div
        className={` text-left p-2 rounded-md border  w-full flex justify-between pr-2 
                    ${
                      isTaskCompleted
                        ? 'bg-green-200 border-green-300'
                        : 'bg-indigo-200 border-indigo-300'
                    }
                    `}
      >
        <p>
          Task {i + 1}: {task?.title}
        </p>

        {/* wrapper for completed icon and Link to task detail  */}
        <div className='flex items-center gap-x-2'>
          {isTaskCompleted && <CheckCheck className='text-green-700' />}

          {/* link to task detail */}
          <Link to={`/task-detail/${task._id}`}>
            <PlayCircleIcon
              className={`${
                isTaskCompleted ? 'text-green-700' : 'text-purple-700'
              }`}
            />
          </Link>

          {/* update task link and delete btn */}
          {isCanEdit && (
            <div className=' flex items-center gap-x-2'>
              <Link to={`/update-task/${skillId}/${task._id}`}>
                <Pencil size={21} className={`  text-yellow-700`} />
              </Link>

              {/* delete task link */}
              <button onClick={() => handleOpenModal(task)}>
                <Trash className={` text-red-700`} />
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Modal for deleting a task */}
      {isModalOpen && (
        <DeleteModal
          task={selectedTask}
          skillId={skillId}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};
export default SkillDetailList;
