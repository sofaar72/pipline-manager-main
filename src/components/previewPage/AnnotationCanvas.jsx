import React, { useEffect, useState, useCallback } from "react";
import { Stage, Layer, Rect, Text } from "react-konva";

const MIN_DRAW_SIZE = 5;

const AnnotationCanvas = ({
  videoRef,
  selectedTime,
  isPlaying,
  annotations,
  setAnnotations,
}) => {
  const [newRect, setNewRect] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 640, height: 360 });

  // Update canvas size based on video
  const updateDimensions = useCallback(() => {
    if (videoRef?.current) {
      const video = videoRef.current;
      setDimensions({
        width: video.offsetWidth || video.clientWidth || 640,
        height: video.offsetHeight || video.clientHeight || 360,
      });
    }
  }, [videoRef]);

  useEffect(() => {
    updateDimensions();
    const video = videoRef?.current;
    if (video) {
      video.addEventListener("loadedmetadata", updateDimensions);
      video.addEventListener("resize", updateDimensions);
      window.addEventListener("resize", updateDimensions);

      return () => {
        video.removeEventListener("loadedmetadata", updateDimensions);
        video.removeEventListener("resize", updateDimensions);
        window.removeEventListener("resize", updateDimensions);
      };
    }
  }, [videoRef, updateDimensions]);

  const handleMouseDown = (e) => {
    if (isPlaying || selectedTime === null) return;

    const stage = e.target.getStage();
    const pos = stage.getPointerPosition();
    if (!pos) return;

    setStartPos(pos);
    setNewRect({
      x: pos.x,
      y: pos.y,
      width: 0,
      height: 0,
    });

    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || isPlaying || !newRect || !startPos) return;

    const stage = e.target.getStage();
    const pos = stage.getPointerPosition();
    if (!pos) return;

    setNewRect({
      x: startPos.x,
      y: startPos.y,
      width: pos.x - startPos.x,
      height: pos.y - startPos.y,
    });
  };

  const handleMouseUp = () => {
    if (!isDrawing || !newRect || selectedTime === null) {
      resetDraw();
      return;
    }

    const { width, height } = newRect;
    if (Math.abs(width) < MIN_DRAW_SIZE || Math.abs(height) < MIN_DRAW_SIZE) {
      resetDraw();
      return;
    }

    const newAnnotation = {
      ...newRect,
      label: "", // Placeholder for future labeling
    };

    const current = annotations[selectedTime] || [];
    const updated = {
      ...annotations,
      [selectedTime]: [...current, newAnnotation],
    };

    setAnnotations(updated);
    resetDraw();
  };

  const resetDraw = () => {
    setNewRect(null);
    setIsDrawing(false);
    setStartPos(null);
  };

  const handleDeleteAnnotation = (indexToRemove) => {
    const updated = (annotations[selectedTime] || []).filter(
      (_, i) => i !== indexToRemove
    );
    setAnnotations({ ...annotations, [selectedTime]: updated });
  };

  useEffect(() => {
    if (isPlaying) resetDraw();
  }, [isPlaying]);

  useEffect(() => {
    console.log("Annotations:", annotations);
  }, [annotations]);

  return (
    <div className="absolute z-[60] top-0 left-0 w-full h-full bg-black/20">
      <Stage
        width={dimensions.width}
        height={dimensions.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          pointerEvents: !isPlaying && selectedTime !== null ? "auto" : "none",
          backgroundColor: "transparent",
        }}
      >
        <Layer>
          {/* Render existing annotations */}
          {(annotations[selectedTime] || []).map((rect, idx) => (
            <React.Fragment key={`${selectedTime}-${idx}`}>
              <Rect
                x={rect.x}
                y={rect.y}
                width={rect.width}
                height={rect.height}
                stroke="red"
                strokeWidth={2}
                fill="rgba(255, 0, 0, 0.15)"
                onClick={() => handleDeleteAnnotation(idx)}
              />
              {rect.label && (
                <Text
                  text={rect.label}
                  x={rect.x}
                  y={rect.y - 16}
                  fontSize={14}
                  fill="white"
                  stroke="black"
                  strokeWidth={0.5}
                />
              )}
            </React.Fragment>
          ))}

          {/* Live preview while drawing */}
          {newRect && (
            <Rect
              x={newRect.x}
              y={newRect.y}
              width={newRect.width}
              height={newRect.height}
              stroke="blue"
              strokeWidth={2}
              dash={[4, 4]}
              fill="rgba(0, 0, 255, 0.1)"
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default AnnotationCanvas;
