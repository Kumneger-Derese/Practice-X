import { useState } from 'react';
import useValidation from '../hooks/useValidation';
import { useCreateTask } from '../hooks/useTaskApi';
import ErrorMessage from '../components/ErrorMessage';
import { useUploadVideo } from '../hooks/useVideoApi';
import { TextEditor } from '../components/TextEditor';
import { createTaskSchema } from '../schema/taskSchema';
import { useNavigate, useParams } from 'react-router-dom';
import Button, { ButtonSuccess } from '../components/Button';
import { GradientHeading } from '../components/GradientText';
import VideoUploadBox from '../components/VideoUploadBox';
import { ListFilterPlus, PlusCircle, UploadCloud } from 'lucide-react';

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('text');
  const [textContent, setTextContent] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();
  const { skillId } = useParams();
  const createTask = useCreateTask();
  const uplaodVideo = useUploadVideo();
  const { validate } = useValidation(createTaskSchema);

  if (uplaodVideo.isPending) {
    return (
      <div className='p-4 h-screen text-2xl font-bold flex justify-center items-center'>
        <GradientHeading>
          <span>Uploading video...</span>
        </GradientHeading>
        <span className='animate-bounce inline-block'>
          <UploadCloud />
        </span>
      </div>
    );
  } else if (createTask.isPending) {
    return (
      <div className='p-4 h-screen text-2xl font-bold flex justify-center items-center'>
        <GradientHeading>
          <span>Creating task...</span>
        </GradientHeading>
      </div>
    );
  }

  // handle create task with video
  const handleSubmit = async (e) => {
    e.preventDefault();

    let content;

    if (type === 'video') {
      const videoMetadata = await uplaodVideo.mutateAsync(videoFile);
      content = videoMetadata;
    } else {
      content = textContent;
    }

    const taskData = { title, type, content, skillId };
    const { errors, isValid, value } = validate(taskData);

    if (!isValid) {
      setFormErrors(errors);
      return;
    }

    await createTask.mutateAsync(value, {
      onSuccess: () => {
        setTitle('');
        setType('');
        setTextContent('');
      },
    });
  };

  return (
    <div className='p-4'>
      <GradientHeading className='text-center'>Create Task</GradientHeading>
      <form
        onSubmit={(e) => e.preventDefault()}
        className='flex flex-col mx-8 my-4 border border-dashed rounded-md p-8'
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
              placeholder='Intro to skill.'
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

          {/* Task content*/}
          {type === 'video' ? (
            <div className='flex sm:col-span-2 md:col-span-1 flex-col gap-y-2 text-slate-900'>
              <label htmlFor='video' className='label'>
                Video
              </label>
              <VideoUploadBox onFileChange={(file) => setVideoFile(file)} />
              {videoFile && (
                <div className='mt-4 text-sm text-green-600'>
                  Selected: {videoFile.name}
                </div>
              )}
              <ErrorMessage error={formErrors.content} />
            </div>
          ) : (
            <div className='flex col-span-full flex-col gap-y-2 text-slate-900'>
              <p className='label'>Text Content</p>
              <TextEditor
                content={textContent}
                onContentChange={(html) => setTextContent(html)}
              />
              <ErrorMessage error={formErrors.content} />
            </div>
          )}
        </section>

        {/* Action Button */}
        <div className='flex gap-x-8 mt-4 items-center'>
          <Button className={'btn-sm'} onClick={handleSubmit}>
            <PlusCircle color='white' size={18} />
            Add Task
          </Button>

          <ButtonSuccess
            className={'btn-sm'}
            onClick={() => navigate(`/skill-detail/${skillId}`)}
          >
            <ListFilterPlus color='white' size={18} />
            See skill detail
          </ButtonSuccess>
        </div>
      </form>
    </div>
  );
};
export default CreateTask;
