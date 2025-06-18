import { GradientHeading, HeroText } from '../GradientText';

const HowItWorks = () => {
  return (
    <div className='my-40 mx-8 '>
      <GradientHeading className={'text-center text-shadow-2xs mb-8 text-3xl'}>
        How It Works
      </GradientHeading>
      <div className='flex items-center justify-center'>
        <ul className='timeline timeline-vertical lg:timeline-horizontal'>
          <li>
            <div className='timeline-start pr-4'>First</div>
            <div className='timeline-middle'>•</div>
            <div className='timeline-end timeline-box font-bold text-base'>
              Choose a skill
            </div>
            <hr />
          </li>

          <li>
            <hr />
            <div className='timeline-start pr-4'>Then</div>
            <div className='timeline-middle'>•</div>
            <div className='timeline-end timeline-box font-bold text-base '>
              <HeroText>Complete real-world practice tasks</HeroText>
            </div>
            <hr />
          </li>

          <li>
            <hr />
            <div className='timeline-start pr-4'>Boom</div>
            <div className='timeline-middle'>•</div>
            <div className='timeline-end timeline-box font-bold text-base'>
              Track your progress and earn streaks
            </div>
            <hr />
          </li>
        </ul>
      </div>
    </div>
  );
};
export default HowItWorks;
