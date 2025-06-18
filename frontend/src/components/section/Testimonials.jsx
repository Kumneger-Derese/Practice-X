import { useEffect, useState } from 'react';
import { testimonials } from '../../constant/testimonials';
import { GradientHeading } from '../GradientText';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const totalTestimonial = testimonials.length - 1;

  // automatic scroll
  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prev) => {
        if (prev === testimonials.length - 1) {
          return 0;
        } else {
          return prev + 1;
        }
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [index]);

  //Next
  const nextPage = () => {
    if (index < totalTestimonial) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  };

  //Prev
  const prevPage = () => {
    if (index > 0) {
      setIndex(index - 1);
    } else {
      setIndex(totalTestimonial);
    }
  };

  return (
    <div className='mx-8 my-24 mt-40 min-h-[480px]'>
      <GradientHeading className='text-3xl font-bold mb-16 text-shadow-xs'>
        Testimonials
      </GradientHeading>

      <section className='flex justify-center items-center '>
        <div className=' w-full mx-4 md:mx-0 md:w-3/6 h-fit flex flex-col items-center justify-center bg-base-300 p-8 rounded-2xl'>
          <div className='text-center flex flex-col items-center justify-center'>
            {/* Avatar Letter */}
            <div className='size-16 mb-2 flex items-center justify-center rounded-full avatar bg-purple-950'>
              <p className='text-gray-50 capitalize text-2xl font-bold'>
                {testimonials[index].name.split('')[0].charAt(0)}
              </p>
            </div>

            <h4 className='font-semibold text-base mb-2'>
              {testimonials[index].name}
            </h4>
            <p className='text-gray-600 italic'>{testimonials[index].quote}</p>
          </div>

          {/* Buttons */}
          <div className='flex w-full justify-between mx-8 mt-8'>
            <button onClick={prevPage} className='btn shadow shadow-indigo-600'>
              <ChevronLeft strokeWidth={3} className='text-indigo-600' />
            </button>
            <button onClick={nextPage} className='btn shadow shadow-indigo-600'>
              <ChevronRight strokeWidth={3} className='text-indigo-600' />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Testimonials;
