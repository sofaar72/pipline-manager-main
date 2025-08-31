import React, { useEffect } from "react";
import TheVideo from "./TheVideo";
import { useVideoControl } from "./useVideoControl";
import TheFrames from "./TheFrames";
import TheAnnotatorStage from "./TheAnnotatorStage";
import { useStageControl } from "./useStageControl";
import TheToolbar from "./TheToolbar";

const TheAnnotationWrapper = ({ previewWidth }) => {
  const {
    videoRef,
    height,
    changeHeight,
    frames,
    isPlaying,
    setIsPlaying,
    pauseOrPlay,
    pauseTheVideo,
    muteOrNot,
    isMuted,
    loopOrNot,
    isLoope,
  } = useVideoControl();
  const {
    stageSize,
    drawing,
    toggleDrawing,
    setDrawing,
    selecting,
    setSelecting,
    toggleSelecting,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    annotations,
    currentFrameIndex,
    setCurrentFrameIndex,
    handleSelectFrame,
    frameBoxRef,
    handleMouseDownDrag,
    handleMouseMoveDrag,
    handleMouseUpDrag,
    selectionRect,
    updateShape,
    deleteSelectedShapes,
  } = useStageControl({
    containerRef: videoRef,
    frames: frames,
    isplaying: isPlaying,
    isloope: isLoope,
  });

  useEffect(() => {
    pauseTheVideo();
    setDrawing(false);
    setSelecting(false);
    if (previewWidth < 550) {
      changeHeight();
    } else {
      changeHeight(280);
    }
  }, [previewWidth]);

  return (
    <div
      className={`w-full flex-1 flex flex-col gap-0 justify-between radius shrink-0 bg-blue-500 relative overflow-hidden`}
    >
      <div
        className={`w-full flex-1 shrink-0  relative overflow-hidden bg-black`}
        style={{ height: `${height}px` }}
      >
        <TheVideo
          ref={videoRef}
          previewWidth={previewWidth}
          isMuted={isMuted}
          isLoope={isLoope}
        />

        <TheAnnotatorStage
          stageSize={stageSize}
          handleMouseDown={handleMouseDown}
          handleMouseMove={handleMouseMove}
          handleMouseUp={handleMouseUp}
          annotations={annotations}
          currentFrameIndex={currentFrameIndex}
          drawing={drawing}
          selectionRect={selectionRect}
          selecting={selecting}
          updateShape={updateShape}
          deleteSelectedShapes={deleteSelectedShapes}
        />
      </div>
      {previewWidth >= 550 && (
        <div className="w-full h-[40px] flex flex-col gap-0  shrink-0 bg-[var(--overview-color-one)]">
          <TheFrames
            frames={frames}
            currentFrameIndex={currentFrameIndex}
            onSelectFrame={handleSelectFrame}
            annotations={annotations}
            frameBoxRef={frameBoxRef}
            handleMouseDownDrag={handleMouseDownDrag}
            handleMouseMoveDrag={handleMouseMoveDrag}
            handleMouseUpDrag={handleMouseUpDrag}
          />

          <TheToolbar
            isLoope={isLoope}
            isMuted={isMuted}
            isPlaying={isPlaying}
            pauseOrPlay={pauseOrPlay}
            muteOrNot={muteOrNot}
            loopOrNot={loopOrNot}
            // for annotation
            drawing={drawing}
            toggleDrawing={toggleDrawing}
            selecting={selecting}
            toggleSelecting={toggleSelecting}
          />
        </div>
      )}
    </div>
  );
};

export default TheAnnotationWrapper;
