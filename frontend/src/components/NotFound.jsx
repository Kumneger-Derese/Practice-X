import { useLocation } from 'react-router-dom';

const NotFound = () => {
  const { pathname } = useLocation();

  return (
    <div className='grid h-screen grid-cols-1 place-content-center place-items-center'>
      <h1 className='text-3xl font-bold text-red-700'>
        404 | Page [ {pathname} ] not found.
      </h1>
    </div>
  );
};
export default NotFound;
