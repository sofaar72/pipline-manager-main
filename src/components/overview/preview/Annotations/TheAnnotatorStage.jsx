import React from "react";
import { Layer, Stage, Circle, Rect, Line } from "react-konva";

const TheAnnotatorStage = ({
  stageSize,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  annotations,
  currentFrameIndex,
}) => {
  const currentFrame = annotations?.find(
    (f) => f.frameId === currentFrameIndex
  );

  return (
    <div className="w-full h-full top-0 left-0 absolute z-[999]">
      <Stage
        width={stageSize.width}
        height={stageSize.height}
        className="bg-green-500/20"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          {currentFrame?.shapes.map((shape, i) => {
            switch (shape.type) {
              case "circle":
                return (
                  <Circle
                    key={i}
                    x={shape.x * stageSize.width}
                    y={shape.y * stageSize.height}
                    radius={shape.radius || 5}
                    fill="red"
                  />
                );
              case "rect":
                return (
                  <Rect
                    key={i}
                    x={shape.x * stageSize.width}
                    y={shape.y * stageSize.height}
                    width={shape.width * stageSize.width}
                    height={shape.height * stageSize.height}
                    fill="blue"
                  />
                );
              case "line":
                return (
                  <Line
                    key={i}
                    points={shape?.points?.map((p, idx) =>
                      idx % 2 === 0 ? p * stageSize.width : p * stageSize.height
                    )}
                    stroke="yellow"
                    strokeWidth={2}
                    tension={0}
                    lineCap="round"
                    lineJoin="round"
                  />
                );
              default:
                return null;
            }
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default TheAnnotatorStage;
