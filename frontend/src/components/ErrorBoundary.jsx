import { useRouteError } from 'react-router-dom';

const ErrorBoundary = () => {
  const error = useRouteError();

  return (
    <div className='grid grid-cols-1 min-h-screen place-content-center place-items-center'>
      <h1 className='text-3xl font-bold text-red-800'>
        Oops! {error.name} occured,{' '}
        <span className='text-neutral-900 italic'>{error.message}.</span>
      </h1>
    </div>
  );
};
export default ErrorBoundary;
