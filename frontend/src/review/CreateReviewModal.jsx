import { X } from 'lucide-react';
import { useState } from 'react';
import { useCreateReview } from '../hooks/useReviewApi';
import useValidation from '../hooks/useValidation';
import { createReviewSchema } from '../schema/reviewShema';
import ErrorMessage from '../components/ErrorMessage';
import Button from '../components/Button';
import StarRating from '../components/StarRating';

const CreateReviewModal = ({ skillId, setIsReviewModalOpen }) => {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const { validate } = useValidation(createReviewSchema);
  const { mutate: createReview, isPending } = useCreateReview();

  if (isPending) {
    <div className='flex justify-center items-center h-screen w-full'>
      <span className='loading scale-200 loading-ring loading-lg'></span>
    </div>;
  }

  //close modal
  const onCloseReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  // handle data submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewData = { comment, rating };
    const { value, errors, isValid } = validate({ skillId, ...reviewData });

    if (!isValid) {
      setFormErrors(errors);
    }

    createReview(value);
    !isValid ? setIsReviewModalOpen(true) : setIsReviewModalOpen(false);
    setComment('');
    setRating('');
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 transition-colors duration-500'>
      <div
        className='fixed inset-0 bg-black/60'
        onClick={() => setIsReviewModalOpen(false)}
      />
      {/* Modal content */}
      <div className='flex flex-col items-center justify-center w-10/12 md:w-3/6 mx-auto bg-white p-4 rounded-md relative'>
        <h1 className='font-bold text-2xl text-purple-900 my-2'>
          Leave a Review
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
              placeholder='Write a comment here...'
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
export default CreateReviewModal;
