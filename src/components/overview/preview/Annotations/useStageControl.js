import { useRef, useState, useEffect } from "react";

export const useStageControl = ({
  containerRef = null,
  frames = [],
  isplaying = null,
  // isloope = null,
}) => {
  const frameBoxRef = useRef(null);

  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const [drawing, setDrawing] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [eraising, setEraising] = useState(false);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [annotations, setAnnotations] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  // ---------------- VIDEO CONTROLS ----------------
  useEffect(() => {
    if (isplaying) {
      setDrawing(false);
    }
  }, [isplaying]);

  // ---------------- ANNOTATIONS ----------------
  useEffect(() => {
    if (drawing && frames.length > 0) {
      setAnnotations((prev) => {
        if (prev.length === frames.length) return prev;
        return frames.map((_, i) => ({
          frameId: i,
          shapes: [],
        }));
      });
    }
  }, [drawing, frames]);

  // ---------------- STAGE SIZE ----------------
  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setStageSize({ width, height });
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [containerRef]);

  // ---------------- HANDLE SELECT FRAME ----------------
  const handleSelectFrame = (frameIndex) => {
    const totalFrames = frames.length;
    if (totalFrames === 0 || !containerRef.current) return;

    const clampedIndex = Math.max(0, Math.min(frameIndex, totalFrames - 1));
    setCurrentFrameIndex(clampedIndex);

    const timePerFrame = containerRef.current.duration / totalFrames;
    containerRef.current.currentTime = clampedIndex * timePerFrame;
  };

  // ---------------- ARROW KEYS ----------------
  useEffect(() => {
    if (!frames.length) return;

    const handleArrowKeys = (e) => {
      if (e.key === "ArrowRight") {
        handleSelectFrame(currentFrameIndex + 1);
      } else if (e.key === "ArrowLeft") {
        handleSelectFrame(currentFrameIndex - 1);
      }
    };

    window.addEventListener("keydown", handleArrowKeys);
    return () => window.removeEventListener("keydown", handleArrowKeys);
  }, [frames, currentFrameIndex]);

  // ---------------- VIDEO PLAYBACK ----------------
  useEffect(() => {
    if (!containerRef.current || !frames.length) return;

    const video = containerRef.current;
    const updateSliderFromVideo = () => {
      const totalFrames = frames.length;
      const timePerFrame = video.duration / totalFrames;
      const newFrameIndex = Math.floor(video.currentTime / timePerFrame);
      if (newFrameIndex !== currentFrameIndex) {
        setCurrentFrameIndex(newFrameIndex);
      }
    };

    video.addEventListener("timeupdate", updateSliderFromVideo);
    return () => video.removeEventListener("timeupdate", updateSliderFromVideo);
  }, [frames, containerRef, currentFrameIndex]);

  // ---------------- FRAME SLIDER DRAG ----------------
  const getFrameFromX = (x) => {
    if (!frameBoxRef.current) return 0;
    const width = frameBoxRef.current.offsetWidth;
    const frameWidth = width / frames.length;
    let index = Math.floor(x / frameWidth);
    if (index < 0) index = 0;
    if (index >= frames.length) index = frames.length - 1;
    return index;
  };

  const handleMouseDownDrag = (e) => {
    setIsDragging(true);
    const rect = frameBoxRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    handleSelectFrame(getFrameFromX(x));
  };
  const handleMouseMoveDrag = (e) => {
    if (!isDragging) return;
    const rect = frameBoxRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    handleSelectFrame(getFrameFromX(x));
  };
  const handleMouseUpDrag = () => setIsDragging(false);

  // ---------------- ANNOTATION ----------------
  const addShapeToFrame = (frameIndex, shape) => {
    setAnnotations((prev) =>
      prev.map((f, i) =>
        i === frameIndex ? { ...f, shapes: [...f.shapes, shape] } : f
      )
    );
  };

  const handleMouseDown = (e) => {
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    if (drawing && point) {
      setIsDrawing(true);
      // const newShape = {
      //   type: "rect",
      //   x: point.x / stageSize.width,
      //   y: point.y / stageSize.height,
      //   width: 0,
      //   height: 0,
      // };
      const newShape = {
        type: "line",
        points: [point.x / stageSize.width, point.y / stageSize.height], // normalized
      };

      addShapeToFrame(currentFrameIndex, newShape);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    setAnnotations((prev) =>
      prev.map((frame, i) =>
        i === currentFrameIndex
          ? {
              ...frame,
              shapes: frame.shapes.map((shape, j, arr) => {
                if (j === arr.length - 1 && shape.type === "line") {
                  return {
                    ...shape,
                    points: [
                      ...shape.points,
                      point.x / stageSize.width,
                      point.y / stageSize.height,
                    ],
                  };
                } else if (j === arr.length - 1 && shape.type === "rect") {
                  // update rect width/height if needed
                  return {
                    ...shape,
                    width:
                      (point.x - shape.x * stageSize.width) / stageSize.width,
                    height:
                      (point.y - shape.y * stageSize.height) / stageSize.height,
                  };
                }
                return shape;
              }),
            }
          : frame
      )
    );
  };

  const handleMouseUp = () => setIsDrawing(false);

  const toggleDrawing = () => {
    setDrawing(!drawing);
    setEraising(false);
  };
  const toggleEraising = () => {
    setEraising(!eraising);
    setDrawing(false);
  };

  return {
    stageSize,
    drawing,
    setDrawing,
    toggleDrawing,
    eraising,
    toggleEraising,
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
  };
};
