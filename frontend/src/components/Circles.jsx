const Circles = () => {
  return (
    <div className=' size-80 md:size-96 shadow-2xl shadow-purple-900 flex items-center justify-center rounded-full bg-purple-800'>
      <div className=' size-64 md:size-80 shadow-2xl shadow-black flex items-center justify-center rounded-full bg-purple-700'>
        <div className=' size-48 md:size-64 shadow-2xl shadow-black flex  items-center justify-center rounded-full bg-purple-600'>
          <div className=' size-32 md:size-48 shadow-2xl shadow-black items-center flex justify-center rounded-full bg-purple-500'>
            <div className=' size-16 md:size-32 shadow-2xl shadow-black rounded-full flex items-center justify-center bg-purple-400'>
              <div className='hidden size-8 md:size-16 shadow-2xl shadow-black rounded-full sm:flex animate-pulse items-center justify-center bg-purple-300'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Circles;
