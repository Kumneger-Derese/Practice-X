import { Link } from 'react-router-dom';
import { GradientHeading } from '../../components/GradientText';
import { useAuth } from '../../store/useAuthStore';
import {
  ArrowLeft,
  ChartPie,
  Home,
  LayoutDashboard,
  ListTodo,
  UserRound,
} from 'lucide-react';

const SideBar = () => {
  const { logout, userInfo } = useAuth();

  return (
    <section className='hidden sm:block w-52 bg-neutral-200 fixed top-0 left-0 bottom-0 border-r border-r-neutral-300'>
      <div className='flex px-3 pb-8 flex-col justify-between h-full'>
        <div className='flex flex-col transition-colors duration-500'>
          <div className='pl-2 mb-8'>
            <Link to={'/my-skills'}>
              <GradientHeading className='mb-2'>Practice X</GradientHeading>
            </Link>
            <div className='indent-4'>
              <h1 className='font-bold capitalize'>{userInfo.username}</h1>
              <h1 className='text-neutral-500'>{userInfo.email}</h1>
            </div>
          </div>

          {/* Optimize the list */}

          <ul className='flex flex-col gap-y-2.5 w-full'>
            <Link
              className='hover:bg-purple-500 text-white font-bold bg-purple-600 px-4 py-1 rounded-sm flex items-center gap-x-2 '
              to={'/'}
            >
              <Home size={18} /> Home
            </Link>
            <Link
              className='bg-neutral-400 text-white font-bold hover:bg-purple-600 px-4 py-1 rounded-sm flex items-center gap-x-2 '
              to={'/skill-list'}
            >
              <LayoutDashboard size={18} /> Browse Skills
            </Link>
            <Link
              className='bg-neutral-400 text-white font-bold hover:bg-purple-600 px-4 py-1 rounded-sm flex items-center gap-x-2'
              to={'/dashboard'}
            >
              <ChartPie size={18} /> Statics
            </Link>
            <Link
              className='bg-neutral-400 text-white font-bold hover:bg-purple-600 px-4 py-1 rounded-sm flex items-center gap-x-2'
              to={'/dashboard/profile'}
            >
              <UserRound size={18} /> Profile
            </Link>
            <Link
              className='bg-neutral-400 text-white font-bold hover:bg-purple-600 px-4 py-1 rounded-sm flex items-center gap-x-2'
              to={'/my-skills'}
            >
              <ListTodo size={18} /> My Skills
            </Link>
          </ul>
        </div>

        <button
          onClick={logout}
          className='btn btn-md btn-error flex items-center '
        >
          <ArrowLeft /> Logout
        </button>
      </div>
    </section>
  );
};
export default SideBar;
