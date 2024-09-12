import React from 'react'
import { useNavigate } from 'react-router-dom';

function PlaylistDisplay({playlists}) {
    const navigate = useNavigate();
    const handleCardClick = () => {
        // onCardClick(item);
        navigate('/watch');
      };
  return (
    <>
     <div className='w-full'>
      <div className='flex flex-col gap-3 mt-4'>
        {playlists.map((playlist, index) => (
          <div onClick={handleCardClick} key={index} className='w-full h-full p-4 rounded-lg shadow-md hover:cursor-pointer bg-gray-300 text-start justify-start flex flex-col gap-2'>
            <h3 className='text-lg leading-8 font-semibold '>{playlist.title}</h3>
            <p className='text-md font-semibold'>{playlist.description}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default PlaylistDisplay;