import React, { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export const VideoPlayer = (props: any) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const { options, onReady } = props;

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        onReady && onReady(player);
      }));

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

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

  const handlePlaybackRateChange = (rate) => {
    const player = playerRef.current;
    if (player) {
      player.playbackRate(player.playbackRate() + rate);
    }
    console.log(player?.playbackRate() + rate);
  };

  return (
    <>
      <div className="w-full min-h-screen">
        <div className="mx-auto w-10/12 flex flex-col gap-2">
          <div
            data-vjs-player
            ref={videoRef}
            className="h-[84vh] border-2 rounded-2xl overflow-y-hidden"
          />
        </div>
        <div className="flex justify-center mt-4">
          <button onClick={() => handleFastForward(5)} className="mx-2 px-4 py-2 bg-blue-500 text-white rounded">Fast Forward 10s</button>
          <button onClick={() => handleFastBackward(5)} className="mx-2 px-4 py-2 bg-blue-500 text-white rounded">Fast Backward 10s</button>
          <button onClick={() => handlePlaybackRateChange(0.5)} className="mx-2 px-4 py-2 bg-green-500 text-white rounded">Increase Speed</button>
          <button onClick={() => handlePlaybackRateChange(-0.5)} className="mx-2 px-4 py-2 bg-red-500 text-white rounded">Decrease Speed</button>
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
