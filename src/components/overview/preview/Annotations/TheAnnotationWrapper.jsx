import React, { useEffect } from "react";
import TheVideo from "./TheVideo";
import { useVideoControl } from "./useVideoControl";
import TheFrames from "./TheFrames";
import TheAnnotatorStage from "./TheAnnotatorStage";
import { useStageControl } from "./useStageControl";
import TheToolbar from "./TheToolbar";
import { ACTIONS } from "./Actions";
import Loading from "../../../golbals/Loading";

const TheAnnotationWrapper = ({
  previewWidth,
  isResizing,
  versionPreviewData,
}) => {
  const {
    videoRef,
    height,
    changeHeight,
    frames,
    isPlaying,
    pauseTheVideo,
    isMuted,
    isLoope,
    pauseOrPlay,
    muteOrNot,
    loopOrNot,
    prevVideoData,
    setPrevVideoData,
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
    handleSelectFrame,
    frameBoxRef,
    handleMouseDownDrag,
    handleMouseMoveDrag,
    handleMouseUpDrag,
    selectionRect,
    updateShape,
    deleteSelectedShapes,
    stageRef,
    action,
    setAction,
    fillColor,
    setFillColor,
    isDraggable,
    transformerRef,
    transformActive,
    handleStageMouseDown,
    handleStageMouseMove,
    handleStageMouseUp,
    toggleFullscreen,
    isFullScreen,
    getShapesForFrame,
    stageToVideoCoords,
    normalizeRect,
    denormalizeRect,
    normalizedToVideoRect,
    normalizeCircle,
    denormalizeCircle,
    normalizedToVideoCircle,
    normalizeArrow,
    denormalizeArrow,
    normalizedToVideoArrow,
    normalizeLine,
    denormalizeLine,
    normalizedToVideoLine,
    handleTransformEnd,
    isPainting,
    fetchAllAnnotations,
    sendAllAnnotations,
    annotationResults,
    getAnnotationLoading,
  } = useStageControl({
    containerRef: videoRef,
    frames,
    isplaying: isPlaying,
    isloope: isLoope,
    media_id: prevVideoData.media_id,
  });

  // setvideo url
  useEffect(() => {
    if (versionPreviewData && versionPreviewData.previews) {
      console.log(versionPreviewData.previews[0]);
      setPrevVideoData({
        media_id: versionPreviewData?.previews[0]?.media_id,
        url: versionPreviewData?.previews[0]?.download_url,
        duration: versionPreviewData?.previews[0]?.duration,
      });
    }
  }, [versionPreviewData]);

  // fetch annotations
  useEffect(() => {
    console.log(annotations);
    if (prevVideoData.media_id) {
      fetchAllAnnotations(prevVideoData.media_id);
    }
  }, [prevVideoData]);

  useEffect(() => {
    console.log(annotationResults);
  }, [annotationResults]);

  // send annotations
  useEffect(() => {
    if (!prevVideoData.media_id) return;

    const allEmpty = annotations?.every((frame) => frame.shapes.length === 0);

    const handler = setTimeout(() => {
      if (!allEmpty) {
        sendAllAnnotations({
          annotations,
          file: prevVideoData.media_id,
        });
      }
    }, 2000); // 2 seconds delay

    return () => {
      clearTimeout(handler);
    };
  }, [annotations, prevVideoData.media_id]);

  // default back to select
  useEffect(() => {
    setAction(ACTIONS.SELECT);
  }, [isPlaying]);

  useEffect(() => {
    setAction(ACTIONS.SELECT);
    pauseTheVideo();
    setSelecting(false);

    if (previewWidth < 550) changeHeight();
    else changeHeight(280);
  }, [previewWidth]);

  const containerClass = isFullScreen
    ? "fixed top-0 left-0 w-full h-full z-[999999] flex flex-col gap-0 justify-between bg-blue-500 overflow-hidden"
    : "w-full flex-1 flex flex-col gap-0 justify-between bg-blue-500 relative overflow-hidden";

  return (
    <div className={containerClass}>
      <div
        className="w-full flex-1 relative overflow-hidden bg-black"
        style={{ height: `${height}px` }}
      >
        <TheVideo
          ref={videoRef}
          previewWidth={previewWidth}
          isMuted={isMuted}
          isLoope={isLoope}
          videoUrl={prevVideoData?.url}
        />
        {getAnnotationLoading ? (
          <Loading />
        ) : (
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
            stageRef={stageRef}
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
            stageToVideoCoords={stageToVideoCoords}
            normalizeRect={normalizeRect}
            denormalizeRect={denormalizeRect}
            normalizedToVideoRect={normalizedToVideoRect}
            normalizeCircle={normalizeCircle}
            denormalizeCircle={denormalizeCircle}
            normalizedToVideoCircle={normalizedToVideoCircle}
            normalizeArrow={normalizeArrow}
            denormalizeArrow={denormalizeArrow}
            normalizedToVideoArrow={normalizedToVideoArrow}
            normalizeLine={normalizeLine}
            denormalizeLine={denormalizeLine}
            normalizedToVideoLine={normalizedToVideoLine}
            handleTransformEnd={handleTransformEnd}
          />
        )}
      </div>

      {/* {previewWidth >= 550 && ( */}
      <div className="w-full h-[40px] flex flex-col bg-[var(--overview-color-one)]">
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
          selecting={selecting}
          action={action}
          setAction={setAction}
          fillColor={fillColor}
          setFillColor={setFillColor}
          isFullScreen={isFullScreen}
          toggleFullscreen={toggleFullscreen}
          previewWidth={previewWidth}
        />
      </div>
      {/* )} */}
    </div>
  );
};

export default TheAnnotationWrapper;
