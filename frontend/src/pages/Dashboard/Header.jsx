import { Link } from 'react-router-dom';
import { useAuth } from '../../store/useAuthStore';
import {
  ArrowLeft,
  ChartPie,
  Home,
  LayoutDashboard,
  ListTodo,
  LucideCircleFadingPlus,
  UserRound,
  X,
} from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const { userInfo, logout } = useAuth();
  const [openDropdown, setOpenDropdown] = useState(false);

  const usernameFLetter = userInfo.username.charAt(0).toUpperCase();
  return (
    <div className='bg-neutral-100 border-b border-b-neutral-300 sm:ml-52 p-2 sticky top-0 justify-between flex items-center  sm:font-bold z-50'>
      <h1 className='font-mono md:tracking-wide text-neutral-500'>
        Welcome, {userInfo.username.split(' ')[0]}
      </h1>

      <div className='flex gap-x-4 items-center'>
        <Link
          to={'/create-skill'}
          className='gap-x-2 flex items-center text-purple-700'
        >
          <LucideCircleFadingPlus size={20} className='' />
          <span>Create Skill</span>
        </Link>

        {/* Avatar */}
        <div className='avatar avatar-online avatar-placeholder cursor-pointer'>
          <div
            onClick={() => setOpenDropdown(true)}
            className='-bg-linear-150 from-purple-600 via-fuchsia-900 via-20% to-indigo-800 text-white w-10 rounded-full'
          >
            <span className='text-xl'>{usernameFLetter}</span>
          </div>
        </div>
      </div>

      {/* On mobile devices */}
      {openDropdown && (
        <div className='sm:hidden fixed top-0 right-0 bottom-0 flex w-52 flex-col p-4 bg-neutral-200 z-[360] justify-between'>
          <div className=''>
            <X
              size={36}
              strokeWidth={3}
              onClick={() => setOpenDropdown(false)}
              className='hover:bg-base-300 hover:text-red-700 rounded-full p-2'
            />
          </div>

          <div className='flex flex-col gap-y-3'>
            <Link
              className='hover:bg-purple-500 text-white font-bold bg-purple-600 px-4 py-1 rounded-sm flex items-center gap-x-2 '
              to={'/'}
            >
              <Home size={18} /> Home
            </Link>
            <Link
              className='bg-neutral-400 text-white font-bold hover:bg-purple-600 px-4 py-1 rounded-sm flex items-center justify-between gap-x-2 '
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
          </div>

          <button
            onClick={logout}
            className='btn mt-16 btn-md btn-error flex items-center '
          >
            <ArrowLeft /> Logout
          </button>
        </div>
      )}
    </div>
  );
};
export default Header;
