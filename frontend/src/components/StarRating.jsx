import { Star } from 'lucide-react';
import { useState } from 'react';

const StarRating = ({ initialRating = 0, onRatingChange }) => {
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(initialRating);

  const handleClick = (index) => {
    setRating(index);
    if (onRatingChange) {
      onRatingChange(index);
    }
  };

  const onMouseEnter = (index) => {
    setHover(index);
  };

  const onMouseLeave = () => {
    setHover(0);
  };

  return (
    <div className='flex items-center gap-x-3'>
      {[...Array(5)].map((_, index) => {
        index += 1;
        return (
          <button
            key={index}
            className={`
              text-3xl  transition-colors duration-200 cursor-pointer
              ${
                index <= (hover || rating) ? 'text-yellow-500' : 'text-gray-500'
              }
              `}
            onClick={() => handleClick(index)}
            onMouseEnter={() => onMouseEnter(index)}
            onMouseLeave={onMouseLeave}
          >
            <Star />
          </button>
        );
      })}
    </div>
  );
};
export default StarRating;
