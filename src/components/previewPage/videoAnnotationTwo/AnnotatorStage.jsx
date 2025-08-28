import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Stage, Layer, Line } from "react-konva";
import { useStage } from "../../../hooks/annotationHooks/useStage";
import Annotations from "./Annotations";

const AnnotatorStage = ({
  stageSize,
  lines,
  setSelectedIds,
  selection,
  isSelecting,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleDragEnd,
  getLineBBox,
  handleDelete,
  deselectId,
  mode,
  setMode,
  selectedIds,
  strokeColor,
  initialSize,
}) => {
  const [scale, setScale] = useState({ x: 1, y: 1 });

  useEffect(() => {
    if (!stageSize) return;
    setScale({
      x: stageSize.width / initialSize.width,
      y: stageSize.height / initialSize.height,
    });
  }, [stageSize, initialSize]);

  return (
    <Stage
      width={stageSize.width}
      height={stageSize.height}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      scaleX={scale.x}
      scaleY={scale.y}
      // onContextMenu={(e) => e.evt.preventDefault()}
      style={{
        // background: "blue",
        opacity: 0.8,
        cursor: mode === "draw" ? "crosshair" : "default",
        overflow: "hidden",

        // background: "white",
      }}
    >
      <Layer>
        <Line
          points={[50, 50, 200, 200]} // x1, y1, x2, y2
          stroke="red"
          strokeWidth={4}
          lineCap="round"
          lineJoin="round"
          x={1000}
          y={500}
        />
        {/* <Annotations
          lines={lines}
          mode={"draw"}
          selectedIds={selectedIds}
          isSelecting={isSelecting}
          selection={selection}
          getLineBBox={getLineBBox}
          handleDragEnd={handleDragEnd}
          onDelete={handleDelete}
          deselectId={deselectId}
          strokeColor={strokeColor}
          // scale={scale}
        /> */}
      </Layer>
    </Stage>
  );
};

export default AnnotatorStage;
