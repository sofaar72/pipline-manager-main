import React, { useState, useRef, useEffect } from "react";

const SmoothFrameSlider = ({
  frames,
  onSelectFrame,
  currentFrameIndex,
  annotations,
  type,
  containerRef,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartFrame, setDragStartFrame] = useState(0);
  const sliderRef = useRef(null);
  const thumbRef = useRef(null);

  // Calculate position based on current frame
  const getThumbPosition = () => {
    if (frames.length === 0) return 0;
    return (currentFrameIndex / (frames.length - 1)) * 100;
  };

  // Get frame index from mouse position
  const getFrameFromPosition = (clientX) => {
    if (!sliderRef.current) return currentFrameIndex;

    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const frameIndex = Math.round((percentage / 100) * (frames.length - 1));
    return Math.max(0, Math.min(frames.length - 1, frameIndex));
  };

  // Handle mouse down on slider
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragStartFrame(currentFrameIndex);

    const frameIndex = getFrameFromPosition(e.clientX);
    onSelectFrame(frameIndex);
  };

  // Handle mouse move during drag
  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const frameIndex = getFrameFromPosition(e.clientX);
    onSelectFrame(frameIndex);
  };

  // Handle mouse up
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle global mouse events for smooth dragging outside the slider
  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e) => {
        handleMouseMove(e);
      };

      const handleGlobalMouseUp = () => {
        handleMouseUp();
      };

      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleGlobalMouseMove);
        document.removeEventListener("mouseup", handleGlobalMouseUp);
      };
    }
  }, [isDragging, frames.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        const direction = e.key === "ArrowRight" ? 1 : -1;
        const newFrameIndex = Math.max(
          0,
          Math.min(frames.length - 1, currentFrameIndex + direction)
        );
        onSelectFrame(newFrameIndex);
      }
    };

    if (sliderRef.current) {
      sliderRef.current.addEventListener("keydown", handleKeyDown);
      return () => {
        if (sliderRef.current) {
          sliderRef.current.removeEventListener("keydown", handleKeyDown);
        }
      };
    }
  }, [currentFrameIndex, frames.length, onSelectFrame]);

  if (type !== "Video" || frames.length === 0) {
    return (
      <div className="w-full h-[20px] flex gap-0 shrink-0 bg-[var(--overview-color-one)] rounded-sm"></div>
    );
  }

  return (
    <div className="w-full h-[20px] flex items-center gap-2 px-2 bg-[var(--overview-color-one)] rounded-sm">
      {/* Frame counter */}
      <div className="text-xs text-white font-mono min-w-[60px]">
        {currentFrameIndex + 1} / {frames.length}
      </div>

      {/* Main slider container */}
      <div className="flex-1 relative">
        <div
          ref={sliderRef}
          className="w-full h-[8px] bg-[var(--overview-color-three)] rounded-full cursor-pointer relative overflow-hidden"
          onMouseDown={handleMouseDown}
          tabIndex={0}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={frames.length - 1}
          aria-valuenow={currentFrameIndex}
          aria-label="Frame slider"
        >
          {/* Progress track */}
          <div
            className="absolute top-0 left-0 h-full bg-[var(--overview-color-done)] rounded-full transition-all duration-100"
            style={{ width: `${getThumbPosition()}%` }}
          />

          {/* Annotation markers */}
          {annotations &&
            annotations.map((frame, frameIndex) => {
              if (!frame.shapes || frame.shapes.length === 0) return null;

              const position = (frameIndex / (frames.length - 1)) * 100;
              return (
                <div
                  key={frameIndex}
                  className="absolute top-0 w-[2px] h-full bg-[var(--overview-color-faild)]"
                  style={{ left: `${position}%` }}
                  title={`Frame ${frameIndex + 1} has annotations`}
                />
              );
            })}

          {/* Thumb */}
          <div
            ref={thumbRef}
            className={`absolute top-1/2 w-[16px] h-[16px] bg-[var(--overview-color-progress)] rounded-full border-2 border-white transform -translate-y-1/2 transition-all duration-100 ${
              isDragging ? "scale-110 shadow-lg" : "hover:scale-105"
            }`}
            style={{ left: `calc(${getThumbPosition()}% - 8px)` }}
          />
        </div>

        {/* Frame markers */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {frames.map((_, frameIndex) => {
            if (frameIndex % Math.max(1, Math.floor(frames.length / 20)) !== 0)
              return null;

            const position = (frameIndex / (frames.length - 1)) * 100;
            return (
              <div
                key={frameIndex}
                className="absolute top-0 w-[1px] h-full bg-white/30"
                style={{ left: `${position}%` }}
              />
            );
          })}
        </div>
      </div>

      {/* Time display (if duration is available) */}
      <div className="text-xs text-white font-mono min-w-[80px] text-right">
        {containerRef?.current?.duration
          ? `${Math.floor(
              (currentFrameIndex / frames.length) *
                containerRef.current.duration
            )}s`
          : `${currentFrameIndex}f`}
      </div>
    </div>
  );
};

export default SmoothFrameSlider;
