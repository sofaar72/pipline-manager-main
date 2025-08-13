import React, { useEffect } from "react";
import SandboxStage from "./SandboxStage";
import VideoPart from "./VideoPart";
import { useVideo } from "../../../hooks/annotationHooks/useVideo";
import VideoToolbar from "./VideoToolbar";
import FrameTimeline from "./FrameTimeline";
import AnnotatorStage from "./AnnotatorStage";
import { useStage } from "../../../hooks/annotationHooks/useStage";

const VideoAnnotation = () => {
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
  } = useVideo();

  const {
    stageSize,
    lines,
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
  } = useStage(selectedFrameIndex);

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

  useEffect(() => {
    console.log(frames);
  }, [frames]);

  return (
    <div className="w-full h-[740px] overflow-hidden radius">
      {/* <SandboxStage /> */}
      <div className="w-full h-[600px] relative">
        {/* video part  */}
        <div className="absolute top-0 left-0 w-full h-full radius overflow-hidden z-[1]">
          <VideoPart
            ref={videoRef}
            videoUrl={""}
            previewFrame={previewFrame}
            isMuted={isMuted}
            isPlaying={isPlaying}
            isLoope={isLoope}
          />
        </div>
        {previewFrame && (
          <div className="absolute  top-[40px] right-[20px] z-[999] pointer-events-none">
            <img
              src={previewFrame}
              alt="selected preview"
              className="w-[100px] h-[50px] object-cover border border-white/30 rounded"
            />
          </div>
        )}

        {/* annotation stages  */}
        <div className="absolute top-0 left-0 w-full h-full radius overflow-hidden  z-[2]">
          <AnnotatorStage
            frames={frames}
            mode={mode}
            setMode={setMode}
            setSelectedIds={setSelectedIds}
            stageSize={stageSize}
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
          />
        </div>
      </div>

      {/* video controls  */}
      <div className="w-full h-[85px] bg-black  overflow-hidden flex flex-col gap-[10px]">
        <FrameTimeline
          frames={frames}
          selectedFrameIndex={selectedFrameIndex}
          handleDragFrame={handleDragFrame}
          previewFrame={previewFrame}
          pauseTheVideo={pauseTheVideo}
          annotationsByFrame={lines}
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
        />
      </div>
    </div>
  );
};

export default VideoAnnotation;
