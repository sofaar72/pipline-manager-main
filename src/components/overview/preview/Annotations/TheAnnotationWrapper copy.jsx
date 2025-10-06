import React, { useEffect, useState } from "react";
import TheVideo from "./TheVideo";
import { useVideoControl } from "./useVideoControl";
import TheFrames from "./TheFrames";
import SmoothFrameSlider from "./SmoothFrameSlider";
import TheAnnotatorStage from "./TheAnnotatorStage";
import { useStageControl } from "./useStageControl";
import TheToolbar from "./TheToolbar";
import { ACTIONS } from "./Actions";
import Loading from "../../../golbals/Loading";

const TheAnnotationWrapper = ({
  previewWidth,
  isResizing,
  versionPreviewData,
  setFullScreenOverview,
  entityValidTaskTypes,
}) => {
  const {
    videoRef,
    height,
    changeHeight,
    frames,
    setFrames,
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
    normalizeText,
    denormalizeText,
    normalizedToVideoText,
    handleTransformEnd,
    isPainting,
    fetchAllAnnotations,
    sendAllAnnotations,
    annotationResults,
    getAnnotationLoading,
    clearAnnotations, // Add this function to clear annotations
    setCurrentFrameIndex,
    isCompare,
    setIsCompare,
  } = useStageControl({
    containerRef: videoRef,
    frames,
    isplaying: isPlaying,
    isloope: isLoope,
    media_id: prevVideoData.media_id,
    prevVideoData,
  });

  useEffect(() => {
    setFullScreenOverview(isFullScreen);
  }, [isFullScreen]);

  // setvideo url

  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (
      versionPreviewData &&
      versionPreviewData.previews &&
      versionPreviewData.previews.length > 0
    ) {
      // Reset index to 0 when new version data is loaded
      if (index >= versionPreviewData.previews.length) {
        setIndex(0);
      }

      setPrevVideoData({
        id: versionPreviewData?.previews?.findIndex(
          (p) => p === versionPreviewData.previews[index]
        ),
        media_id: versionPreviewData?.previews[index]?.media_id,
        url:
          versionPreviewData?.previews[index]?.ld_download_url ||
          versionPreviewData?.previews[index]?.hd_download_url,
        duration: versionPreviewData?.previews[index]?.duration,
        type: versionPreviewData?.previews[index]?.type,
      });
    }
  }, [versionPreviewData, index]);

  // fetch annotations - FIXED: Clear annotations when media_id changes
  useEffect(() => {
    if (prevVideoData.media_id) {
      // Clear existing annotations first
      clearAnnotations();
      // Reset video controls when new video is loaded
      pauseTheVideo();
      setCurrentFrameIndex(0);
      // Reset video element
      if (prevVideoData.type === "Video") {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.load(); // Force reload of video element
        }
      }
      // Reset frames for new video
      if (prevVideoData.duration) {
        const staticFrames = Array.from(
          { length: prevVideoData.duration },
          (_, index) => index + 1
        );
        setFrames(staticFrames);
      }
      // Then fetch new annotations
      fetchAllAnnotations(prevVideoData.media_id);
    }
  }, [prevVideoData.media_id]); // Only depend on media_id, not the entire prevVideoData

  // Reset frame index when versionPreviewData changes (task switching)
  useEffect(() => {
    if (
      versionPreviewData &&
      versionPreviewData.previews &&
      versionPreviewData.previews.length > 0
    ) {
      // Reset frame index when switching to a new task/version
      setCurrentFrameIndex(0);
      // Also reset video to beginning
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.load(); // Force reload of video element
      }
      // Reset video playback state
      pauseTheVideo();
      // Force re-extract frames for new video
      if (prevVideoData.duration) {
        const staticFrames = Array.from(
          { length: prevVideoData.duration },
          (_, index) => index + 1
        );
        setFrames(staticFrames);
      }
    }
  }, [versionPreviewData]);

  // Reset everything when video URL changes (new version created)
  useEffect(() => {
    if (prevVideoData.url) {
      // Reset frame index
      setCurrentFrameIndex(0);
      // Reset video element
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.load();
      }
      // Reset video playback state
      pauseTheVideo();
      // Reset frames
      if (prevVideoData.duration) {
        const staticFrames = Array.from(
          { length: prevVideoData.duration },
          (_, index) => index + 1
        );
        setFrames(staticFrames);
      }
    }
  }, [prevVideoData.url]);

  // send annotations
  useEffect(() => {
    if (!prevVideoData.media_id) return;

    const allEmpty = annotations?.every((frame) => frame.shapes.length === 0);

    const handler = setTimeout(() => {
      // if (!allEmpty) {
      sendAllAnnotations({
        annotations,
        file: prevVideoData.media_id,
      });
      // }
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
    ? "!fixed top-0 left-0 w-full h-full z-[999999] flex flex-col gap-0 justify-between bg-blue-500 overflow-hidden"
    : "w-full flex-1 flex flex-col gap-0 justify-between bg-blue-500 relative ";

  if (
    versionPreviewData &&
    versionPreviewData.version &&
    versionPreviewData.previews &&
    versionPreviewData.previews.length > 0
  ) {
    return (
      <div className={containerClass}>
        <div
          className="w-full flex-1 relative overflow-hidden bg-black"
          style={{ height: `${height}px` }}
        >
          <TheVideo
            key={`video-${prevVideoData?.media_id || prevVideoData?.url}-${
              versionPreviewData?.version || "default"
            }-${prevVideoData?.duration || 0}`}
            ref={videoRef}
            previewWidth={previewWidth}
            isMuted={isMuted}
            isLoope={isLoope}
            videoUrl={prevVideoData?.url}
            type={prevVideoData?.type}
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
              normalizeText={normalizeText}
              denormalizeText={denormalizeText}
              normalizedToVideoText={normalizedToVideoText}
              handleTransformEnd={handleTransformEnd}
            />
          )}
        </div>

        {/* {previewWidth >= 550 && ( */}
        <div className="w-full h-[40px] flex flex-col bg-[var(--overview-color-one)]">
          <>
            <SmoothFrameSlider
              key={`smooth-frames-${prevVideoData?.media_id || "default"}-${
                frames.length
              }-${currentFrameIndex}`}
              frames={frames}
              currentFrameIndex={currentFrameIndex}
              onSelectFrame={handleSelectFrame}
              annotations={annotations}
              type={prevVideoData?.type}
              containerRef={videoRef}
            />
          </>

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
            type={prevVideoData?.type}
            setPrevVideoData={setPrevVideoData}
            prevVideoData={prevVideoData}
            allPreviews={versionPreviewData.previews}
            setIndex={setIndex}
            index={index}
            isCompare={isCompare}
            setIsCompare={setIsCompare}
            entityValidTaskTypes={entityValidTaskTypes}
          />
        </div>
        {/* )} */}
      </div>
    );
  } else {
    return (
      <>
        {
          <div className="w-full h-full flex items-center justify-center bg-[var(--overview-color-three)]/50 radius">
            There is no preview data
          </div>
        }
      </>
    );
  }
};

export default TheAnnotationWrapper;
