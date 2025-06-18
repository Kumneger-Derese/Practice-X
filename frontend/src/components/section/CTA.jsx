import { Link } from 'react-router-dom';
import { HeroText } from '../GradientText';
import { useAuth } from '../../store/useAuthStore';

const CTA = () => {
  const { userInfo } = useAuth();
  return (
    <div className=' border-2 border-dashed h-[384px] flex flex-col gap-y-8 rounded-xl p-2 my-24 mx-8 items-center justify-center bg-conic-180 from-transparent via-40% via-purple-600 to-transparent'>
      <h1 className='text-white text-3xl sm:text-4xl font-black text-center'>
        Start your journey today. 100% free!
      </h1>
      <Link
        to={userInfo ? '/my-skills' : '/login'}
        className='btn md:btn-xl shadow-xs shadow-purple-800'
      >
        <HeroText className={''}>
          {userInfo ? 'Continue Learning' : '  Sign up Now'}
        </HeroText>
      </Link>
    </div>
  );
};
export default CTA;
