import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import NavBar from './components/NavBar';

const App = () => {
  const { pathname } = useLocation();

  //routes to hide navbar
  const hideNavPaths = ['/dashboard', '/login', '/register'];

  //check for exact match
  const shouldHideNav = hideNavPaths.some((path) => pathname.startsWith(path));
  return (
    <div>
      {!shouldHideNav && <NavBar />}

      <Toaster position='top-center' />
      <Outlet />
    </div>
  );
};
export default App;
