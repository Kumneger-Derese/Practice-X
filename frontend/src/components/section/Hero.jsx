import Circles from '../Circles';
import { HeroText } from '../GradientText';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row sm:h-[90vh] w-full'>
      {/* Left Section */}
      <section className='flex-1/2 ml-8 mt-16 sm:mt-0 mb-8 mx-auto sm:mb-0 h-full flex flex-col items-center justify-center'>
        <h1 className='leading-14 w-full text-neutral-800 text-4xl md:text-5xl font-black'>
          Master any skill,
          <HeroText className={'inline'}>
            <br /> One
          </HeroText>
          <HeroText className={'inline'}> Practice</HeroText> at a Time
          <HeroText className={'inline'}>.</HeroText>
        </h1>

        <p className='self-start border-l-3 pl-2 my-4 font-medium border-l-indigo-600'>
          The best way to level up your skills with real hands-on tasks.
        </p>

        <div className='self-start mt-4 mb-12'>
          <Link to={'/login'} className='btn shadow shadow-purple-700'>
            <HeroText>Get started</HeroText>
          </Link>
        </div>
      </section>

      {/* Right Section */}
      <section className='flex-1/2 mb-22 sm:mb-0 flex items-center justify-center sm:w-full sm:h-full'>
        <Circles />
      </section>
    </div>
  );
};
export default Hero;
