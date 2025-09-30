import { useRef, useState, useEffect } from "react";
import { ACTIONS } from "./Actions";
import { v4 as uuidv4 } from "uuid";
import { useComments } from "../../../../hooks/useComments";

export const useStageControl = ({
  containerRef = null,
  frames = [],
  isplaying = null,
  media_id = null,
  // isloope = null,
  prevVideoData,
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
  const [selectionRect, setSelectionRect] = useState(null); // âœ… NEW
  const [selecting, setSelecting] = useState(false);
  const selectionStart = useRef({ x: 0, y: 0 });
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const maxHistory = 5;

  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });

  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [annotations, setAnnotations] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (containerRef) {
      // console.log(containerRef.current?.videoWidth);
      // console.log(containerRef.current?.videoHeight);
    }
  }, [isFullScreen]);

  // SEND ANNOTAIONS EVERY 3 SECONDs
  const {
    sendAllAnnotations,
    fetchAllAnnotations,
    annotations: annotationResults,
    getAnnotationLoading,
  } = useComments();

  // CLEAR ANNOTATIONS FUNCTION - NEW
  const clearAnnotations = () => {
    setAnnotations([]);
    setCurrentFrameIndex(0);
    // Clear transformer selection
    if (transformerRef.current) {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer()?.batchDraw();
    }
    // Clear undo/redo stacks as well
    setUndoStack([]);
    setRedoStack([]);
  };

  // ---------- helpers: video size / transform ----------
  const getVideoNaturalSize = () => {
    const video = containerRef?.current;
    const vw = (video && video.videoWidth) || stageSize.width || 1;
    const vh = (video && video.videoHeight) || stageSize.height || 1;
    return { vw, vh };
  };

  const getVideoTransform = () => {
    const { vw, vh } = getVideoNaturalSize();
    // protect from zero
    const safeVw = vw || 1;
    const safeVh = vh || 1;
    const scale =
      Math.min(stageSize.width / safeVw, stageSize.height / safeVh) || 1;
    const offsetX = (stageSize.width - safeVw * scale) / 2;
    const offsetY = (stageSize.height - safeVh * scale) / 2;
    return { vw: safeVw, vh: safeVh, scale, offsetX, offsetY };
  };

  // convert stage (screen) coords -> video pixel coords
  const stageToVideoCoords = ({ x, y }) => {
    const { vw, vh, scale, offsetX, offsetY } = getVideoTransform();
    const vx = (x - offsetX) / scale;
    const vy = (y - offsetY) / scale;
    return {
      x: Math.max(0, Math.min(vx, vw)),
      y: Math.max(0, Math.min(vy, vh)),
    };
  };

  // convert video pixel coords -> stage (screen) coords
  const videoToStageCoords = ({ x, y, width = 0, height = 0 }) => {
    const { scale, offsetX, offsetY } = getVideoTransform();
    return {
      x: x * scale + offsetX,
      y: y * scale + offsetY,
      width: width * scale,
      height: height * scale,
    };
  };

  // get a normalized from video-px
  const normalizeRect = (shape) => {
    const { x, y, width, height } = shape;
    const { vw, vh } = getVideoNaturalSize();
    return {
      ...shape,
      x: x / vw,
      y: y / vh,
      width: width / vw,
      height: height / vh,
    };
  };

  const normalizeCircle = (circle) => {
    const { x, y, radius } = circle;
    const { vw, vh } = getVideoNaturalSize(); // video natural width/height
    return {
      ...circle,
      x: x / vw,
      y: y / vh,
      radius: radius / ((vw + vh) / 2), // normalize radius relative to average dimension
    };
  };

  const normalizeArrow = (arrow) => {
    const { x, y, points } = arrow;
    const { vw, vh } = getVideoNaturalSize();
    return {
      ...arrow,
      x: x / vw,
      y: y / vh,
      points: points.map((p, i) => (i % 2 === 0 ? p / vw : p / vh)),
    };
  };

  const normalizeLine = (line) => {
    const { x, y, points } = line;
    const { vw, vh } = getVideoNaturalSize();
    return {
      ...line,
      x: x / vw,
      y: y / vh,
      points: points.map((p, i) => (i % 2 === 0 ? p / vw : p / vh)),
    };
  };

  // Add these helper functions for text normalization/denormalization
  const normalizeText = (text) => {
    const { x, y, fontSize } = text;
    const { vw, vh } = getVideoNaturalSize();
    return {
      ...text,
      x: x / vw,
      y: y / vh,
      fontSize: fontSize / ((vw + vh) / 2), // normalize fontSize relative to average dimension
    };
  };

  const denormalizeRect = (normRect) => {
    const { vw, vh, scale, offsetX, offsetY } = getVideoTransform();
    const vx = normRect.x * vw;
    const vy = normRect.y * vh;
    const vwidth = normRect.width * vw;
    const vheight = normRect.height * vh;
    return {
      x: vx * scale + offsetX,
      y: vy * scale + offsetY,
      width: vwidth * scale,
      height: vheight * scale,
    };
  };

  const denormalizeCircle = (normCircle) => {
    const { vw, vh, scale, offsetX, offsetY } = getVideoTransform();
    const x = normCircle.x * vw * scale + offsetX;
    const y = normCircle.y * vh * scale + offsetY;
    const radius = normCircle.radius * ((vw + vh) / 2) * scale; // scale radius
    return {
      ...normCircle,
      x,
      y,
      radius,
    };
  };

  const denormalizeArrow = (normArrow) => {
    const { vw, vh, scale, offsetX, offsetY } = getVideoTransform();
    const x = normArrow.x * vw * scale + offsetX;
    const y = normArrow.y * vh * scale + offsetY;
    const points = normArrow.points.map((p, i) =>
      i % 2 === 0 ? p * vw * scale : p * vh * scale
    );
    return {
      ...normArrow,
      x,
      y,
      points,
    };
  };

  const denormalizeLine = (normLine) => {
    const { vw, vh, scale, offsetX, offsetY } = getVideoTransform();
    const x = normLine.x * vw * scale + offsetX;
    const y = normLine.y * vh * scale + offsetY;
    const points = normLine.points.map((p, i) =>
      i % 2 === 0 ? p * vw * scale : p * vh * scale
    );
    return {
      ...normLine,
      x,
      y,
      points,
    };
  };

  const denormalizeText = (normText) => {
    const { vw, vh, scale, offsetX, offsetY } = getVideoTransform();
    const x = normText.x * vw * scale + offsetX;
    const y = normText.y * vh * scale + offsetY;
    const fontSize = normText.fontSize * ((vw + vh) / 2) * scale;
    return {
      ...normText,
      x,
      y,
      fontSize,
    };
  };

  const normalizedToVideoRect = (normRect) => {
    const { vw, vh } = getVideoNaturalSize();
    return {
      x: normRect.x * vw,
      y: normRect.y * vh,
      width: normRect.width * vw,
      height: normRect.height * vh,
    };
  };

  const normalizedToVideoCircle = (normCircle) => {
    const { vw, vh } = getVideoNaturalSize(); // natural video size
    return {
      ...normCircle,
      x: normCircle.x * vw,
      y: normCircle.y * vh,
      radius: normCircle.radius * ((vw + vh) / 2), // scale radius to video pixels
    };
  };

  const normalizedToVideoArrow = (normArrow) => {
    const { vw, vh } = getVideoNaturalSize();
    return {
      ...normArrow,
      x: normArrow.x * vw,
      y: normArrow.y * vh,
      points: normArrow.points.map((p, i) => (i % 2 === 0 ? p * vw : p * vh)),
    };
  };

  const normalizedToVideoLine = (normLine) => {
    const { vw, vh } = getVideoNaturalSize();
    return {
      ...normLine,
      x: normLine.x * vw,
      y: normLine.y * vh,
      points: normLine.points.map((p, i) => (i % 2 === 0 ? p * vw : p * vh)),
    };
  };

  const normalizedToVideoText = (normText) => {
    const { vw, vh } = getVideoNaturalSize();
    return {
      ...normText,
      x: normText.x * vw,
      y: normText.y * vh,
      fontSize: normText.fontSize * ((vw + vh) / 2),
    };
  };

  // helper: make rect from two video points (ensures positive width/height)
  const makeVideoRectFromPoints = (x1, y1, x2, y2) => {
    const x = Math.min(x1, x2);
    const y = Math.min(y1, y2);
    const width = Math.abs(x2 - x1);
    const height = Math.abs(y2 - y1);
    return { x, y, width, height };
  };

  const handleTransformEnd = (frameIndex, shapeId, node, shape) => {
    if (!node) return;

    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    const pos = { x: node.x(), y: node.y() };
    const videoPos = stageToVideoCoords(pos);

    // ✅ Get the transform values
    const { scale, offsetX, offsetY } = getVideoTransform();

    let updatedShape;

    switch (shape.type) {
      case "rect": {
        const stageWidth = node.width() * scaleX;
        const stageHeight = node.height() * scaleY;
        const widthVideo = stageWidth / scale;
        const heightVideo = stageHeight / scale;

        node.scaleX(1);
        node.scaleY(1);

        updateShape(frameIndex, shapeId, () =>
          normalizeRect({
            ...shape,
            x: videoPos.x,
            y: videoPos.y,
            width: widthVideo,
            height: heightVideo,
          })
        );
        break;
      }

      case "circle": {
        const shVideo = normalizedToVideoCircle(shape);
        const scaleAvg = Math.max(scaleX, scaleY);
        updatedShape = normalizeCircle({
          ...shVideo,
          x: videoPos.x,
          y: videoPos.y,
          radius: shVideo.radius * scaleAvg,
        });
        break;
      }

      case "text": {
        const shVideo = normalizedToVideoText(shape);
        const fontScale = Math.max(scaleX, scaleY);
        updatedShape = normalizeText({
          ...shVideo,
          x: videoPos.x,
          y: videoPos.y,
          fontSize: shVideo.fontSize * fontScale,
        });
        break;
      }

      case "arrow":
      case "line": {
        const shVideo =
          shape.type === "arrow"
            ? normalizedToVideoArrow(shape)
            : normalizedToVideoLine(shape);
        const newPoints = shVideo.points.map((p, i) =>
          i % 2 === 0 ? p * scaleX : p * scaleY
        );
        updatedShape =
          shape.type === "arrow"
            ? normalizeArrow({
                ...shVideo,
                x: videoPos.x,
                y: videoPos.y,
                points: newPoints,
              })
            : normalizeLine({
                ...shVideo,
                x: videoPos.x,
                y: videoPos.y,
                points: newPoints,
              });
        break;
      }

      default:
        return;
    }

    if (updatedShape) {
      pushUndo();
      updateShape(frameIndex, shapeId, () => updatedShape);
    }

    // Reset node scale
    node.scaleX(1);
    node.scaleY(1);
  };

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

  useEffect(() => {
    if (!annotationResults || annotationResults.length === 0) return;

    setAnnotations((prev) => {
      // If first load (no local annotations), just take serverâ€™s
      if (!prev || prev.length === 0) {
        return annotationResults;
      }

      // Merge: frame by frame
      return prev.map((frame, i) => {
        const serverFrame = annotationResults.find(
          (f) => f.frameId === frame.frameId
        );
        if (!serverFrame) return frame;

        // If local has shapes â†' keep them, otherwise use serverâ€™s
        if (frame.shapes && frame.shapes.length > 0) {
          return frame; // keep local edits
        }
        return serverFrame;
      });
    });
  }, [annotationResults]);

  // Force re-render when fullscreen changes to update all coordinate transforms
  useEffect(() => {
    // This will cause all shapes to recalculate their positions
    setAnnotations((prev) => [...prev]);
  }, [isFullScreen, stageSize]);

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
  }, [containerRef, isFullScreen, prevVideoData]); // ðŸ'ˆ add isFullScreen

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
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;

      setCurrentFrameIndex((prev) => {
        const totalFrames = frames.length;
        const clamped = (idx) => Math.max(0, Math.min(idx, totalFrames - 1));
        const delta = e.key === "ArrowRight" ? 1 : -1;
        const next = clamped(prev + delta);

        // keep video and slider in sync
        if (containerRef?.current && containerRef.current.duration) {
          const timePerFrame = containerRef.current.duration / totalFrames;
          containerRef.current.currentTime = next * timePerFrame;
        }
        return next;
      });
    };

    window.addEventListener("keydown", handleArrowKeys);
    return () => window.removeEventListener("keydown", handleArrowKeys);
  }, [frames, containerRef]);

  // ---------------- VIDEO PLAYBACK ----------------
  useEffect(() => {
    if (!containerRef.current || !frames.length) return;

    const video = containerRef.current;
    const updateSliderFromVideo = () => {
      const totalFrames = frames.length;
      const timePerFrame = video.duration / totalFrames || 1;
      let newFrameIndex = Math.round(video.currentTime / timePerFrame);
      newFrameIndex = Math.max(0, Math.min(totalFrames - 1, newFrameIndex));
      setCurrentFrameIndex((prev) =>
        prev === newFrameIndex ? prev : newFrameIndex
      );
    };

    video.addEventListener("timeupdate", updateSliderFromVideo);
    return () => video.removeEventListener("timeupdate", updateSliderFromVideo);
  }, [frames, containerRef]);

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
    updateAnnotations((prev) => {
      pushUndo(); // save before change
      return prev?.map((f, i) =>
        i === frameIndex ? { ...f, shapes: [...f.shapes, shape] } : f
      );
    });
  };

  const getShapesForFrame = (frameIndex) => {
    if (!annotations || !Array.isArray(annotations)) return [];
    if (!annotations[frameIndex]) return [];
    return annotations[frameIndex].shapes || [];
  };

  const getShapeBounds = (shape) => {
    switch (shape.type) {
      case "rect":
        const den = denormalizeRect(shape); // returns stage coords
        return {
          x: den.x,
          y: den.y,
          width: den.width,
          height: den.height,
        };
      case "circle":
        const denCircle = denormalizeCircle(shape);
        return {
          x: denCircle.x - denCircle.radius,
          y: denCircle.y - denCircle.radius,
          width: denCircle.radius * 2,
          height: denCircle.radius * 2,
        };
      case "text":
        const denText = denormalizeText(shape);
        // Approximate text bounds (you might want to calculate actual text width/height)
        const textWidth = (shape.text?.length || 10) * (denText.fontSize * 0.6); // rough estimate
        const textHeight = denText.fontSize * 1.2; // rough estimate
        return {
          x: denText.x,
          y: denText.y - textHeight, // text y is baseline, so subtract height
          width: textWidth,
          height: textHeight,
        };
      case "arrow":
      case "line": {
        const denArrow =
          shape.type === "arrow"
            ? denormalizeArrow(shape)
            : denormalizeLine(shape);
        const xs = [];
        const ys = [];
        for (let i = 0; i < denArrow.points.length; i += 2) {
          xs.push(denArrow.points[i]);
          ys.push(denArrow.points[i + 1]);
        }
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);

        return {
          x: denArrow.x + minX,
          y: denArrow.y + minY,
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
      prev?.map((frame, i) =>
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

  const handleMouseDown = (e) => {
    if (action === ACTIONS.SELECT) return;
    const stage = stageRef?.current;
    if (!stage) return;
    const { x, y } = stage.getPointerPosition();
    const videoPos = stageToVideoCoords({ x, y });
    const t = getVideoTransform();

    // initial size: 20px on screen -> convert to video px:
    const initialWVideo = 20 / (t.scale || 1);
    const initialHVideo = 20 / (t.scale || 1);

    const id = uuidv4();
    currentShapeId.current = id;
    isPainting.current = true;

    switch (action) {
      case ACTIONS.RECTANGLE:
        const recShape = {
          id,
          x: videoPos.x,
          y: videoPos.y,
          width: initialWVideo,
          height: initialHVideo,
          // fillColor,
          stroke: fillColor,
          // stroke: "#000",
          type: "rect",
          selected: false,
        };

        addShapeToFrame(currentFrameIndex, normalizeRect(recShape));

        break;
      case ACTIONS.CIRCLE: {
        const circleShape = {
          id,
          x: videoPos.x,
          y: videoPos.y,
          radius: initialWVideo, // use initial size as radius
          // fillColor,
          stroke: fillColor,
          type: "circle",
          selected: false,
        };
        addShapeToFrame(currentFrameIndex, normalizeCircle(circleShape));
        break;
      }
      case ACTIONS.ARROW:
        const arrowShape = {
          id,
          x: videoPos.x,
          y: videoPos.y,
          points: [0, 0, 20, 20],
          // fillColor,
          stroke: fillColor,
          // stroke: "#000",
          type: "arrow",
          selected: false,
        };
        addShapeToFrame(currentFrameIndex, normalizeArrow(arrowShape));
        break;
      case ACTIONS.LINE:
        const lineShape = {
          id,
          x: videoPos.x,
          y: videoPos.y,
          points: [0, 0],
          // fillColor,
          stroke: fillColor,
          // stroke: "#000",
          type: "line",
          selected: false,
        };
        addShapeToFrame(currentFrameIndex, normalizeLine(lineShape));
        break;
      case ACTIONS.TEXT:
        const textShape = {
          id,
          x: videoPos.x,
          y: videoPos.y,
          text: "New Text", // default text
          fontSize: prevVideoData?.type === "Video" ? 60 : 30, // default font size in video pixels
          fill: fillColor,
          type: "text",
          selected: false,
          fontFamily: "Arial", // optional: default font family
        };
        addShapeToFrame(currentFrameIndex, normalizeText(textShape));
        // For text, we don't need continued mouse movement, so end painting immediately
        isPainting.current = false;
        break;
    }
  };

  const handleMouseMove = (e) => {
    if (action === ACTIONS.SELECT || !isPainting.current) return;
    const stage = stageRef?.current;
    if (!stage) return;
    const { x, y } = stage.getPointerPosition();
    const videoPos = stageToVideoCoords({ x, y });

    switch (action) {
      case ACTIONS.RECTANGLE:
        updateShape(currentFrameIndex, currentShapeId.current, (rectangle) => {
          const rectVideo = normalizedToVideoRect(rectangle);
          const newVideoRect = makeVideoRectFromPoints(
            rectVideo.x,
            rectVideo.y,
            videoPos.x,
            videoPos.y
          );
          const normalized = normalizeRect(newVideoRect);
          return { ...rectangle, ...normalized };
        });
        break;
      case ACTIONS.CIRCLE:
        updateShape(currentFrameIndex, currentShapeId.current, (circle) => {
          const circleVideo = normalizedToVideoCircle(circle);
          const radius = Math.sqrt(
            Math.pow(videoPos.x - circleVideo.x, 2) +
              Math.pow(videoPos.y - circleVideo.y, 2)
          );
          return normalizeCircle({ ...circleVideo, radius });
        });
        break;
      case ACTIONS.ARROW:
        updateShape(currentFrameIndex, currentShapeId.current, (arrow) => {
          const arrowVideo = normalizedToVideoArrow(arrow);
          const newPoints = [
            0,
            0,
            videoPos.x - arrowVideo.x,
            videoPos.y - arrowVideo.y,
          ];
          return normalizeArrow({ ...arrowVideo, points: newPoints });
        });
        break;
      case ACTIONS.LINE:
        updateShape(currentFrameIndex, currentShapeId.current, (line) => {
          const lineVideo = normalizedToVideoLine(line);
          const newPoints = [
            ...lineVideo.points,
            videoPos.x - lineVideo.x,
            videoPos.y - lineVideo.y,
          ];
          return normalizeLine({ ...lineVideo, points: newPoints });
        });
        break;
    }
  };

  const handleMouseUp = () => {
    isPainting.current = false;
  };

  // ---------------- SELECTING ----------------

  const deleteSelectedShapes = () => {
    pushUndo(); // save before deletion
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
    updateAnnotations((prev) =>
      prev?.map((frame, i) =>
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
                // console.log(target);
                // console.log(s.id, "---------------------- ", target.id());
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
      // console.log(shapes);
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

  // UNDO AND REDO
  const clone = (obj) => {
    if (typeof structuredClone === "function") {
      return structuredClone(obj);
    }
    return JSON.parse(JSON.stringify(obj));
  };

  const pushUndo = (snapshot) => {
    const snap = snapshot === undefined ? clone(annotations) : clone(snapshot);
    setUndoStack((stack) => {
      const newStack = [...stack, snap];
      if (newStack.length > maxHistory) newStack.shift();
      return newStack;
    });
    // new edit invalidates redo
    setRedoStack([]);
  };

  const updateAnnotations = (updater) => {
    setAnnotations((prev) => {
      pushUndo(prev); // snapshot of previous state
      return updater(prev);
    });
  };

  const undo = () => {
    setUndoStack((prevUndo) => {
      if (prevUndo.length === 0) return prevUndo;
      const last = prevUndo[prevUndo.length - 1];
      const newUndo = prevUndo.slice(0, -1);
      setRedoStack((prevRedo) => [...prevRedo, clone(annotations)]);
      setAnnotations(clone(last));
      return newUndo;
    });
  };

  const redo = () => {
    setRedoStack((prevRedo) => {
      if (prevRedo.length === 0) return prevRedo;
      const last = prevRedo[prevRedo.length - 1];
      const newRedo = prevRedo.slice(0, -1);
      setUndoStack((prevUndo) => [...prevUndo, clone(annotations)]);
      setAnnotations(clone(last));
      return newRedo;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        undo();
      } else if ((e.ctrlKey || e.metaKey) && e.key === "y") {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [annotations, undoStack, redoStack]);

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
    getVideoTransform,
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
    clearAnnotations, // Export the clearAnnotations function
  };
};
