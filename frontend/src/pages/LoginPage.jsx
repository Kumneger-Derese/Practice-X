import Button from '../components/Button';
import { useEffect, useState } from 'react';
import { useAuth } from '../store/useAuthStore';
import { useLoginUser } from '../hooks/useUserApi';
import { loginSchema } from '../schema/userSchema';
import useValidation from '../hooks/useValidation';
import LoginImage from '../assets/images/Login.webp';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import { GradientHeading, GradientText } from '../components/GradientText';

const LoginPage = () => {
  const [formErrors, setFormErrors] = useState({});
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const { userInfo } = useAuth();
  const navigate = useNavigate();

  //* prevent logged in user from accesing login page
  useEffect(() => {
    if (userInfo) {
      navigate('/my-skills');
    }
  }, [userInfo, navigate]);

  const { validate } = useValidation(loginSchema);
  const { mutate: login, isPending } = useLoginUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors, isValid, value } = validate(userData);

    if (!isValid) {
      setFormErrors(errors);
      return; //turn off to show toast
    }

    const { email, password } = value;
    const formData = { email, password };

    login(formData, {
      onSuccess: () => {
        navigate('/skill-list');
      },
    });
  };

  return (
    <div className='bg-white flex max-w-screen'>
      <div className='bg-slate-900 min-h-screen flex flex-col items-center justify-center w-full md:w-6/12 text-slate-100'>
        <form
          onSubmit={handleSubmit}
          noValidate
          className='flex flex-col gap-y-4  p-8'
        >
          <GradientHeading className='mb-4 text-3xl'>
            Welcome To Practice X
          </GradientHeading>

          {/* Email Field */}
          <div className='flex flex-col gap-y-2'>
            <label htmlFor='email' className='label'>
              Email
            </label>
            <input
              id='email'
              type='email'
              name='email'
              placeholder='johndoe@gmail.com'
              value={userData.email}
              onChange={handleChange}
              className='input bg-transparent w-4/5'
            />
            <ErrorMessage error={formErrors.email} />
          </div>

          {/* Password Field */}
          <div className='flex flex-col gap-y-2'>
            <label htmlFor='password' className='label'>
              Password
            </label>
            <input
              id='password'
              type='password'
              name='password'
              placeholder='Enter your password'
              value={userData.password}
              onChange={handleChange}
              className='input bg-transparent w-4/5'
            />
            <ErrorMessage error={formErrors.password} />
          </div>

          <Button className={'w-4/5'}>
            {isPending ? 'Processing...' : 'Login'}
          </Button>
        </form>

        <div className='text-white md:pl-8'>
          Dont have account{' '}
          <Link className='inline-block ' to={'/register'}>
            <GradientText>Register</GradientText>
          </Link>
        </div>
      </div>

      {/* Login image */}
      <div className='min-h-screen hidden md:block w-6/12 object-cover rounded-2xl'>
        <img src={LoginImage} alt='register image' className='h-full' />
      </div>
    </div>
  );
};
export default LoginPage;
