import {  useEffect, useRef, useState } from "react";
import VideoPlayer from "./VideoPlayer";
import videojs from "video.js";
import { useParams } from "react-router-dom";
import axios from "axios";
import Comments from "./Comments";
function VideoWatch() {
  const { videoId } = useParams();
  const [videoFileLink, setVideoFileLink] = useState("");
  const [title,setTitle] = useState("");
  const url = `http://localhost:3000/api/v1/videos/${videoId}`;
  
  useEffect(()=>{
    const fetchVideoById = async () => {
      try {
        const response = await axios.get(url, { withCredentials: true });
        // console.log("Response: Video by id vala : ", response.data.data.videoFile);
        setVideoFileLink(response.data.data.videoFile);
        console.log("videoWatch :" + response.data.data.title);
        setTitle(response.data.data.title);
      } catch (error) {
        console.error(`Error fetching video By id : ${error.message}`);
        console.error("Error fetching Video By Id: ", error);
      }
    };

    fetchVideoById();
  },[url]);

  const playerRef = useRef(null)

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: videoFileLink,
      type: 'application/x-mpegURL'
      // type: 'video/mp4',
    }]
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  return (
    <>
      <div className="flex flex-col gap-2 w-full">
      <div className="mx-auto">
      <VideoPlayer className="rounded-xl w-full" title={title} options={videoJsOptions} onReady={handlePlayerReady} />
      </div>
      <div>
        <Comments/>
      </div>
      </div>
    </>
  );
}

export default VideoWatch;