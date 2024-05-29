import React from "react";
// import { useState } from "react";
import { useNavigate} from "react-router-dom";

function VideoCard() {

  const navigate = useNavigate();

  const visitVideo = () => {
    // Navigate to "/watch" route
    navigate("/watch");
  };
  return (
    <>
      <div className="flex flex-col">
        <button onClick={visitVideo}>
          <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-gray-700 opacity-90 ">
            <img
              className="w-full"
              src="/img/card-top.jpg"
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil.
              </p>
            </div>
          </div>
        </button>

        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #photography
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #travel
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #winter
          </span>
        </div>
      </div>
    </>
  );
}

export default VideoCard;
