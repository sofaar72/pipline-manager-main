import React, { forwardRef, useEffect } from "react";

const TheVideo = forwardRef(
  ({ videoUrl = "", previewWidth, isMuted, isLoope, type }, ref) => {
    useEffect(() => {
      console.log(videoUrl);
    }, [videoUrl]);

    useEffect(() => {
      console.log(type);
    }, [type]);

    return (
      <>
        {/* Video */}
        {type === "Video" ? (
          <video
            className={`absolute w-full h-full shrink-0  object-contain bg-[var(--section-bg-color)]/20 overflow-hidden`}
            ref={ref}
            src={videoUrl ? videoUrl : ""}
            muted={isMuted}
            loop={isLoope}
            // onPause={handlePause}
            crossOrigin="anonymous"
            // controls
          />
        ) : (
          <img
            className={`absolute w-full h-full shrink-0  object-contain bg-[var(--section-bg-color)]/20 overflow-hidden`}
            ref={ref}
            src={videoUrl ? videoUrl : ""}
          />
        )}

        {/* Preview frame overlay */}
        {/* {previewFrame && (
          <img
          src={previewFrame}
          alt="Preview"
          className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
          />
          )} */}
      </>
    );
  }
);

export default TheVideo;
