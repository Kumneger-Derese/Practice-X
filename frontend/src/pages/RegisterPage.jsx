import { useEffect, useState } from 'react';
import useValidation from '../hooks/useValidation';
import { updateSchema } from '../schema/userSchema';
import ErrorMessage from '../components/ErrorMessage';
import { useRegisterUser } from '../hooks/useUserApi';
import { useAuth } from '../store/useAuthStore';
import { Link, useNavigate } from 'react-router-dom';
import RegisterImage from '../assets/images/Register 1.webp';
import Button from '../components/Button';
import { GradientHeading, GradientText } from '../components/GradientText';

const RegisterPage = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  //* prevent registered in user from accesing login page
  useEffect(() => {
    if (userInfo) {
      navigate('/my-skills');
    }
  }, [userInfo, navigate]);

  const { validate } = useValidation(updateSchema);
  const { mutate: register, isPending } = useRegisterUser();

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

    const { username, email, password } = value;
    const formData = { username, email, password };
    register(formData, {
      onSuccess: () => {
        navigate('/skill-list');
      },
    });
  };

  return (
    <div className='bg-white flex max-w-screen'>
      {/* Placeholder image */}
      <div className='min-h-screen hidden md:block w-6/12 object-cover rounded-2xl'>
        <img src={RegisterImage} alt='register image' className='h-full' />
      </div>

      {/* Register form on the right */}
      <div className='bg-slate-900 min-h-screen w-full flex flex-col justify-center items-center md:w-6/12 text-slate-100'>
        <form
          onSubmit={handleSubmit}
          noValidate
          className='flex mx-auto flex-col gap-y-4 p-8 pb-4 w-full'
        >
          <GradientHeading className='mb-4'>Register Here</GradientHeading>
          {/* Username Field */}
          <div className='flex flex-col gap-y-2'>
            <label htmlFor='username' className='label'>
              Username
            </label>
            <input
              id='username'
              type='text'
              name='username'
              placeholder='Jon Doe'
              value={userData.username}
              onChange={handleChange}
              className='input bg-transparent w-4/5'
            />
            <ErrorMessage error={formErrors.username} />
          </div>
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
          {/* Confirm Password Field */}
          <div className='flex flex-col gap-y-2'>
            <label htmlFor='confirmPassword' className='label'>
              Confirm Password
            </label>
            <input
              id='confirmPassword'
              type='password'
              name='confirmPassword'
              placeholder='Re-enter your password'
              value={userData.confirmPassword}
              onChange={handleChange}
              className='input bg-transparent w-4/5'
            />
            <ErrorMessage error={formErrors.confirmPassword} />
          </div>
          <Button className={'w-4/5'}>
            {isPending ? 'Processing...' : 'Register'}
          </Button>
        </form>

        <div className='text-white md:pl-8'>
          Already have an account
          <Link className='inline-block pl-2' to={'/login'}>
            <GradientText>Login</GradientText>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
