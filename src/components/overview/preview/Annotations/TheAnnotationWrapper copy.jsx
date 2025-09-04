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
    selecting,
    setSelecting,

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

    // news
    stageRef,
    action,
    setAction,
    fillColor,
    setFillColor,
    rectangles,
    isDraggable,
    transformerRef,
    transformActive,
    handleStageMouseDown,
    handleStageMouseMove,
    handleStageMouseUp,
    toggleFullscreen,
    isFullScreen,
    getShapesForFrame,
    denormalizeShape,
    denormalizeRect,
    stageToVideoCoords,
    normalizeRect,
    normalizedToVideoRect,
  } = useStageControl({
    containerRef: videoRef,
    frames: frames,
    isplaying: isPlaying,
    isloope: isLoope,
  });

  useEffect(() => {
    pauseTheVideo();

    setSelecting(false);
    if (previewWidth < 550) {
      changeHeight();
    } else {
      changeHeight(280);
    }
  }, [previewWidth]);

  const defaultClass =
    "w-full flex-1 flex flex-col gap-0 justify-between radius shrink-0 bg-blue-500 relative overflow-hidden";

  const fullScreenClass =
    "fixed top-0 left-0 w-full h-full z-[9999999999999999999999999999999]  flex flex-col gap-0 justify-between radius shrink-0 bg-blue-500  overflow-hidden";

  return (
    <div className={isFullScreen ? fullScreenClass : defaultClass}>
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
          selectionRect={selectionRect}
          selecting={selecting}
          updateShape={updateShape}
          deleteSelectedShapes={deleteSelectedShapes}
          // new
          stageRef={stageRef}
          rectangles={rectangles}
          fillColor={fillColor}
          action={action}
          isDraggable={isDraggable}
          transformerRef={transformerRef}
          transformActive={transformActive}
          handleStageMouseDown={handleStageMouseDown}
          handleStageMouseMove={handleStageMouseMove}
          handleStageMouseUp={handleStageMouseUp}
          isFullScreen={isFullScreen}
          getShapesForFrame={getShapesForFrame}
          denormalizeShape={denormalizeShape}
          denormalizeRect={denormalizeRect}
          stageToVideoCoords={stageToVideoCoords}
          normalizeRect={normalizeRect}
          normalizedToVideoRect={normalizedToVideoRect}
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

            selecting={selecting}
            // news
            action={action}
            setAction={setAction}
            fillColor={fillColor}
            setFillColor={setFillColor}
            isFullScreen={isFullScreen}
            toggleFullscreen={toggleFullscreen}
          />
        </div>
      )}
    </div>
  );
};

export default TheAnnotationWrapper;
