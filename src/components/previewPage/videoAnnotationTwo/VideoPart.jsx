import React, { forwardRef, useEffect } from "react";

const VideoPart = forwardRef(
  ({ videoUrl = "", previewFrame, isMuted = false, isLoope = false }, ref) => {
    return (
      <div className="w-full h-full relative shrink-0">
        {/* Video */}
        <video
          className="w-full h-full shrink-0  object-contain bg-[var(--section-bg-color)]/20"
          ref={ref}
          src={videoUrl ? videoUrl : "/videos/sample2.mp4"}
          muted={isMuted}
          loop={isLoope}
          // onPause={handlePause}
          // onPlay={handlePlay}
          crossOrigin="anonymous"
        />

        {/* Preview frame overlay */}
        {/* {previewFrame && (
          <img
            src={previewFrame}
            alt="Preview"
            className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
          />
        )} */}
      </div>
    );
  }
);

export default VideoPart;
