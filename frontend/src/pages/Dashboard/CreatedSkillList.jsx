import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteSkill } from '../../hooks/useSkillApi';
import Modal from '../../components/Modal';
import Loading from '../../components/Loading';

const CreatedSkillList = ({ skill }) => {
  const [openDeleteSkillModal, setOpenDeleteSkillModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState('');

  const navigate = useNavigate();
  const {
    mutate: deleteSkill,
    isPending: isDeletePending,
    isError,
    error,
  } = useDeleteSkill();

  if (isDeletePending) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className='flex items-center text-2xl font-bold text-red-700 justify-center w-full h-screen'>
        {error?.response?.userData?.message || error.message}
      </div>
    );
  }

  // handle delete Modal
  const onClose = () => {
    setOpenDeleteSkillModal(false);
  };

  // handle delete skill
  const handleDeleteSkill = () => {
    deleteSkill(selectedSkill);
    onClose();
  };

  return (
    <div
      key={skill._id}
      className='card -bg-linear-120 from-indigo-400 to-indigo-900 p-4'
    >
      <p className='font-medium text-lg capitalize'>Title: {skill.title}</p>
      <p>Category: {skill?.category}</p>
      <p>Task: {skill?.tasks.length} tasks</p>

      {/* Created Skill Action button */}
      <div className='card-actions py-2'>
        <button
          className='py-1 rounded-md bg-black text-white border-none btn-sm px-4'
          onClick={() => navigate(`/skill-detail/${skill._id}`)}
        >
          Detail
        </button>
        <button
          className='py-1 rounded-md  bg-amber-700 border-none btn-sm px-4'
          onClick={() => navigate(`/update-skill/${skill._id}`)}
        >
          Edit
        </button>
        <button
          onClick={() => {
            setOpenDeleteSkillModal(true);
            setSelectedSkill(skill?._id);
          }}
          className='py-1 rounded-md  bg-red-700 border-none btn-sm px-4'
        >
          Delete
        </button>
      </div>

      {openDeleteSkillModal && (
        <Modal isOpen={openDeleteSkillModal} onClose={onClose}>
          <div className='flex flex-col gap-y-3 text-slate-950'>
            <p className='p-8 font-bold'>
              Arey sure you want to{' '}
              <span className='text-red-700 underline underline-offset-2 decoration-blue-500 decoration-2'>
                Delete
              </span>{' '}
              this skill?
            </p>

            <button
              className='btn btn-error btn-sm self-center'
              onClick={handleDeleteSkill}
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};
export default CreatedSkillList;
