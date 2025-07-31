import React, { useRef, useEffect, forwardRef, useState } from "react";
import panzoom from "@panzoom/panzoom";
import { KonvaOverlay } from "./KonvaOverlay";
import { MdBackHand } from "react-icons/md";
import { FaPause, FaPlay } from "react-icons/fa";
import { FiZoomIn, FiZoomOut } from "react-icons/fi";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import VideoTools from "./VideoTools";
import Loading from "../golbals/Loading";
import AnnotationCanvas from "./AnnotationCanvas";

export const VideoAnnotator = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [thumbnails, setThumbnails] = useState([]);
  const [isPaused, setIsPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [annotations, setAnnotations] = useState({}); // { time: [shapes] }
  const [anotateable, setAnotateable] = useState(false);
  const [selectedTool, setSelectedTool] = useState("rectangle");
  const [selectedColor, setSelectedColor] = useState("red");
  // extract video frames
  // useEffect(() => {
  //   const extractFrames = async () => {
  //     const video = videoRef.current;
  //     const canvas = canvasRef.current;
  //     if (!video || !canvas) return;

  //     const context = canvas.getContext("2d");
  //     const duration = video.duration;
  //     const frameInterval = 1; // seconds between each frame
  //     const newThumbnails = [];

  //     const captureFrameAt = (time) => {
  //       return new Promise((resolve) => {
  //         video.currentTime = time;
  //         const onSeeked = () => {
  //           context.drawImage(video, 0, 0, canvas.width, canvas.height);
  //           const dataURL = canvas.toDataURL("image/png");
  //           newThumbnails.push({ time, image: dataURL });
  //           video.removeEventListener("seeked", onSeeked);
  //           resolve();
  //         };
  //         video.addEventListener("seeked", onSeeked);
  //       });
  //     };

  //     // Pause video before extracting
  //     video.pause();

  //     for (let t = 0; t < duration; t += frameInterval) {
  //       await captureFrameAt(t);
  //     }

  //     setThumbnails(newThumbnails);
  //   };

  //   const video = videoRef.current;
  //   if (video) {
  //     video.addEventListener("loadedmetadata", extractFrames);
  //     return () => {
  //       video.removeEventListener("loadedmetadata", extractFrames);
  //     };
  //   }
  // }, []);

  const deleteAnnotations = (selectedTime) => {
    const updated = { ...annotations };
    delete updated[selectedTime];
    setAnnotations(updated);
  };

  useEffect(() => {
    const extractFrames = async () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) return;

      const context = canvas.getContext("2d");
      const fps = 25;
      const frameInterval = 1 / fps;
      const newThumbnails = [];

      const captureFrameAt = (time) => {
        return new Promise((resolve) => {
          const onSeeked = () => {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataURL = canvas.toDataURL("image/png");
            newThumbnails.push({ time, image: dataURL });
            video.removeEventListener("seeked", onSeeked);
            resolve();
          };

          video.addEventListener("seeked", onSeeked);
          video.currentTime = time;
        });
      };

      video.pause();

      const waitForMetadata = () =>
        new Promise((resolve) => {
          if (video.readyState >= 1) {
            resolve();
          } else {
            video.addEventListener("loadedmetadata", resolve, { once: true });
          }
        });

      await waitForMetadata();

      const duration = video.duration;
      const totalFrames = Math.floor(duration * fps);

      for (let i = 0; i <= totalFrames; i++) {
        const time = i * frameInterval;
        await captureFrameAt(time);
      }

      setThumbnails(newThumbnails);
    };

    const video = videoRef.current;
    if (video) {
      video.addEventListener("loadedmetadata", extractFrames);
      return () => {
        video.removeEventListener("loadedmetadata", extractFrames);
      };
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const video = videoRef.current;
      if (video && !video.paused) {
        const current = video.currentTime;

        // Find the closest thumbnail time
        const closestThumb = thumbnails.reduce((prev, curr) =>
          Math.abs(curr.time - current) < Math.abs(prev.time - current)
            ? curr
            : prev
        );

        if (closestThumb && closestThumb.time !== currentTime) {
          setCurrentTime(closestThumb.time);
        }
      }
    }, 200); // Poll every 200ms

    return () => clearInterval(interval);
  }, [thumbnails, currentTime]);

  useEffect(() => {
    const video = videoRef.current;
    const fps = 25;
    const frameStep = 1 / fps; // equals 0.04 for 25 FPS
    // const frameStep = 1; // 25 FPS

    const handleKeyDown = (e) => {
      if (!video) return;

      if (e.key === "ArrowRight") {
        video.pause();
        video.currentTime = Math.min(
          video.duration,
          video.currentTime + frameStep
        );
        setCurrentTime(video.currentTime);
      }

      if (e.key === "ArrowLeft") {
        video.pause();
        video.currentTime = Math.max(0, video.currentTime - frameStep);
        setCurrentTime(video.currentTime);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const goToPrevThumbnail = () => {
    if (!videoRef.current || thumbnails.length === 0) return;

    const times = thumbnails.map((t) => t.time);
    const current = videoRef.current.currentTime;

    const prev = [...times].reverse().find((t) => t < current);
    if (prev !== undefined) {
      videoRef.current.pause();
      videoRef.current.currentTime = prev;
      setCurrentTime(prev);
    }
  };

  const goToNextThumbnail = () => {
    if (!videoRef.current || thumbnails.length === 0) return;

    const times = thumbnails.map((t) => t.time);
    const current = videoRef.current.currentTime;

    const next = times.find((t) => t > current);
    if (next !== undefined) {
      videoRef.current.pause();
      videoRef.current.currentTime = next;
      setCurrentTime(next);
    }
  };
  // Update current frame time
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const video = videoRef.current;
  //     if (video && !video.paused) {
  //       setCurrentTime(video.currentTime);
  //     }
  //   }, 200); // check every 200ms

  //   return () => clearInterval(interval);
  // }, []);

  // Pause handler to trigger annotation
  const handlePause = () => {
    setIsPaused(true);
  };

  const handlePlay = () => {
    setIsPaused(false);
  };

  const pauseOrPlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      handlePlay();
    } else {
      video.pause();
      handlePause();
    }
  };

  const activateAnotate = (e) => {
    setAnotateable(true);
  };

  return (
    <>
      {/* preview video */}
      <div className="w-full h-full flex-1 bg-gray-500/50 radius overflow-hidden relative">
        {/* play/pause icon overlay */}

        {currentTime !== null && (
          <AnnotationCanvas
            videoRef={videoRef}
            selectedTime={currentTime}
            isPlaying={!isPaused}
            annotations={annotations}
            setAnnotations={setAnnotations}
            anotateable={anotateable}
            selectedTool={selectedTool}
            setSelectedTool={setSelectedTool}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            deleteAnnotations={deleteAnnotations}
          />
        )}

        {!anotateable && (
          <div
            className="absolute z-[50] top-0 left-0 w-full h-full flex items-center justify-center cursor-pointer z-10"
            onClick={pauseOrPlay}
          >
            {isPaused ? (
              <div className="w-[100px] h-[100px] flex items-center justify-center bg-white/20 rounded-full">
                <FaPlay className="text-white text-3xl opacity-100 hover:scale-110 transition" />
              </div>
            ) : (
              <div className="w-[100px] h-[100px] flex items-center justify-center bg-white/20 rounded-full">
                <FaPause className="text-white text-3xl opacity-100 hover:scale-110 transition" />
              </div>
            )}
          </div>
        )}

        <video
          ref={videoRef}
          src="/videos/sample2.mp4"
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          onPause={handlePause}
          onPlay={handlePlay}
          // controls
        />
        {/* hidden canvas  */}
        <canvas
          ref={canvasRef}
          width={320}
          height={180}
          style={{ display: "none" }}
        />

        {/* rendering frame thumbnails  */}
        <div className="bottom-0 absolute z-[90] w-full h-[80px] flex overflow-x-auto mt-2 gap-2 p-2 bg-[#13121D]">
          {thumbnails.length > 0 ? (
            thumbnails.map((thumb, index) => {
              const isSelected = currentTime === thumb.time;
              // console.log(thumb.time);
              // console.log(currentTime);
              return (
                <img
                  key={index}
                  src={thumb.image}
                  alt={`Frame at ${thumb.time}s`}
                  className={`w-5 h-auto cursor-pointer hover:scale-105 transition object-cover ${
                    isSelected
                      ? "border-4 border-[var(--primary-color-light)] scale-105"
                      : "border-transparent"
                  }`}
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime = thumb.time;
                      videoRef.current.pause();
                      setCurrentTime(thumb.time);
                    }
                  }}
                />
              );
            })
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Loading />
            </div>
          )}
        </div>

        {/* anotatable controll  */}

        <div
          className="absolute z-[90] top-0 left-0 cursor-pointer p-2 bg-black/50 text-white"
          onClick={() => {
            setAnotateable(!anotateable);
            // pauseOrPlay();
          }}
        >
          {anotateable ? "🖌️ Annotation Mode ON" : "🎬 View Mode"}
        </div>

        {/* <KonvaOverlay
          currentTime={currentTime}
          isPaused={isPaused}
          videoRef={videoRef}
        /> */}
        {/* bottom part  */}
        <VideoTools
          goToPrevThumbnail={goToPrevThumbnail}
          goToNextThumbnail={goToNextThumbnail}
        />
      </div>
    </>
  );
};
