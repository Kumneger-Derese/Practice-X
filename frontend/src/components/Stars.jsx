import { Star } from 'lucide-react';

const Stars = ({ rating }) => {
  let renderStar = 1;

  switch (rating) {
    case 1:
      {
        renderStar = (
          <div className='flex items-center gap-y-4 gap-x-1'>
            <Star />
          </div>
        );
      }
      break;
    case 2:
      {
        renderStar = (
          <div className='flex items-center gap-y-4 gap-x-1'>
            <Star />
            <Star />
          </div>
        );
      }
      break;
    case 3:
      {
        renderStar = (
          <div className='flex items-center gap-y-4 gap-x-1'>
            <Star />
            <Star />
            <Star />
          </div>
        );
      }
      break;
    case 4:
      {
        renderStar = (
          <div className='flex items-center gap-y-4 gap-x-1'>
            <Star /> <Star /> <Star /> <Star />
          </div>
        );
      }
      break;
    case 5:
      {
        renderStar = (
          <div className='flex items-center gap-y-4 gap-x-1'>
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />
          </div>
        );
      }
      break;
  }

  return <div className=' text-amber-300'>{renderStar}</div>;
};
export default Stars;
