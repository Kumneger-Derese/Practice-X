import { X, Trash, ArrowRight } from 'lucide-react';
import { useDeleteTask } from '../hooks/useTaskApi';
import { useDeleteVideo } from '../hooks/useVideoApi';
import Loading from '../components/Loading';

const DeleteModal = ({ setIsModalOpen, task, skillId }) => {
  const publicId = task?.content?.public_id;
  const { mutate: deleteTask, isPending } = useDeleteTask();
  const deleteVideo = useDeleteVideo();

  if (isPending || deleteVideo.isPending) {
    return <Loading />;
  }

  // deleting skill task
  const handleDeleteTask = (taskId) => {
    if (publicId) {
      deleteVideo.mutate({ publicId });
    }

    deleteTask({ skillId, taskId });
    setIsModalOpen(false);
  };

  return (
    <div className='fixed z-50 inset-0 flex items-center justify-center'>
      <div
        className='fixed inset-0 bg-black/60'
        onClick={() => setIsModalOpen(false)}
      />

      {/* Content */}
      <div className='p-8 max-w-md z-50 rounded-lg  flex flex-col gap-y-4 bg-white text-slate-950  '>
        <h1 className='font-bold text-xl'>Confirm Deletion</h1>

        <p>Are you sure you want to delete this task?</p>
        <p className='text-bold mt-2 text-lg flex gap-x-4 items-center text-red-700 capitalize'>
          Task <ArrowRight /> {task?.title}
        </p>

        {/* Action Button */}
        <div className='flex justify-center mt-4 gap-x-4'>
          <button
            onClick={() => setIsModalOpen(false)}
            className='btn btn-warning btn-sm'
          >
            <X size={18} /> Cancel
          </button>

          <button
            onClick={() => handleDeleteTask(task?._id)}
            className='btn btn-error btn-sm'
          >
            <Trash size={18} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeleteModal;
