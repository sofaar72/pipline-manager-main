import { useRef, useState, useEffect } from "react";
import { ACTIONS } from "./Actions";
import { v4 as uuidv4 } from "uuid";

export const useStageControl = ({
  containerRef = null,
  frames = [],
  isplaying = null,
  // isloope = null,
}) => {
  const frameBoxRef = useRef(null);

  // new updates
  const stageRef = useRef();
  const [action, setAction] = useState(ACTIONS.SELECT);
  const [fillColor, setFillColor] = useState("#4ECDC4");
  const [rectangles, setRectangles] = useState([]);
  const isPainting = useRef();
  const currentShapeId = useRef();
  const isDraggable = action === ACTIONS.SELECT;
  const transformerRef = useRef();
  // for selecting multiple items
  const [selectionRect, setSelectionRect] = useState(null); // ✅ NEW
  const [selecting, setSelecting] = useState(false);
  const selectionStart = useRef({ x: 0, y: 0 });
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });

  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [annotations, setAnnotations] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (containerRef) {
      console.log(containerRef.current.videoWidth);
      console.log(containerRef.current.videoHeight);
    }
  }, [isFullScreen]);

  // ---------------- VIDEO CONTROLS ----------------

  useEffect(() => {
    // if (isplaying) {
    //   setDrawing(false);
    // }
  }, [isplaying]);

  const toggleFullscreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  // ---------------- ANNOTATIONS ----------------
  useEffect(() => {
    if (frames.length > 0) {
      setAnnotations((prev) => {
        if (prev.length === frames.length) return prev;
        return frames.map((_, i) => ({
          frameId: i,
          shapes: [],
        }));
      });
    }
  }, [frames]);

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
  }, [containerRef, isFullScreen]); // 👈 add isFullScreen

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
  const getShapesForFrame = (frameIndex) => {
    if (!annotations || !Array.isArray(annotations)) return [];
    if (!annotations[frameIndex]) return [];
    return annotations[frameIndex].shapes || [];
  };

  const getShapeBounds = (shape) => {
    switch (shape.type) {
      case "rect":
        return {
          x: shape.x,
          y: shape.y,
          width: shape.width,
          height: shape.height,
        };
      case "circle":
        return {
          x: shape.x - shape.radius,
          y: shape.y - shape.radius,
          width: shape.radius * 2,
          height: shape.radius * 2,
        };
      case "arrow":
      case "line": {
        const xs = shape.points.filter((_, i) => i % 2 === 0);
        const ys = shape.points.filter((_, i) => i % 2 !== 0);

        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);

        return {
          x: (shape.x || 0) + minX,
          y: (shape.y || 0) + minY,
          width: maxX - minX,
          height: maxY - minY,
        };
      }
      default:
        return { x: 0, y: 0, width: 0, height: 0 };
    }
  };

  const updateShapesSelection = (frameIndex, selectedIds) => {
    setAnnotations((prev) =>
      prev.map((frame, i) =>
        i === frameIndex
          ? {
              ...frame,
              shapes: frame.shapes.map((shape) => ({
                ...shape,
                selected: selectedIds.includes(shape.id),
              })),
            }
          : frame
      )
    );
  };

  const normalizeShape = (shape) => {
    switch (shape.type) {
      case "rect":
        return {
          ...shape,
          x: shape.x / stageSize.width,
          y: shape.y / stageSize.height,
          width: shape.width / stageSize.width,
          height: shape.height / stageSize.height,
        };
      case "circle":
        return {
          ...shape,
          x: shape.x / stageSize.width,
          y: shape.y / stageSize.height,
          radius: shape.radius / stageSize.width, // assuming square scaling
        };
      case "line":
      case "arrow":
        return {
          ...shape,
          x: (shape.x || 0) / stageSize.width,
          y: (shape.y || 0) / stageSize.height,
          points: shape.points.map((p, i) =>
            i % 2 === 0 ? p / stageSize.width : p / stageSize.height
          ),
        };
      default:
        return shape;
    }
  };

  const denormalizeShape = (shape) => {
    switch (shape.type) {
      case "rect":
        return {
          ...shape,
          x: shape.x * stageSize.width,
          y: shape.y * stageSize.height,
          width: shape.width * stageSize.width,
          height: shape.height * stageSize.height,
        };
      case "circle":
        return {
          ...shape,
          x: shape.x * stageSize.width,
          y: shape.y * stageSize.height,
          radius: shape.radius * stageSize.width,
        };
      case "line":
      case "arrow":
        return {
          ...shape,
          x: (shape.x || 0) * stageSize.width,
          y: (shape.y || 0) * stageSize.height,
          points: shape.points.map((p, i) =>
            i % 2 === 0 ? p * stageSize.width : p * stageSize.height
          ),
        };
      default:
        return shape;
    }
  };

  const handleMouseDown = (e) => {
    if (action === ACTIONS.SELECT) return;
    const stage = stageRef?.current;
    if (!stage) return;
    const { x, y } = stage.getPointerPosition();

    const id = uuidv4();
    currentShapeId.current = id;
    isPainting.current = true;

    switch (action) {
      case ACTIONS.RECTANGLE:
        const recShape = {
          id,
          x,
          y,
          height: 20,
          width: 20,
          fillColor,
          stroke: "#000",
          type: "rect",
          selected: false,
        };
        // addShapeToFrame(currentFrameIndex, recShape);
        addShapeToFrame(currentFrameIndex, normalizeShape(recShape));

        break;
      case ACTIONS.CIRCLE:
        const circleShape = {
          id,
          x,
          y,
          radius: 20,
          fillColor,
          stroke: "#000",
          type: "circle",
          selected: false,
        };
        // addShapeToFrame(currentFrameIndex, circleShape);
        addShapeToFrame(currentFrameIndex, normalizeShape(circleShape));

        break;
      case ACTIONS.ARROW:
        const arrowShape = {
          id,
          points: [x, y, x + 20, y + 20],
          fillColor,
          stroke: "#000",
          type: "arrow",
          selected: false,
        };
        // addShapeToFrame(currentFrameIndex, arrowShape);
        addShapeToFrame(currentFrameIndex, normalizeShape(arrowShape));

        break;
      case ACTIONS.LINE:
        const lineShape = {
          id,
          points: [x, y],
          fillColor,
          type: "line",
          selected: false,
        };
        // addShapeToFrame(currentFrameIndex, lineShape);
        addShapeToFrame(currentFrameIndex, normalizeShape(lineShape));

        break;
    }
  };

  const handleMouseMove = (e) => {
    if (action === ACTIONS.SELECT || !isPainting.current) return;
    const stage = stageRef?.current;
    if (!stage) return;
    const { x, y } = stage.getPointerPosition();

    switch (action) {
      case ACTIONS.RECTANGLE:
        updateShape(currentFrameIndex, currentShapeId.current, (rectangle) => ({
          ...rectangle,
          width: x - rectangle.x,
          height: y - rectangle.y,
        }));
        break;
      case ACTIONS.CIRCLE:
        updateShape(currentFrameIndex, currentShapeId.current, (circle) => ({
          ...circle,
          radius: ((y - circle.y) ** 2 + (x - circle.x) ** 2) ** 0.5,
        }));
        break;
      case ACTIONS.ARROW:
        updateShape(currentFrameIndex, currentShapeId.current, (arrow) => ({
          ...arrow,
          points: [arrow.points[0], arrow.points[1], x, y],
        }));
        break;
      case ACTIONS.LINE:
        updateShape(currentFrameIndex, currentShapeId.current, (line) => ({
          ...line,
          points: [...line.points, x, y],
        }));
        break;
    }
  };

  const handleMouseUp = () => {
    isPainting.current = false;

    // if (action === ACTIONS.SELECT) {
    //   const rect = {
    //     x: Math.min(selectionRect.x, selectionRect.x + selectionRect.width),
    //     y: Math.min(selectionRect.y, selectionRect.y + selectionRect.height),
    //     width: Math.abs(selectionRect.width),
    //     height: Math.abs(selectionRect.height),
    //   };

    //   setAnnotations((prev) =>
    //     prev.map((frame, i) =>
    //       i === currentFrameIndex
    //         ? {
    //             ...frame,
    //             shapes: frame.shapes.map((shape) => ({
    //               ...shape,
    //               selected: isShapeInside(shape, rect),
    //             })),
    //           }
    //         : frame
    //     )
    //   );

    //   setSelectionRect(null);
    // }
  };

  // ---------------- SELECTING ----------------

  const deleteSelectedShapes = () => {
    setAnnotations((prev) =>
      prev.map((frame) =>
        frame.frameId === currentFrameIndex
          ? { ...frame, shapes: frame.shapes.filter((s) => !s.selected) }
          : frame
      )
    );

    if (transformerRef.current) {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  };

  const updateShape = (frameIndex, shapeId, updater) => {
    setAnnotations((prev) =>
      prev.map((frame, i) =>
        i === frameIndex
          ? {
              ...frame,
              shapes: frame.shapes.map((shape) =>
                shape.id === shapeId ? updater(shape) : shape
              ),
            }
          : frame
      )
    );
  };

  const transformActive = (e) => {
    if (action !== ACTIONS.SELECT) return;
    const target = e.currentTarget;

    // mark only this shape as selected
    setAnnotations((prev) =>
      prev.map((frame) =>
        frame.frameId === currentFrameIndex
          ? {
              ...frame,
              shapes: frame.shapes.map((s) => {
                console.log(target);
                console.log(s.id, "---------------------- ", target.id());
                return {
                  ...s,
                  selected: s.id === target.id(),
                };
              }),
            }
          : frame
      )
    );

    transformerRef.current.nodes([target]);
  };

  useEffect(() => {
    if (transformerRef.current) {
      transformerRef.current.nodes([]);
    }
  }, [currentFrameIndex]);

  // STAGE SELECTING

  const handleStageMouseDown = (e) => {
    // if clicked on empty area (stage itself, not a shape)
    if (action !== ACTIONS.SELECT) return;

    const stage = stageRef.current.getStage();
    const { x, y } = stage.getPointerPosition();
    setSelecting(true);
    selectionStart.current = { x, y };
    setSelectionRect({ x, y, width: 0, height: 0 });

    // stage.on("pointermove", (ev) => {
    //   const { x: nx, y: ny } = stage.getPointerPosition();
    //   setSelectionRect((prev) => ({
    //     x: prev.x,
    //     y: prev.y,
    //     width: nx - prev.x,
    //     height: ny - prev.y,
    //   }));
    // });

    // stage.on("pointerup", () => {
    //   stage.off("pointermove");
    //   stage.off("pointerup");
    //   handleMouseUp();
    // });

    if (e.target === e.target.getStage()) {
      if (transformerRef.current) {
        transformerRef.current.nodes([]); // deselect all
      }
    }
  };

  const handleStageMouseMove = () => {
    const stage = stageRef?.current;
    if (!stage) return;

    const { x, y } = stage.getPointerPosition();

    if (action === ACTIONS.SELECT && selecting) {
      const sx = selectionStart.current.x;
      const sy = selectionStart.current.y;
      setSelectionRect({
        x: Math.min(sx, x),
        y: Math.min(sy, y),
        width: Math.abs(x - sx),
        height: Math.abs(y - sy),
      });
      return;
    }
  };

  const handleStageMouseUp = () => {
    if (action === ACTIONS.SELECT && selecting) {
      const rect = selectionRect;
      if (!rect) return;

      const shapes = getShapesForFrame(currentFrameIndex); // your function to get all shapes
      console.log(shapes);
      const selectedIds = shapes
        .filter((shape) => {
          const shapeBounds = getShapeBounds(shape); // helper to get x/y/width/height
          return (
            rect.x < shapeBounds.x + shapeBounds.width &&
            rect.x + rect.width > shapeBounds.x &&
            rect.y < shapeBounds.y + shapeBounds.height &&
            rect.y + rect.height > shapeBounds.y
          );
        })
        .map((s) => s.id);

      updateShapesSelection(currentFrameIndex, selectedIds);

      setSelecting(false);
      setSelectionRect(null);
    }
  };

  return {
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

    deleteSelectedShapes,
    updateShape,

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
  };
};
