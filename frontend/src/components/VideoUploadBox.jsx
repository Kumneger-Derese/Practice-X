import { UploadCloud } from 'lucide-react';
import { useRef } from 'react';

const VideoUploadBox = ({ onFileChange }) => {
  const fileRef = useRef(null);

  const handleClick = () => {
    fileRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      onFileChange(file);
    }
  };

  return (
    <div>
      <input
        type='file'
        accept='video/*'
        id='video'
        name='video'
        ref={fileRef}
        onChange={handleFileChange}
        className='hidden'
      />

      {/* The box */}
      <div
        onClick={handleClick}
        className='cursor-pointer border-2 border-dashed border-gray-400 p-6 rounded-xl text-center hover:bg-gray-50 dark:hover:bg-gray-800'
      >
        <div>
          <UploadCloud className='mx-auto text-gray-500 mb-2' size={32} />
          <p className='text-gray-600 dark:text-gray-300'>
            Click to upload a video
          </p>
          <p className='text-sm text-gray-400 mt-1'>MP4, WebM, up to 100MB</p>
        </div>
      </div>
    </div>
  );
};
export default VideoUploadBox;
