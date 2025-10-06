import { useRef, useState, useEffect } from "react";

export const useVideoControl = () => {
  const videoRef = useRef(null);
  const [height, setHeight] = useState(280);
  const [frames, setFrames] = useState([]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoope, setIsLoope] = useState(false);
  const [prevVideoData, setPrevVideoData] = useState({
    duration: 10,
    url: "",
    media_id: "",
    type: "Video",
  });

  // Reset video state when switching tasks or changing media
  useEffect(() => {
    if (prevVideoData.media_id) {
      // Reset video playback state
      setIsPlaying(false);
      // Extract frames for new video
      extractFrames();
    }
  }, [prevVideoData.media_id]);

  // Reset video state when URL changes (new version created)
  useEffect(() => {
    if (prevVideoData.url) {
      // Reset video playback state
      setIsPlaying(false);
      // Extract frames for new video
      extractFrames();
    }
  }, [prevVideoData.url]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (prevVideoData.type === "Video") {
      if (isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }
  }, [isPlaying, prevVideoData]);

  // extract the video frames
  const extractFrames = () => {
    // Only extract frames for video type and when duration is available
    if (
      prevVideoData.type === "Video" &&
      prevVideoData.duration &&
      prevVideoData.duration > 0
    ) {
      const frameCount = Math.max(1, Math.floor(prevVideoData.duration));
      const staticFrames = Array.from(
        { length: frameCount },
        (_, index) => index + 1
      );
      setFrames(staticFrames);
    } else {
      // Clear frames for non-video or invalid duration
      setFrames([]);
    }
  };

  const changeHeight = (w = null) => {
    setHeight(w ? w : 200);
  };
  //   useEffect(()=>{
  // setStageSize({})
  //   },[height])

  //   const [isFullscreen, setIsFullscreen] = useState(false);
  //   const [progress, setProgress] = useState(0);
  //   const [duration, setDuration] = useState(0);
  //   const [selectedFrameIndex, setSelectedFrameIndex] = useState(null);
  //   const [videoFps, setVideoFps] = useState(25); // default fallback
  //   const [previewFrame, setPreviewFrame] = useState(null);
  //   const [strokeColor, setStrokeColor] = useState("red");
  //   const [aspectRatio, setAspectRatio] = useState(null);

  //   const handleDragFrame = (index) => {
  //     setSelectedFrameIndex(index);
  //     seekToFrame(index);
  //     setPreviewFrame(frames[index]?.src);
  //   };

  const pauseOrPlay = () => setIsPlaying(!isPlaying);
  const pauseTheVideo = () => {
    setIsPlaying(false);
  };
  const muteOrNot = () => setIsMuted(!isMuted);
  const loopOrNot = () => setIsLoope(!isLoope);

  return {
    videoRef,
    height,
    changeHeight,
    frames,
    setFrames,
    extractFrames,
    isPlaying,
    setIsPlaying,
    pauseOrPlay,
    pauseTheVideo,
    muteOrNot,
    isMuted,
    loopOrNot,
    isLoope,
    prevVideoData,
    setPrevVideoData,
    // isFullscreen,
    // setIsFullscreen,
    // setIsMuted,
    // setIsLoope,
    // progress,
    // setProgress,
    // duration,
    // setDuration,
    // selectedFrameIndex,
    // setSelectedFrameIndex,
    // extractFrames,
    // seekToFrame,
    // handleDragFrame,
    // previewFrame,
    // pauseTheVideo,
    // toggleFullscreen,
    // setStrokeColor,
    // strokeColor,
    // aspectRatio,
    // setAspectRatio,
  };
};
