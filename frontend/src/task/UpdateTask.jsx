import { useEffect, useState } from 'react';
import useValidation from '../hooks/useValidation';
import { Edit, ListFilterPlus } from 'lucide-react';
import { useUpdateVideo } from '../hooks/useVideoApi';
import ErrorMessage from '../components/ErrorMessage';
import { updateTaskSchema } from '../schema/taskSchema';
import { useNavigate, useParams } from 'react-router-dom';
import VideoUploadBox from '../components/VideoUploadBox';
import { GradientHeading } from '../components/GradientText';
import Button, { ButtonSuccess } from '../components/Button';
import { useGetMyTask, useUpdateTask } from '../hooks/useTaskApi';
import { TextEditor } from '../components/TextEditor';

const UpdateTask = () => {
  const { skillId, taskId } = useParams();
  const { data: taskPlaceholder, isLoading, isSuccess } = useGetMyTask(taskId);

  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [textContent, setTextContent] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();
  const updateTask = useUpdateTask();
  const updateVideo = useUpdateVideo();
  const { validate } = useValidation(updateTaskSchema);

  useEffect(() => {
    if (taskPlaceholder && isSuccess) {
      setTitle(taskPlaceholder?.title);
      setTextContent(taskPlaceholder?.content);
      setType(taskPlaceholder?.type);
    }
  }, [taskPlaceholder, isSuccess]);

  if (isLoading) {
    return (
      <div className='p-4 h-screen text-2xl font-bold flex justify-center items-center'>
        <GradientHeading>
          <span>Loading task...</span>
        </GradientHeading>
      </div>
    );
  }

  if (updateVideo.isPending || updateTask.isPending) {
    return (
      <div className='p-4 h-screen text-2xl font-bold flex justify-center items-center'>
        <GradientHeading>
          <span>Updating ...</span>
        </GradientHeading>
      </div>
    );
  }

  //Handle submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    let content;

    const publicId = taskPlaceholder?.content?.public_id;

    if (type === 'video') {
      const videoMetadata = await updateVideo.mutateAsync({
        videoFile,
        publicId,
      });
      content = videoMetadata;
    } else {
      content = textContent;
    }

    const taskData = { title, type, content, skillId, taskId };
    const { errors, isValid, value } = validate(taskData);

    if (!isValid) {
      setFormErrors(errors);
      return;
    }

    await updateTask.mutateAsync(value);
  };

  return (
    <div className='p-2 sm:p-4'>
      <GradientHeading className='text-center'>Update Task</GradientHeading>

      <form
        onSubmit={(e) => e.preventDefault()}
        className='flex flex-col mx-3 sm:mx-8 my-4 border border-dashed rounded-md p-8'
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='input bg-transparent w-full border-purple-600'
            />
            <ErrorMessage error={formErrors.title} />
          </div>

          {/* Type Field select*/}
          <div className='flex flex-col gap-y-2 text-slate-900 '>
            <label htmlFor='type' className='label'>
              Type
            </label>

            <select
              id='type'
              name='type'
              value={type}
              onChange={(e) => setType(e.target.value)}
              className='select bg-transparent w-full border-purple-600'
            >
              <option value={'text'}>Text</option>
              <option value={'video'}>Video</option>
            </select>

            <ErrorMessage error={formErrors.type} />
          </div>

          {/* Task content conditional rendering*/}
          {type === 'video' ? (
            <div className='flex flex-col gap-y-2 text-slate-900'>
              <label htmlFor='video' className='label'>
                Video File
              </label>
              <VideoUploadBox
                onFileChange={(file) => setVideoFile(file)}
                videoFile={videoFile}
              />
              {videoFile && (
                <div className='mt-4 text-sm text-green-600'>
                  Selected: {videoFile.name}
                </div>
              )}
              <ErrorMessage error={formErrors.content} />
            </div>
          ) : (
            <div className='flex flex-col col-span-full gap-y-2 text-slate-900'>
              <p className='label'>Text Content</p>
              {textContent !== '' && (
                <TextEditor
                  content={textContent}
                  onContentChange={(html) => setTextContent(html)}
                />
              )}

              <ErrorMessage error={formErrors.content} />
            </div>
          )}
        </section>

        {/*Update task Action Button */}
        <div className='flex gap-x-8 mt-4 items-center'>
          <Button className={'btn-sm'} onClick={handleSubmit}>
            <Edit size={18} color='white' />
            <span> Update Task</span>
          </Button>

          <ButtonSuccess
            className={'btn-sm'}
            onClick={() => navigate(`/skill-detail/${skillId}`)}
          >
            <ListFilterPlus size={18} color='white' />
            See skill detail
          </ButtonSuccess>
        </div>
      </form>
    </div>
  );
};
export default UpdateTask;
