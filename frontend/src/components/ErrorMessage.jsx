const ErrorMessage = ({ error }) => {
  return error && <p className='text-error'>{error}</p>;
};
export default ErrorMessage;
