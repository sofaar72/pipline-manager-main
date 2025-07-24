import React, { useState, useEffect, forwardRef } from "react";
import { Stage, Layer, Rect } from "react-konva";

export const KonvaOverlay = forwardRef(
  ({ currentTime, isPaused, videoRef }) => {
    const [annotations, setAnnotations] = useState({});
    const [newRect, setNewRect] = useState(null);
    const [drawing, setDrawing] = useState(false);

    const frame = Math.floor(currentTime * 25); // assuming 25 FPS

    const handleMouseDown = (e) => {
      if (!isPaused) return;
      const stage = e.target.getStage();
      const pos = stage.getPointerPosition();
      setNewRect({ x: pos.x, y: pos.y, width: 0, height: 0 });
      setDrawing(true);
    };

    const handleMouseMove = (e) => {
      if (!drawing || !isPaused) return;
      const stage = e.target.getStage();
      const pos = stage.getPointerPosition();
      setNewRect((prev) => ({
        ...prev,
        width: pos.x - prev.x,
        height: pos.y - prev.y,
      }));
    };

    const handleMouseUp = () => {
      if (!drawing || !newRect) return;
      const newAnnots = annotations[frame] || [];
      const updatedAnnots = {
        ...annotations,
        [frame]: [...newAnnots, newRect],
      };
      setAnnotations(updatedAnnots);
      setNewRect(null);
      setDrawing(false);
    };

    // ✅ Save to localStorage on every update
    useEffect(() => {
      localStorage.setItem("annotations", JSON.stringify(annotations));
    }, [annotations]);

    const currentAnnotations = annotations[frame] || [];

    return (
      <div className="absolute top-0 left-0 w-full h-[90%] pointer-events-none overflow-hidden bg-amber-400/20">
        <Stage
          width={videoRef.current?.offsetWidth}
          height={videoRef.current?.offsetHeight}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{ pointerEvents: isPaused ? "auto" : "none" }}
        >
          <Layer>
            {currentAnnotations.map((rect, i) => (
              <Rect
                key={i}
                x={rect.x}
                y={rect.y}
                width={rect.width}
                height={rect.height}
                stroke="red"
                strokeWidth={2}
              />
            ))}
            {newRect && (
              <Rect
                x={newRect.x}
                y={newRect.y}
                width={newRect.width}
                height={newRect.height}
                stroke="blue"
                dash={[4, 4]}
              />
            )}
          </Layer>
        </Stage>
      </div>
    );
  }
);
