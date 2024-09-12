import React, { useRef, useEffect, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { FaFastForward, FaFastBackward } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { useParams } from "react-router-dom";
import axios from "axios";

export const VideoPlayer = (props) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const { options, onReady } = props;
  const { videoId } = useParams();
  const url = `http://localhost:3000/api/v1/likes/toggle/v/${videoId}`;
  const getLikeCountUrl = `http://localhost:3000/api/v1/likes/getvideolikes/v/${videoId}`;

  useEffect(() => {
    // Initialize the Video.js player only once
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        onReady && onReady(player);
      }));
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  const handlePlaybackRateChange = (rate) => {
    const player = playerRef.current;
    if (player) {
      player.playbackRate(parseFloat(rate));
      player.play();
    }
  };

  const handleFastForward = (seconds) => {
    const player = playerRef.current;
    if (player) {
      player.currentTime(player.currentTime() + seconds);
    }
  };

  const handleFastBackward = (seconds) => {
    const player = playerRef.current;
    if (player) {
      player.currentTime(player.currentTime() - seconds);
    }
  };

  // Dispose of the Video.js player when the component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  const [like, setLike] = useState("");
  const [LikesCount, setLikeCount] = useState(0);
  const [loginUser,setLoginUser] = useState("");

  useEffect(() => {
    const getLkeCount = async () => {
      try {
        const likecount = await axios.post(
          getLikeCountUrl,
          {},
          { withCredentials: true }
        );
        // console.log("Response: Video pe Like count : ", likecount.data.data);
        setLikeCount(likecount.data.data);
      } catch (error) {
        console.error(`Error fetching video By id : ${error.message}`);
        console.error("Error fetching Video By Id: ", error);
      }
    };
    getLkeCount();
  }, [LikesCount]);

  
  const handleLike = async () => {
    try {
      const response = await axios.post(
        url,
        {}, // data object (if any, you can pass here or leave empty if not needed)
        { withCredentials: true }
      );
      // console.log("Response: Video pe Like : ", response.data);
      setLike(response.data.message);
      // console.log("videoWatch :" + response.data.data.title);
    } catch (error) {
      console.error(`Error on like the video : ${error.message}`);
      console.error("Error Error on like the video : ", error);
      setLoginUser("Request failed with status code 401");
    }
  };

  return (
    <>
      <div className="w-full min-h-screen">
        <div className="mx-auto lg:w-[66vw] flex flex-col gap-2 shadow-lg shadow-gray-600 rounded-2xl">
          <div
            data-vjs-player
            ref={videoRef}
            className="lg:w-[66vw] lg:h-[80vh] border-2 rounded-2xl overflow-hidden "
          />
        </div>
        <div className="flex flex-row justify-between mt-4">
          <div className="text-lg text-black font-sans font-bold w-8/12">
            {props.title}
          </div>
          <div className="flex justify-end gap-4  ">
            <div>
              <button onClick={handleLike}>
                <div className="text-black text-4xl mt-5">
                  {like === "liked video!" ? <FcLike /> : <FcLikePlaceholder />}
                </div>
              </button>
              <div className="text-xl ml-3 text-black font-sans font-semibold ">
                {LikesCount}
              </div>
              <div> 
                {loginUser === "Request failed with status code 401"?"Please login first" : ""}
              </div>
            </div>
            <div>
              {/* <label
              htmlFor="speedChange"
              className="block mb-2 text-sm font-medium text-black opacity-90"
            >
              Change Speed
            </label> */}
              <select
                id="countries"
                onChange={(e) => handlePlaybackRateChange(e.target.value)}
                className="mt-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  bg-black opacity-90 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="0.25">0.25x</option>
                <option value="0.5">0.5x</option>
                <option selected value="1">
                  1x
                </option>
                <option value="1.5">1.5x</option>
                <option value="1.75">1.75x</option>
                <option value="2">2x</option>
              </select>
            </div>

            <button
              onClick={() => handleFastBackward(5)}
              className="mt-8 w-16 px-6 items-center h-10 bg-black opacity-90 text-white rounded"
            >
              <FaFastBackward />
            </button>
            <button
              onClick={() => handleFastForward(5)}
              className="mt-8 w-16 px-6 items-center h-10 bg-black opacity-90 text-white rounded"
            >
              <FaFastForward />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
