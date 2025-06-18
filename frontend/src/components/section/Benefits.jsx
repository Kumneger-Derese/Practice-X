import { GradientHeading } from '../GradientText';
import { benefits } from '../../constant/benefits';
import { CheckCircle, Target } from 'lucide-react';

const Benefits = () => {
  return (
    <div className='mx-8 mb-24 min-h-[480px'>
      <GradientHeading className={'text-3xl font-bold mb-16 text-shadow-xs'}>
        Why Choose Practice X
      </GradientHeading>

      <section className='flex flex-col sm:flex-row gap-4'>
        {/* Left section */}
        <div className='flex-1/2 flex mb-32 md:mb-0 justify-center items-center relative'>
          <Target className='size-64 text-purple-500' />
        </div>

        {/* Right section */}
        <div className='flex-1/2 flex flex-col gap-6 w-full'>
          {benefits.map((benefit) => (
            <div key={benefit.id} className='flex gap-x-4 in-checked:'>
              <div className='size-12 flex justify-center items-center bg-purple-300 rounded-full p-4'>
                <CheckCircle />
              </div>

              <div>
                <h2 className='font-semibold'>{benefit.title}</h2>
                <p className='text-gray-600'>{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default Benefits;
