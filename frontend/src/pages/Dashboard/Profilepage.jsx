import { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage';
import useValidation from '../../hooks/useValidation';
import { updateSchema } from '../../schema/userSchema';
import { useUpdateUser } from '../../hooks/useUserApi';
import { GradientHeading } from '../../components/GradientText';
import Button from '../../components/Button';
import { useAuth } from '../../store/useAuthStore';

const Profilepage = () => {
  const { userInfo } = useAuth();
  const [formErrors, setFormErrors] = useState({});

  const [userData, setUserData] = useState({
    username: userInfo?.username,
    email: userInfo?.email,
    password: '',
    confirmPassword: '',
  });

  const { mutate: updateProfile, isPending } = useUpdateUser();
  const { validate } = useValidation(updateSchema);

  //* update profile input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  //* Update user profile handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors, isValid, value } = validate(userData);

    if (!isValid) {
      setFormErrors(errors);
      return;
    }

    const { username, email, password } = value;
    const formData = { username, email, password };
    updateProfile(formData);
  };

  return (
    <div className='mx-auto w-4/6'>
      <GradientHeading className={'text-center'}>User Profile</GradientHeading>

      <form
        onSubmit={handleSubmit}
        noValidate
        className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 ml-16  mx-auto p-4 rounded-lg'
      >
        {/* Username Field */}
        <div className='flex flex-col gap-y-2'>
          <label htmlFor='username' className='label'>
            Username
          </label>
          <input
            id='username'
            type='text'
            name='username'
            value={userData.username}
            onChange={handleChange}
            className='input bg-transparent  font-semibold border-purple-700'
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
            value={userData.email}
            onChange={handleChange}
            className='input bg-transparent border-purple-700  font-semibold'
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
            className='input bg-transparent border-purple-700  font-semibold'
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
            className='input bg-transparent border-purple-700  font-semibold'
          />
          <ErrorMessage error={formErrors.confirmPassword} />
        </div>

        <Button className='my-4 '>
          {isPending ? 'Updating...' : 'Update'}
        </Button>
      </form>
    </div>
  );
};
export default Profilepage;
