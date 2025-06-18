import { GradientHeading } from '../GradientText';
import { features } from '../../constant/featuresData';
import React from 'react';

const Features = () => {
  return (
    <div className='my-24 mx-8'>
      <GradientHeading className={'mb-6 text-3xl text-shadow-2xs'}>
        Features
      </GradientHeading>

      <section className='grid mx-auto w-full grid-cols-2 md:grid-cols-3 lg:px-16 gap-4'>
        {features.map(({ icon: Icon, text }) => (
          <div
            key={text}
            className='card size-40 sm:size-56 bg-base-200 flex justify-center items-center gap-y-6'
          >
            <div className='bg-purple-200 p-3  shadow shadow-black/20 rounded-full size-12 lg:size-24 flex items-center justify-center'>
              <Icon className='text-indigo-700 size-10' />
            </div>

            <p className='font-medium sm:text-lg text-center text-black'>
              {/* Logic to break paragraph in needed place. */}
              {text.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line} <br />
                </React.Fragment>
              ))}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};
export default Features;
