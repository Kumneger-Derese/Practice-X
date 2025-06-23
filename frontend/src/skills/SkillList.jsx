import { useState } from 'react';
import Button from '../components/Button';
import { Funnel, SearchX } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';
import { GradientHeading2 } from '../components/GradientText';
import { useGetPagenatedSkills, useJoinSkill } from '../hooks/useSkillApi';
import { categories } from '../constant/categories';
import Loading from '../components/Loading';

const SkillList = () => {
  const limit = 9;
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(false);

  const navigate = useNavigate();
  const debouncedSearch = useDebounce(search);

  const { mutate: joinSkill, isPending } = useJoinSkill();
  const { data: pagenatedSkillList, isLoading } = useGetPagenatedSkills({
    search: debouncedSearch,
    category,
    page,
    limit,
  });

  if (isLoading || isPending) {
    return <Loading />;
  }

  // handles join skill
  const handleJoinSkill = (skillId) => {
    joinSkill({ skillId });
    navigate(`/skill-detail/${skillId}`);
  };

  // handles search input
  const handleSerach = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  // handles category btns
  const handleCategory = (cat) => {
    let category = cat.toLowerCase();

    if (category === 'all') {
      setCategory('');
      setPage(1);
      setOpenDropdown(false);
      return;
    }

    setCategory(category);
    setPage(1);
    setOpenDropdown(false);
  };

  return (
    <div className='p-4 px-8 relative'>
      <div className='flex gap-x-8 justify-between items-center mb-4'>
        <GradientHeading2 className='text-purple-600'>
          Skill List
        </GradientHeading2>

        {/* left section filter and serach wrapper */}
        <section className='gap-x-4 flex'>
          {/* filter functionality*/}
          <div className='relative'>
            <button
              className={` ${openDropdown && 'bg-base-300 rounded-full p-1.5'}`}
              onClick={() => setOpenDropdown((prev) => !prev)}
            >
              <Funnel className={`text-black hover:text-purple-600`} />
            </button>

            {openDropdown && (
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 absolute w-52 sm:min-w-[340px] h-52 overflow-y-scroll top-12 -right-16 sm:right-2 rounded-md p-3  bg-neutral-300 z-[60] '>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategory(cat)}
                    className={`px-3 text-center text-white py-1 rounded-md border-none capitalize 
                      ${cat === category ? 'bg-blue-500' : 'bg-gray-800'} `}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Serach functionality */}
          <div className='flex items-center '>
            <input
              type='text'
              id='search'
              name='search'
              value={search}
              onChange={handleSerach}
              placeholder='search skill here...'
              className='input input-sm w-48 sm:max-w-72 text-base bg-transparent border-purple-700'
            />
            <SearchX
              onClick={() => {
                setSearch('');
                setCategory('');
              }}
              className='-ml-8 text-purple-800 hover:text-purple-600 z-40'
            />
          </div>
        </section>
      </div>

      <div className='grid mx-2 sm:mx-0 grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4'>
        {pagenatedSkillList?.data?.length < 1 ? (
          <div className='flex flex-col items-center justify-center  col-span-full'>
            <div className='text-black flex flex-col justify-center items-center w-full sm:w-3/6 px-4 py-6  mt-12 border border-dashed rounded-md '>
              <p className='font-semibold md:font-bold md:text-xl pt-4 text-neutral text-xl mb-8'>
                No skill found by this title and Category. But you can create
                One!
              </p>
              <Link to={'/create-skill'} className=''>
                <Button>Create Skill</Button>
              </Link>
            </div>
          </div>
        ) : (
          pagenatedSkillList?.data?.map((skill) => (
            <div
              key={skill._id}
              className='card bg-linear-120 text-white  from-indigo-700 via-slate-800 to-purple-700 p-3'
            >
              <div className='card-title'>
                <p className='capitalize'>{skill.title}</p>
              </div>

              <div className='flex flex-col my-4'>
                <p className='line-clamp-1 text-neutral-300 mb-4'>
                  {skill.description}
                </p>
                <span className=''>Category: {skill.category}</span>
                <span>Created by {skill.createdBy.username}</span>
              </div>

              <div className='card-actions justify-end'>
                <button
                  className=' transition-colors duration-500 px-6 py-2 text-neutral-800 hover:text-neutral-900 rounded-sm font-bold border-none bg-purple-200 hover:bg-purple-400'
                  onClick={() => handleJoinSkill(skill._id)}
                >
                  Join Skill
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Paginated Control */}
      {pagenatedSkillList?.currentPage > 1 &&
        pagenatedSkillList?.totalPage > pagenatedSkillList?.currentPage && (
          <div className=' fixed bottom-8 bg-base-200 rounded-3xl right-4 gap-x-4 flex justify-between p-2 z-[40] border border-black'>
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className='btn btn-neutral disabled:btn-info '
            >
              Previous
            </button>
            <button
              disabled={page >= pagenatedSkillList.totalPage}
              onClick={() => setPage((prev) => prev + 1)}
              className='btn btn-neutral disabled:btn-info '
            >
              Next
            </button>
          </div>
        )}
    </div>
  );
};
export default SkillList;
