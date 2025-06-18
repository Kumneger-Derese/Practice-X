import { X } from 'lucide-react';
import Button from '../components/Button';
import { useEffect, useState } from 'react';
import StarRating from '../components/StarRating';
import useValidation from '../hooks/useValidation';
import ErrorMessage from '../components/ErrorMessage';
import { updateReviewSchema } from '../schema/reviewShema';
import { useGetReview, useUpdateReview } from '../hooks/useReviewApi';

const UpdateReviewModal = ({
  skillId,
  reviewId,
  setIsReviewUpdateModalOpen,
}) => {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const { data: reviewPlaceholder, isLoading } = useGetReview(
    skillId,
    reviewId
  );
  const { validate } = useValidation(updateReviewSchema);
  const { mutate: updateReview, isPending } = useUpdateReview();

  useEffect(() => {
    setRating(reviewPlaceholder?.rating);
    setComment(reviewPlaceholder?.comment);
  }, [reviewPlaceholder]);

  if (isPending || isLoading) {
    <div className='flex justify-center items-center h-screen w-full'>
      <span className='loading scale-200 loading-ring loading-lg' />
    </div>;
  }

  //close modal
  const onCloseReviewModal = () => {
    setIsReviewUpdateModalOpen(false);
  };

  // handle data submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewData = { comment, rating };

    const { value, errors, isValid } = validate({
      skillId,
      reviewId,
      ...reviewData,
    });

    if (!isValid) {
      setFormErrors(errors);
    }

    updateReview(value);
    setIsReviewUpdateModalOpen(false);
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 transition-colors duration-500'>
      {/* Backdrop */}
      <div
        className='fixed inset-0 bg-black/60'
        onClick={() => setIsReviewUpdateModalOpen(false)}
      />

      {/* Content */}
      <div className='flex flex-col items-center justify-center w-10/12 md:w-3/6 mx-auto bg-white p-4 rounded-md relative'>
        <h1 className='font-bold text-2xl text-purple-900 my-2'>
          Edit a Review
        </h1>

        {/* close button */}
        <X
          size={34}
          className='absolute top-4 right-4 hover:text-red-600 bg-base-200 rounded-full p-2'
          onClick={onCloseReviewModal}
        />

        <form
          onSubmit={(e) => e.preventDefault()}
          className='flex flex-col gap-y-4  w-5/6 items-center justify-center'
        >
          {/* comment Field */}
          <div className='flex flex-col gap-y-2 w-full'>
            <label htmlFor='comment' className='label'>
              Comment
            </label>
            <textarea
              id='comment'
              type='comment'
              rows={3}
              name='comment'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className='textarea bg-transparent w-full border-purple-400'
            />
            <ErrorMessage error={formErrors.comment} />
          </div>

          {/* Rating */}
          <div className='flex flex-col gap-y-2 w-full'>
            <label htmlFor='rating' className='label'>
              Rating
            </label>
            <StarRating onRatingChange={setRating} initialRating={rating} />
            <ErrorMessage error={formErrors.rating} />
          </div>

          <Button onClick={handleSubmit} className={'w-full'}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};
export default UpdateReviewModal;
