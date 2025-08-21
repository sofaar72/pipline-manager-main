import React, { useEffect } from "react";
import { Stage, Layer } from "react-konva";
import { useStage } from "../../../hooks/annotationHooks/useStage";
import Annotations from "./Annotations";
import SamplePen from "./SamplePen";

export default function AnnotatorStage({
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
}) {
  return (
    <div>
      <Stage
        width={stageSize.width}
        height={stageSize.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        // onContextMenu={(e) => e.evt.preventDefault()}
        style={{
          // background: "red",
          cursor: mode === "draw" ? "crosshair" : "default",
          // background: "white",
        }}
      >
        <Layer
        // scale={{
        //   x: stageSize.width / initialSize?.width,
        //   y: stageSize.height / initialSize?.height,
        // }}
        >
          <Annotations
            lines={lines}
            mode={mode}
            selectedIds={selectedIds}
            isSelecting={isSelecting}
            selection={selection}
            getLineBBox={getLineBBox}
            handleDragEnd={handleDragEnd}
            onDelete={handleDelete}
            deselectId={deselectId}
            strokeColor={strokeColor}
          />
          {/* <SamplePen
            selectedIds={selectedIds}
            mode={mode}
            handleDragEnd={handleDragEnd}
            getLineBBox={getLineBBox}
            isSelecting={isSelecting}
            selection={selection}
          /> */}
        </Layer>
      </Stage>
    </div>
  );
}
