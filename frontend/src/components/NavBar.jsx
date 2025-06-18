import { Link } from 'react-router-dom';
import { useAuth } from '../store/useAuthStore';
import { GradientHeading } from './GradientText';
import {
  AlignRight,
  ChartPie,
  Home,
  LayoutDashboard,
  ListTodo,
  UserRound,
  X,
} from 'lucide-react';
import { useState } from 'react';

const NavBar = () => {
  const { userInfo } = useAuth();
  const [openNav, setOpenNav] = useState(false);

  return (
    <nav className='flex bg-neutral-100 z-50  shadow-2xs sticky top-0 px-4 items-center justify-between'>
      <Link to={'/my-skills'}>
        <GradientHeading>Practice X</GradientHeading>
      </Link>

      {/* Desktop nav item rendering */}
      <div className='hidden sm:flex font-bold items-center space-x-4'>
        {userInfo ? (
          <>
            <Link to={'/my-skills'}>My Skills</Link>
            <Link to={'/skill-list'}>Browse skill</Link>
            <Link to={'/dashboard'}>Dashboard</Link>
          </>
        ) : (
          <>
            <Link to={'/register'}>Register</Link>
            <Link to={'/login'}>Login</Link>
          </>
        )}
      </div>
      {/* if user info & mobile Nav trigger */}
      {userInfo && (
        <AlignRight
          className='sm:hidden'
          onClick={() => setOpenNav((prev) => !prev)}
        />
      )}

      {/*mobile Nav if user is not logged in */}
      {!userInfo && (
        <div className='sm:hidden flex gap-x-4'>
          <Link to={'/register'}>Register</Link>
          <Link to={'/login'}>Login</Link>
        </div>
      )}

      {/* mobile nav item if logged in*/}
      {userInfo && openNav && (
        <div className='sm:hidden fixed top-0 right-0 bottom-0 flex w-52 flex-col p-4 bg-neutral-200 z-[360]'>
          <div className='my-4 mb-8'>
            <X
              size={36}
              strokeWidth={3}
              onClick={() => setOpenNav(false)}
              className='hover:bg-base-300 hover:text-red-700 rounded-full p-2'
            />
          </div>
          <div className='flex flex-col gap-y-3'>
            <Link
              onClick={() => setOpenNav(false)}
              className='hover:bg-purple-500 text-white font-bold bg-purple-600 px-4 py-1 rounded-sm flex items-center gap-x-2 '
              to={'/'}
            >
              <Home size={18} /> Home
            </Link>
            <Link
              onClick={() => setOpenNav(false)}
              className='bg-neutral-400 text-white font-bold hover:bg-purple-600 px-4 py-1 rounded-sm flex items-center gap-x-2 '
              to={'/skill-list'}
            >
              <LayoutDashboard size={18} /> Browse Skills
            </Link>
            <Link
              onClick={() => setOpenNav(false)}
              className='bg-neutral-400 text-white font-bold hover:bg-purple-600 px-4 py-1 rounded-sm flex items-center gap-x-2'
              to={'/dashboard'}
            >
              <ChartPie size={18} /> Statics
            </Link>
            <Link
              className='bg-neutral-400 text-white font-bold hover:bg-purple-600 px-4 py-1 rounded-sm flex items-center gap-x-2'
              to={'/dashboard/profile'}
              onClick={() => setOpenNav(false)}
            >
              <UserRound size={18} /> Profile
            </Link>
            <Link
              className='bg-neutral-400 text-white font-bold hover:bg-purple-600 px-4 py-1 rounded-sm flex items-center gap-x-2'
              to={'/my-skills'}
              onClick={() => setOpenNav(false)}
            >
              <ListTodo size={18} /> My Skills
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
export default NavBar;
