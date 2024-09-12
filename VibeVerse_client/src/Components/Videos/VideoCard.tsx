import React from 'react';
import { useNavigate } from 'react-router-dom';

function VideoCard({ items = [], imageField = 'thumbnail', titleField = 'title', onCardClick = () => {} }) {
  const navigate = useNavigate();

  const handleCardClick = (item) => {
    onCardClick(item);
    navigate(`/watch/${item._id}`);
    // console.log(" card clicked " + item._id);
  };

  // console.log("items: " + items[1]._id);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 ">
        {items.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-lg hover:cursor-pointer border-2 border-black border-opacity-50" onClick={() => handleCardClick(item)}>
            <img
              className="w-full h-32 object-cover rounded-md"
              src={item[imageField] || "https://via.placeholder.com/320x180"}
              alt="Thumbnail"
            />
            <h3 className="mt-2 text-lg font-semibold text-gray-900">
              {item[titleField] || "Default Title"}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoCard;
