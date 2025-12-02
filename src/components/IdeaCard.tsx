import { Link } from '@tanstack/react-router';
import type { Idea } from '@/types';

const IdeaCard = ({ idea }: { idea: Idea }) => {
  return (
    <div
      key={idea.id}
      className='border border-gray-300 p-4 rounded shadow bg-white flex flex-col justify-between'
    >
      <div>
        <h2 className='text-lg font-semibold'>{idea.title}</h2>
        <p className='text-gray-700 mt-2'>{idea.summary}</p>
      </div>
      <Link
        to='/ideas/$ideaId'
        params={{ ideaId: idea.id.toString() }}
        className='text-blue-600'
      >
        Read More →
      </Link>
    </div>
  );
};

export default IdeaCard;
