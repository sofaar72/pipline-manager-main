import React, { forwardRef } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

const VideoPlayerTwo = forwardRef(
  ({ videoUrl, anotateable, isPaused, setIsPaused }, videoRef) => {
    // Pause handler to trigger annotation
    const handlePause = () => {
      setIsPaused(true);
    };

    const handlePlay = () => {
      setIsPaused(false);
    };

    const pauseOrPlay = () => {
      console.log(videoRef);
      const video = videoRef?.current;
      if (!video) return;

      if (video?.paused) {
        video?.play();
        handlePlay();
      } else {
        video?.pause();
        handlePause();
      }
    };
    return (
      <>
        {!anotateable && (
          <div
            className="absolute z-[50] top-0 left-0 w-full h-full flex items-center justify-center cursor-pointer z-10"
            onClick={pauseOrPlay}
          >
            {isPaused ? (
              <div className="w-[100px] h-[100px] flex items-center justify-center bg-white/20 rounded-full">
                <FaPlay className="text-white text-3xl opacity-100 hover:scale-110 transition" />
              </div>
            ) : (
              <div className="w-[100px] h-[100px] flex items-center justify-center bg-white/20 rounded-full">
                <FaPause className="text-white text-3xl opacity-100 hover:scale-110 transition" />
              </div>
            )}
          </div>
        )}
        <video
          ref={videoRef}
          src={videoUrl ? videoUrl : "/videos/sample2.mp4"}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          onPause={handlePause}
          onPlay={handlePlay}
          // controls
        />
      </>
    );
  }
);

export default VideoPlayerTwo;
