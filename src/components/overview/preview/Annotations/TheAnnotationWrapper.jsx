import React, { useEffect, useRef, useState } from "react";
import TheVideo from "./TheVideo";
import { useVideoControl } from "./useVideoControl";
import TheFrames from "./TheFrames";
import VideoProgress from "./VideoProgress";
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
  const [comparePreviewDatas, setComparePreviewDatas] = useState([]);
  const compareVideoRef = useRef(null);
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
      // setCurrentFrameIndex(0);
      // Reset video element
      if (prevVideoData.type === "Video") {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.load(); // Force reload of video element
        }
      }
      if (prevVideoData.type === "Video") {
        // Reset frames for new video
        if (prevVideoData.duration) {
          const staticFrames = Array.from(
            { length: prevVideoData.duration },
            (_, index) => index + 1
          );
          setFrames(staticFrames);
        }
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
      // Reset video playback state
      pauseTheVideo();

      // Only reset video and frames if we have valid video data
      if (prevVideoData.type === "Video" && prevVideoData.duration) {
        // Reset video to beginning
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.load(); // Force reload of video element
        }

        // Generate frames for new video with proper duration
        const staticFrames = Array.from(
          { length: Math.max(1, Math.floor(prevVideoData.duration)) },
          (_, index) => index + 1
        );
        setFrames(staticFrames);
      }
    }
  }, [versionPreviewData]);

  // Reset everything when video URL changes (new version created)
  useEffect(() => {
    if (prevVideoData.url && prevVideoData.type === "Video") {
      // Reset frame index
      setCurrentFrameIndex(0);
      // Reset video playback state
      pauseTheVideo();

      // Reset video element
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.load();
      }

      // Reset frames with proper duration handling
      if (prevVideoData.duration && prevVideoData.duration > 0) {
        const staticFrames = Array.from(
          { length: Math.max(1, Math.floor(prevVideoData.duration)) },
          (_, index) => index + 1
        );
        setFrames(staticFrames);
      } else {
        // If no duration, set empty frames array
        setFrames([]);
      }
    }
  }, [prevVideoData.url, prevVideoData.type, prevVideoData.duration]);

  // Sync toolbar state (play/pause, mute, loop) to compare video when applicable
  useEffect(() => {
    const el = compareVideoRef.current;
    if (!isCompare || !el || comparePreviewDatas.length === 0) return;
    if (comparePreviewDatas[0]?.type !== "Video") return;

    el.muted = isMuted;
    el.loop = isLoope;
    if (isPlaying) el.play?.();
    else el.pause?.();
  }, [isCompare, comparePreviewDatas, isPlaying, isMuted, isLoope]);

  // Prefer frames from the main video; if not a video, but compare is, derive frames from compare
  const framesForUi = (() => {
    const mainIsVideo = prevVideoData?.type === "Video";
    const compareIsVideo =
      isCompare && comparePreviewDatas?.[0]?.type === "Video";
    if (mainIsVideo) return frames;
    if (compareIsVideo) {
      const dur = Math.max(
        1,
        Math.floor(comparePreviewDatas?.[0]?.duration || 1)
      );
      return Array.from({ length: dur }, (_, i) => i + 1);
    }
    return frames;
  })();

  // Reset frames when coming back from compare video to image (and main is not a video)
  const prevCompareWasVideoRef = useRef(false);
  useEffect(() => {
    const mainIsVideo = prevVideoData?.type === "Video";
    const compareIsVideo =
      isCompare && comparePreviewDatas?.[0]?.type === "Video";

    if (prevCompareWasVideoRef.current && (!compareIsVideo || !isCompare)) {
      if (!mainIsVideo) {
        setCurrentFrameIndex(0);
        setFrames([1]);
        if (
          compareVideoRef.current &&
          compareVideoRef.current.tagName === "VIDEO"
        ) {
          try {
            compareVideoRef.current.pause();
            compareVideoRef.current.currentTime = 0;
          } catch (e) {}
        }
      }
    }

    prevCompareWasVideoRef.current = Boolean(compareIsVideo);
  }, [isCompare, comparePreviewDatas, prevVideoData?.type]);

  // When only compare side is a video, update the slider from compare video time
  useEffect(() => {
    const mainIsVideo = prevVideoData?.type === "Video";
    if (mainIsVideo) return;
    if (!isCompare) return;
    const el = compareVideoRef.current;
    if (!el || el.tagName !== "VIDEO") return;
    if (!framesForUi?.length) return;

    const updateFromCompare = () => {
      const totalFrames = framesForUi.length;
      const timePerFrame = (el.duration || 0) / totalFrames || 1;
      let newIndex = Math.round((el.currentTime || 0) / timePerFrame);
      newIndex = Math.max(0, Math.min(totalFrames - 1, newIndex));
      setCurrentFrameIndex((prev) => (prev === newIndex ? prev : newIndex));
    };

    el.addEventListener("timeupdate", updateFromCompare);
    return () => el.removeEventListener("timeupdate", updateFromCompare);
  }, [isCompare, prevVideoData?.type, comparePreviewDatas, framesForUi]);

  // Frame selection should seek both videos if they are videos
  const handleSelectFrameBoth = (idx) => {
    const total = framesForUi.length || 1;
    const clamped = Math.max(0, Math.min(idx, total - 1));

    if (prevVideoData?.type === "Video") {
      handleSelectFrame(clamped);
    } else {
      setCurrentFrameIndex(clamped);
    }

    const mainEl = videoRef.current;
    if (
      prevVideoData?.type === "Video" &&
      mainEl &&
      mainEl.tagName === "VIDEO"
    ) {
      const timePerFrame = (mainEl.duration || 0) / total || 1;
      mainEl.currentTime = clamped * timePerFrame;
    }

    const cmp = compareVideoRef.current;
    if (
      isCompare &&
      comparePreviewDatas?.[0]?.type === "Video" &&
      cmp &&
      cmp.tagName === "VIDEO"
    ) {
      const timePerFrame = (cmp.duration || 0) / total || 1;
      cmp.currentTime = clamped * timePerFrame;
    }
  };

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

  useEffect(() => {
    console.log(comparePreviewDatas);
  }, [comparePreviewDatas]);

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
          className={`w-full flex-1 relative overflow-hidden bg-black ${
            isCompare ? "flex" : "block"
          }`}
          style={{ height: `${height}px` }}
        >
          {/* Left: primary video/annotation panel */}
          <div
            className={`${
              isCompare ? "w-1/2" : "w-full"
            } relative overflow-hidden bg-black`}
            style={{ height: `${isFullScreen ? "100%" : height + "px"}` }}
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
          {isCompare && (
            <div
              className={`${
                isCompare ? "w-1/2" : "w-full"
              } relative overflow-hidden bg-[var(--overview-color-two)]`}
              style={{ height: `${isFullScreen ? "100%" : height + "px"}` }}
            >
              {comparePreviewDatas.length > 0 ? (
                <TheVideo
                  key={`video-${
                    comparePreviewDatas[0]?.media_id ||
                    comparePreviewDatas[0]?.url
                  }-${comparePreviewDatas[0]?.version || "default"}-${
                    comparePreviewDatas[0]?.duration || 0
                  }`}
                  ref={compareVideoRef}
                  previewWidth={previewWidth}
                  isMuted={isMuted}
                  isLoope={isLoope}
                  videoUrl={
                    comparePreviewDatas[0]?.hd_download_url ||
                    comparePreviewDatas[0]?.ld_download_url
                  }
                  type={comparePreviewDatas[0]?.type}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[var(--overview-color-three)]/50 radius">
                  There is no preview data
                </div>
              )}
              {/* {getAnnotationLoading ? (
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
              )} */}
            </div>
          )}
        </div>

        {/* {previewWidth >= 550 && ( */}
        <div className="w-full flex flex-col bg-[var(--overview-color-one)]">
          <VideoProgress
            durationSeconds={
              (prevVideoData?.type === "Video" && videoRef.current?.duration) ||
              (isCompare &&
                comparePreviewDatas?.[0]?.type === "Video" &&
                compareVideoRef.current?.duration) ||
              0
            }
            totalFrames={framesForUi.length || 1}
            currentFrameIndex={currentFrameIndex}
            onSeek={handleSelectFrameBoth}
            annotations={annotations}
            enabled={
              prevVideoData?.type === "Video" ||
              (isCompare && comparePreviewDatas?.[0]?.type === "Video")
            }
          />
          {/**
           * Legacy frame slider kept for reference:
           * <TheFrames
           *   key={`frames-${prevVideoData?.media_id || "default"}-${framesForUi.length}-${currentFrameIndex}`}
           *   frames={framesForUi}
           *   currentFrameIndex={currentFrameIndex}
           *   onSelectFrame={handleSelectFrameBoth}
           *   annotations={annotations}
           *   frameBoxRef={frameBoxRef}
           *   handleMouseDownDrag={handleMouseDownDrag}
           *   handleMouseMoveDrag={handleMouseMoveDrag}
           *   handleMouseUpDrag={handleMouseUpDrag}
           *   type={prevVideoData?.type}
           * />
           */}

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
            setComparePreviewDatas={setComparePreviewDatas}
            compareIsVideo={comparePreviewDatas?.[0]?.type === "Video"}
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
