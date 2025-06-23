import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import { useUnEnrollSkill } from '../../hooks/useSkillApi';
import { useState } from 'react';
import Loading from '../../components/Loading';

const JoinedSkillList = ({ skill }) => {
  const [openUnenrollSkillModal, setOpenUnenrollSkillModal] = useState(false);

  const navigate = useNavigate();
  const {
    mutate: unEnrollSkill,
    isPending,
    isError,
    error,
  } = useUnEnrollSkill();

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className='flex items-center text-2xl font-bold text-red-700 justify-center w-full h-screen'>
        {error?.response?.userData?.message || error.message}
      </div>
    );
  }

  // handle skill un enrollment
  const handleUnEnrollSkill = (skillId) => {
    unEnrollSkill(skillId);
    setOpenUnenrollSkillModal(false);
  };
  return (
    <div
      key={skill._id}
      className='p-0.5 card bg-linear-150  from-purple-600 to-indigo-400  rounded-xl'
    >
      <div className='bg-neutral-50 rounded-xl px-4 pt-4  text-neutral-950'>
        <p className='font-bold mb-2 text-md  text-indigo-950'>
          Title: {skill.title}
        </p>
        <p>Creator: {skill.createdBy.username}</p>
        <p>Category: {skill.category}</p>

        {/* Joined skill action btn */}
        <div className=' flex items-center justify-between'>
          <Button
            className={'btn-sm'}
            onClick={() => navigate(`/skill-detail/${skill._id}`)}
          >
            Practice
          </Button>

          <button
            onClick={() => setOpenUnenrollSkillModal(true)}
            className='btn btn-error btn-sm'
          >
            Un Enroll
          </button>
        </div>
      </div>

      {/* Modal for un enrolling skill */}
      {openUnenrollSkillModal && (
        <Modal
          isOpen={openUnenrollSkillModal}
          onClose={() => setOpenUnenrollSkillModal(false)}
        >
          <div className='flex flex-col gap-y-3 text-slate-950'>
            <p className='p-8 font-bold'>
              Arey sure you want to{' '}
              <span className='text-red-700 underline underline-offset-2 decoration-blue-500 decoration-2 capitalize'>
                unenroll
              </span>{' '}
              this skill?
            </p>

            <button
              className='btn btn-error btn-sm self-center font-bold'
              onClick={() => handleUnEnrollSkill(skill._id)}
            >
              Unenroll
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};
export default JoinedSkillList;
