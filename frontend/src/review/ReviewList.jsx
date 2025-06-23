import { useState } from 'react';
import Stars from '../components/Stars';
import Modal from '../components/Modal';
import { Pencil, Trash } from 'lucide-react';
import UpdateReviewModal from './UpdateReviewModal';
import { useDeleteReview } from '../hooks/useReviewApi';
import Loading from '../components/Loading';

const ReviewList = ({ review, userInfo, skillId }) => {
  const reviewId = review?._id;
  const [isReviewUpdateModalOpen, setIsReviewUpdateModalOpen] = useState(false);
  const [isReviewDeleteModalOpen, setIsReviewDeleteModalOpen] = useState(false);

  const { mutate: deleteReview, isPending } = useDeleteReview();

  if (isPending) {
    return <Loading />;
  }

  //Handles review deletion
  const handleDeleteReview = () => {
    deleteReview({ skillId, reviewId });
    setIsReviewDeleteModalOpen(false);
  };

  return (
    <div>
      <div key={review?._id} className='card bg-base-200 p-4 '>
        {/* Review comment */}
        <p className='font-medium mb-4'>{review?.comment}</p>

        <div>
          <Stars key={review?._id} rating={review?.rating} />
        </div>

        <div className='flex justify-between'>
          {/* If editor is the creator shown else hidden */}
          {userInfo._id === review?.userId?._id && (
            <div className='flex gap-x-5'>
              <button onClick={() => setIsReviewDeleteModalOpen(true)}>
                {/* button to delete review */}
                <Trash size={18} className='text-red-800' />
              </button>

              {/* button to update review */}
              <button onClick={() => setIsReviewUpdateModalOpen(true)}>
                <Pencil size={18} className='text-amber-800' />
              </button>
            </div>
          )}

          {/* Review creator */}
          <p className='mb-2 mt-2'>
            By <span className='font-bold  '>{review?.userId?.username}</span>
          </p>
        </div>
      </div>

      {/* Delete Review Modal */}
      {isReviewDeleteModalOpen && (
        <Modal
          isOpen={isReviewDeleteModalOpen}
          onClose={() => setIsReviewDeleteModalOpen(false)}
        >
          <div className='flex flex-col gap-y-3 text-slate-950'>
            <p className='p-8 font-bold'>
              Arey sure you want to{' '}
              <span className='text-red-700 underline underline-offset-2 decoration-blue-500 decoration-2'>
                Delete
              </span>{' '}
              this review?
            </p>

            <button
              className='btn btn-error btn-sm self-center'
              onClick={handleDeleteReview}
            >
              Delete
            </button>
          </div>
        </Modal>
      )}

      {/* Update skill review Modal */}
      {isReviewUpdateModalOpen && (
        <UpdateReviewModal
          reviewId={review._id}
          skillId={skillId}
          setIsReviewUpdateModalOpen={setIsReviewUpdateModalOpen}
        />
      )}
    </div>
  );
};
export default ReviewList;
