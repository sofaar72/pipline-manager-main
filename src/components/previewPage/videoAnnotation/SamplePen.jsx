import React from "react";
import { Line, Rect } from "react-konva";

export default function SamplePen({
  selectedId,
  mode,
  handleDragEnd,
  getLineBBox,
  isSelecting,
  selection,
}) {
  // Sample pen annotation data
  const samplePen = {
    id: "sample-pen-1",
    points: [50, 60, 70, 80, 90, 70, 110, 100, 130, 80],
    x: 0,
    y: 0,
  };

  return (
    <>
      <Line
        key={samplePen.id}
        points={samplePen.points}
        x={samplePen.x}
        y={samplePen.y}
        stroke="green"
        strokeWidth={3}
        tension={0.5}
        lineCap="round"
        lineJoin="round"
        // shadowBlur={selectedId === samplePen.id ? 5 : 0}
        // draggable={mode === "drag" && selectedId === samplePen.id}
        // onDragEnd={handleDragEnd}
      />

      {/* Bounding box for selected item */}
      {selectedId === samplePen.id && mode === "drag" && (
        <Rect
          {...getLineBBox(samplePen)}
          stroke="red"
          dash={[4, 4]}
          draggable
          onDragEnd={handleDragEnd}
        />
      )}

      {/* Selection box (if needed) */}
      {isSelecting && selection && (
        <Rect
          x={selection.x}
          y={selection.y}
          width={selection.w}
          height={selection.h}
          fill="rgba(0,161,255,0.2)"
          stroke="red"
          dash={[4, 4]}
        />
      )}
    </>
  );
}
