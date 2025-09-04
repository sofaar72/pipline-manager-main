import React, { forwardRef } from "react";

const TheVideo = forwardRef(
  ({ videoUrl = "", previewWidth, isMuted, isLoope }, ref) => {
    return (
      <>
        {/* Video */}
        <video
          className={`absolute w-full h-full shrink-0  object-contain bg-[var(--section-bg-color)]/20 overflow-hidden`}
          ref={ref}
          src={videoUrl ? videoUrl : "/videos/sample2.mp4"}
          muted={isMuted}
          loop={isLoope}
          // onPause={handlePause}
          crossOrigin="anonymous"
          // controls
        />

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
