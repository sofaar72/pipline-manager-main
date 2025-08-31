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
  const [selecting, setSelecting] = useState(false);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [annotations, setAnnotations] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectionRect, setSelectionRect] = useState(null); // ✅ NEW

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
      // const newShape = {
      //   type: "line",
      //   points: [point.x / stageSize.width, point.y / stageSize.height], // normalized
      // };
      const newShape = {
        id: Date.now(), // unique identifier
        type: "line", // or "rect", "circle"
        points: [point.x / stageSize.width, point.y / stageSize.height], // normalized
        selected: false,
        x: point.x / stageSize.width, // for rect/circle
        y: point.y / stageSize.height,
        width: 0, // only for rect
        height: 0, // only for rect
        radius: 5, // only for circle
      };

      addShapeToFrame(currentFrameIndex, newShape);
    }
    if (selecting && point) {
      setIsDrawing(true);
      setSelectionRect({
        x: point.x,
        y: point.y,
        width: 0,
        height: 0,
      });
    }
  };

  const handleMouseMove = (e) => {
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    if (!point) return;

    if (drawing && isDrawing) {
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
                    return {
                      ...shape,
                      width:
                        (point.x - shape.x * stageSize.width) / stageSize.width,
                      height:
                        (point.y - shape.y * stageSize.height) /
                        stageSize.height,
                    };
                  }
                  return shape;
                }),
              }
            : frame
        )
      );
    }

    if (selecting && isDrawing && selectionRect) {
      setSelectionRect((prev) => ({
        ...prev,
        width: point.x - prev.x,
        height: point.y - prev.y,
      }));
    }
  };

  const isShapeInside = (shape, rect) => {
    if (shape.type === "rect") {
      const shapeX = shape.x * stageSize.width;
      const shapeY = shape.y * stageSize.height;
      const shapeW = (shape.width || 0) * stageSize.width;
      const shapeH = (shape.height || 0) * stageSize.height;

      return !(
        shapeX + shapeW < rect.x ||
        shapeX > rect.x + rect.width ||
        shapeY + shapeH < rect.y ||
        shapeY > rect.y + rect.height
      );
    }

    if (shape.type === "circle") {
      const cx = shape.x * stageSize.width;
      const cy = shape.y * stageSize.height;
      const r = shape.radius || 0;

      return !(
        cx + r < rect.x ||
        cx - r > rect.x + rect.width ||
        cy + r < rect.y ||
        cy - r > rect.y + rect.height
      );
    }

    if (shape.type === "line") {
      const points = shape.points.map((p, i) =>
        i % 2 === 0 ? p * stageSize.width : p * stageSize.height
      );

      const xs = points.filter((_, i) => i % 2 === 0);
      const ys = points.filter((_, i) => i % 2 !== 0);

      const minX = Math.min(...xs);
      const maxX = Math.max(...xs);
      const minY = Math.min(...ys);
      const maxY = Math.max(...ys);

      // Intersects if any part of bounding box overlaps selection rect
      return !(
        maxX < rect.x ||
        minX > rect.x + rect.width ||
        maxY < rect.y ||
        minY > rect.y + rect.height
      );
    }

    return false;
  };

  const handleMouseUp = () => {
    if (drawing) {
      setIsDrawing(false);
    }

    if (selecting && selectionRect) {
      const rect = {
        x: Math.min(selectionRect.x, selectionRect.x + selectionRect.width),
        y: Math.min(selectionRect.y, selectionRect.y + selectionRect.height),
        width: Math.abs(selectionRect.width),
        height: Math.abs(selectionRect.height),
      };

      setAnnotations((prev) =>
        prev.map((frame, i) =>
          i === currentFrameIndex
            ? {
                ...frame,
                shapes: frame.shapes.map((shape) => ({
                  ...shape,
                  selected: isShapeInside(shape, rect),
                })),
              }
            : frame
        )
      );

      setSelectionRect(null);
      setIsDrawing(false);
    }
  };

  const toggleDrawing = () => {
    setDrawing(!drawing);
    setSelecting(false);
  };

  // ---------------- SELECTING ----------------
  const toggleSelecting = () => {
    setSelecting(!selecting);
    setDrawing(false);
  };

  // inside useStageControl
  const deleteSelectedShapes = () => {
    setAnnotations((prev) =>
      prev.map((frame, i) =>
        i === currentFrameIndex
          ? {
              ...frame,
              shapes: frame.shapes.filter((s) => !s.selected),
            }
          : frame
      )
    );
  };

  const updateShape = (id, updates) => {
    setAnnotations((prev) =>
      prev.map((frame, i) =>
        i === currentFrameIndex
          ? {
              ...frame,
              shapes: frame.shapes.map((s) =>
                s.id === id ? { ...s, ...updates } : s
              ),
            }
          : frame
      )
    );
  };

  return {
    stageSize,
    drawing,
    setDrawing,
    toggleDrawing,
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
    selecting,
    deleteSelectedShapes,
    updateShape,
  };
};
