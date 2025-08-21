import React, { useState, useEffect } from "react";

export default function FrameTimeline({
  frames,
  selectedFrameIndex,
  handleDragFrame,
  previewFrame,
  videoRef,
  pauseTheVideo,
  annotationsByFrame, // { frameIndex: [lines...] }
  allAnnotations, // optional, not strictly needed here
}) {
  const [isDragging, setIsDragging] = useState(false);

  const handleSeek = (i) => {
    handleDragFrame(i);
  };

  useEffect(() => {
    console.log(allAnnotations[selectedFrameIndex]?.length);
  }, [allAnnotations]);

  // Arrow key navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!frames.length) return;
      let newIndex = selectedFrameIndex ?? 0;

      if (e.key === "ArrowRight") {
        newIndex = Math.min(newIndex + 1, frames.length - 1);
        handleDragFrame(newIndex);
      } else if (e.key === "ArrowLeft") {
        newIndex = Math.max(newIndex - 1, 0);
        handleDragFrame(newIndex);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [frames, selectedFrameIndex, handleDragFrame]);

  return (
    <div className="relative z-[999] w-full h-[50px] bg-black flex gap-0 select-none">
      {frames.map((f, i) => {
        const isBeforeOrSelected = i <= selectedFrameIndex;

        return (
          <div
            key={i}
            className="flex-1 h-full cursor-pointer"
            onMouseDown={() => {
              setIsDragging(true);
              handleSeek(i);
              pauseTheVideo();
            }}
            onMouseEnter={() => {
              if (isDragging) handleSeek(i);
            }}
            onMouseUp={() => setIsDragging(false)}
            style={{
              background:
                allAnnotations[f - 1]?.length > 0
                  ? "orange"
                  : isBeforeOrSelected
                  ? "rgba(0, 226, 154, 0.8)"
                  : i % 2 === 1
                  ? "#635ebb"
                  : "#332f56",
            }}
          ></div>
        );
      })}
    </div>
  );
}
