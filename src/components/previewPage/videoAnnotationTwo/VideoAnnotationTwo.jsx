import React, { forwardRef, useEffect } from "react";

import VideoPart from "./VideoPart";
import { useVideo } from "../../../hooks/annotationHooks/useVideo";
import VideoToolbar from "./VideoToolbar";
import FrameTimeline from "./FrameTimeline";
import AnnotatorStage from "./AnnotatorStage";
import { useStage } from "../../../hooks/annotationHooks/useStage";

const VideoAnnotationTwo = ({ width, height, aspectRatio }) => {
  const {
    videoRef,
    frames,
    extractFrames,
    selectedFrameIndex,
    handleDragFrame,
    previewFrame,
    isPlaying,
    pauseOrPlay,
    muteOrNot,
    loopOrNot,
    isMuted,
    isLoope,
    setIsPlaying,
    setIsMuted,
    setIsLoope,
    pauseTheVideo,
    toggleFullscreen,
    setStrokeColor,
    strokeColor,
  } = useVideo();

  const {
    // stageSize,
    lines,
    allLines,
    setSelectedIds,
    selection,
    isSelecting,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleDragEnd,
    getLineBBox,
    handleDelete,
    deselectId,
    mode,
    setMode,
    selectedIds,
    initialSize,
  } = useStage({ frame: selectedFrameIndex, color: strokeColor });

  useEffect(() => {
    extractFrames();
  }, []);

  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;

    const handleEnded = () => {
      // Stop playing when video finishes
      setIsPlaying(false);
      // Optionally, reset to start
      // video.currentTime = 0;
    };
    video.addEventListener("ended", handleEnded);

    if (isPlaying) {
      video?.play();
    } else {
      video?.pause();
    }

    // Cleanup
    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, [isPlaying]);

  return (
    <div className="w-full h-full overflow-hidden radius shrink-0">
      <div className="w-full h-full relative shrink-0">
        {/* annotation stages  */}
        <div
          id="annotation-container"
          className="absolute top-0 left-0 w-full h-full radius overflow-hidden  z-[2]"
        >
          <AnnotatorStage
            frames={frames}
            mode={mode}
            setMode={setMode}
            setSelectedIds={setSelectedIds}
            lines={lines}
            selection={selection}
            isSelecting={isSelecting}
            handleMouseDown={handleMouseDown}
            handleMouseMove={handleMouseMove}
            handleMouseUp={handleMouseUp}
            handleDragEnd={handleDragEnd}
            getLineBBox={getLineBBox}
            handleDelete={handleDelete}
            deselectId={deselectId}
            selectedIds={selectedIds}
            strokeColor={strokeColor}
            stageSize={{
              width: width,
              height: height,
              aspectRatio: aspectRatio,
            }}
            initialSize={initialSize}
          />
        </div>
      </div>

      {/* video controls  */}
      {/* <div className="w-full h-[85px] bg-black  overflow-hidden flex flex-col gap-[10px]">
        <FrameTimeline
          frames={frames}
          selectedFrameIndex={selectedFrameIndex}
          handleDragFrame={handleDragFrame}
          previewFrame={previewFrame}
          pauseTheVideo={pauseTheVideo}
          annotationsByFrame={lines}
          allAnnotations={allLines}
        />
        <VideoToolbar
          isPlaying={isPlaying}
          isLoope={isLoope}
          isMuted={isMuted}
          pauseOrPlay={pauseOrPlay}
          muteOrNot={muteOrNot}
          loopOrNot={loopOrNot}
          toggleFullscreen={toggleFullscreen}
          mode={mode}
          setMode={setMode}
          setSelectedIds={setSelectedIds}
          strokeColor={strokeColor}
          setStrokeColor={setStrokeColor}
        />
      </div> */}
    </div>
  );
};

export default VideoAnnotationTwo;
