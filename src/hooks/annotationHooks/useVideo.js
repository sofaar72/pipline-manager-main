import { useRef, useState, useEffect } from "react";
import { extractFramesFromFile } from "./useFrames";

export const useVideo = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoope, setIsLoope] = useState(false);
  const [frames, setFrames] = useState([]);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [selectedFrameIndex, setSelectedFrameIndex] = useState(null);
  const [videoFps, setVideoFps] = useState(25); // default fallback
  const [previewFrame, setPreviewFrame] = useState(null);

  const handleDragFrame = (index) => {
    setSelectedFrameIndex(index);
    seekToFrame(index);
    setPreviewFrame(frames[index]?.src);
  };

  const pauseOrPlay = () => setIsPlaying(!isPlaying);
  const pauseTheVideo = () => {
    setIsPlaying(false);
  };
  const muteOrNot = () => setIsMuted(!isMuted);
  const loopOrNot = () => setIsLoope(!isLoope);

  // const extractFrames = async () => {
  //   if (!videoRef.current) return;
  //   const videoEl = videoRef.current;
  //   const src = videoEl.src;

  //   const response = await fetch(src);
  //   const blob = await response.blob();

  //   const tempVideo = document.createElement("video");
  //   tempVideo.src = URL.createObjectURL(blob);
  //   tempVideo.muted = true;

  //   await new Promise((resolve, reject) => {
  //     tempVideo.addEventListener("loadedmetadata", resolve);
  //     tempVideo.addEventListener("error", reject);
  //   });

  //   const fps =
  //     tempVideo.videoTracks?.[0]?.frameRate ||
  //     tempVideo.webkitVideoDecodedByteCount ||
  //     25;

  //   setVideoFps(fps);

  //   const extracted = await extractFramesFromFile(blob, fps);
  //   setFrames(extracted);

  //   URL.revokeObjectURL(tempVideo.src);
  // };

  const extractFrames = () => {
    const staticFrames = Array.from({ length: 62 }, (_, index) => index + 1);
    setFrames(staticFrames);
  };

  const seekToFrame = (index) => {
    if (!videoRef.current || !frames.length) return;
    const time = index / videoFps;
    videoRef.current.currentTime = time;
    setSelectedFrameIndex(index);
  };

  const toggleFullscreen = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (!isFullscreen) {
      // Enter fullscreen
      if (videoEl.requestFullscreen) {
        videoEl.requestFullscreen();
      } else if (videoEl.webkitRequestFullscreen) {
        videoEl.webkitRequestFullscreen();
      } else if (videoEl.mozRequestFullScreen) {
        videoEl.mozRequestFullScreen();
      } else if (videoEl.msRequestFullscreen) {
        videoEl.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  // -------------------
  // Sync selectedFrameIndex while video plays
  // -------------------
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !frames.length) return;

    let animationFrameId;

    const updateFrame = () => {
      const currentIndex = Math.floor(video.currentTime * videoFps);
      if (currentIndex !== selectedFrameIndex && currentIndex < frames.length) {
        setSelectedFrameIndex(currentIndex);
        setPreviewFrame(frames[currentIndex]?.src);
      }

      // Continue loop only while playing
      if (!video.paused && !video.ended) {
        animationFrameId = requestAnimationFrame(updateFrame);
      }
    };

    if (isPlaying) {
      animationFrameId = requestAnimationFrame(updateFrame);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, frames, selectedFrameIndex, videoFps]);

  // -------------------
  // Play/pause the video when isPlaying changes
  // -------------------
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play();
    } else {
      video.pause();
    }
  }, [isPlaying]);

  return {
    videoRef,
    isPlaying,
    setIsPlaying,
    pauseOrPlay,
    muteOrNot,
    loopOrNot,
    isFullscreen,
    setIsFullscreen,
    isMuted,
    setIsMuted,
    isLoope,
    setIsLoope,
    frames,
    setFrames,
    progress,
    setProgress,
    duration,
    setDuration,
    selectedFrameIndex,
    setSelectedFrameIndex,
    extractFrames,
    seekToFrame,
    handleDragFrame,
    previewFrame,
    pauseTheVideo,
    toggleFullscreen,
  };
};
