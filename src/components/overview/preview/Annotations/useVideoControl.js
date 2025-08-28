import { useRef, useState, useEffect } from "react";

export const useVideoControl = () => {
  const videoRef = useRef(null);
  const [height, setHeight] = useState(280);
  const [frames, setFrames] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoope, setIsLoope] = useState(false);

  useEffect(() => {
    extractFrames();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play();
    } else {
      video.pause();
    }
  }, [isPlaying]);

  // extract the video frames
  const extractFrames = () => {
    const staticFrames = Array.from({ length: 62 }, (_, index) => index + 1);
    setFrames(staticFrames);
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
    extractFrames,
    isPlaying,
    setIsPlaying,
    pauseOrPlay,
    pauseTheVideo,
    muteOrNot,
    isMuted,
    loopOrNot,
    isLoope,
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
