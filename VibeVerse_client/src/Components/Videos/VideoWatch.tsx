import {  useRef } from "react";
import VideoPlayer from "./VideoPlayer";
import videojs from "video.js";
function VideoWatch() {

  const playerRef = useRef(null)
  // const videoLink = "http://localhost:3000/video_uploads/content/07878c42-28de-4fa5-b5b6-3303b4d86d48/index.m3u8";
  const videoLink = "http://localhost:3000/video_uploads/content/aa0e7fbd-4d93-442c-80c6-f9ed2e4c29df/index.m3u8";
  // const videoLink = "http://localhost:3000/video_uploads/content/2e8e4b31-8962-4497-9ef5-dd4083db86aa/index.m3u8";

  // const videoLinks = ["http://localhost:3000/video_uploads/content/07878c42-28de-4fa5-b5b6-3303b4d86d48/index.m3u8",
  // "http://localhost:3000/video_uploads/content/aa0e7fbd-4d93-442c-80c6-f9ed2e4c29df/index.m3u8",
  // "http://localhost:3000/video_uploads/content/2e8e4b31-8962-4497-9ef5-dd4083db86aa/index.m3u8"
  // ]

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: videoLink,
      type: 'application/x-mpegURL'
      // type: 'video/MP2T',
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
      <div className="mx-auto">
      <VideoPlayer className="rounded-xl" options={videoJsOptions} onReady={handlePlayerReady} />
      </div>
    </>
  );
}

export default VideoWatch;