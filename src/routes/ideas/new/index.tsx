import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import type { Idea } from '@/types';
import { createIdea } from '@/api/ideas';

export const Route = createFileRoute('/ideas/new/')({
  component: NewIdeaPage,
});

function NewIdeaPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createIdea,
    onSuccess: () => {
      navigate({
        to: '/ideas',
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !summary.trim() || !description.trim()) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await mutateAsync({
        title,
        summary,
        description,
        tags: tags
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag !== ''),
      });
    } catch (error) {
      console.log(error);
      alert('Something went wrong.');
    }
  };

  return (
    <div className='space-y-6'>
      <h1 className='text-3xl font-bold mb-6'>Create New Idea</h1>
      <form className='space-y-4' onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor='title'
            className='block text-gray-700 font-medium mb-1'
          >
            Title
          </label>
          <input
            type='text'
            id='title'
            value={title}
            placeholder='Enter idea title'
            className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor='summary'
            className='block text-gray-700 font-medium mb-1'
          >
            Summary
          </label>
          <input
            type='text'
            id='summary'
            value={summary}
            placeholder='Enter idea summary'
            className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor='description'
            className='block text-gray-700 font-medium mb-1'
          >
            Description
          </label>
          <textarea
            id='description'
            value={description}
            placeholder='Write out the description of your idea'
            rows={6}
            className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor='tags'
            className='block text-gray-700 font-medium mb-1'
          >
            Tags
          </label>
          <input
            type='text'
            id='tags'
            value={tags}
            placeholder='optional tags, comma separated'
            className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <div className='mt-5'>
          <button
            type='submit'
            className='block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isPending ? 'Creating ...' : 'Create Idea'}
          </button>
        </div>
      </form>
    </div>
  );
}
