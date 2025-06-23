import { useState } from 'react';
import { Plus } from 'lucide-react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import useValidation from '../hooks/useValidation';
import ErrorMessage from '../components/ErrorMessage';
import { useCreateSkill } from '../hooks/useSkillApi';
import { createSkillSchema } from '../schema/skillSchema';
import { GradientHeading } from '../components/GradientText';
import { categories } from '../constant/categories';

const CreateSkill = () => {
  const [formErrors, setFormErrors] = useState({});
  const [skillData, setSkillData] = useState({
    title: '',
    description: '',
    category: 'others',
  });

  const navigate = useNavigate();
  const { mutate: createSkill, isPending } = useCreateSkill();
  const { validate } = useValidation(createSkillSchema);

  if (isPending) {
    return <Loading />;
  }

  //* handle input field change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setSkillData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors, isValid, value } = validate(skillData);

    if (!isValid) {
      setFormErrors(errors);
      return;
    }

    createSkill(value, {
      onSuccess: (data) => {
        navigate(`/create-task/${data?._id}`);
      },
    });
  };

  return (
    <div className='p-4'>
      <GradientHeading className='text-center'>Create Skill</GradientHeading>

      <form
        onSubmit={handleSubmit}
        className='flex flex-col mx-8 border border-dashed rounded-md p-6'
      >
        <section className='grid sm:grid-cols-2 gap-y-4 gap-x-24 '>
          {/* Title Field */}
          <div className='flex flex-col gap-y-2 text-slate-900'>
            <label htmlFor='title' className='label'>
              Title
            </label>
            <input
              id='title'
              type='text'
              name='title'
              placeholder='How to use vite in react app.'
              value={skillData.title}
              onChange={handleChange}
              className='input bg-transparent w-full border-purple-600'
            />
            <ErrorMessage error={formErrors.title} />
          </div>

          {/* Category Field select*/}
          <div className='flex flex-col gap-y-2 text-slate-900 '>
            <label htmlFor='category' className='label'>
              Category Label
            </label>

            <select
              value={skillData.category}
              onChange={handleChange}
              id='category'
              name='category'
              className='select bg-transparent w-full border-purple-600'
            >
              {categories.map((category) => (
                <option value={category.toLowerCase()} className='capitalize'>
                  {category}
                </option>
              ))}
            </select>

            <ErrorMessage error={formErrors.category} />
          </div>

          {/* Skill description  textarea*/}
          <div className='flex sm:col-span-2 md:col-span-1 flex-col gap-y-2 text-slate-900 '>
            <label htmlFor='description' className='label'>
              Description
            </label>
            <textarea
              value={skillData.description}
              onChange={handleChange}
              id='description'
              name='description'
              className='textarea bg-transparent w-full border-purple-600'
              placeholder='Skill description'
            />
            <ErrorMessage error={formErrors.description} />
          </div>
        </section>

        <Button className={'h-12 w-full btn-sm md:w-1/5 text-lg'}>
          <Plus color='white' />
          Create
        </Button>
      </form>
    </div>
  );
};
export default CreateSkill;
