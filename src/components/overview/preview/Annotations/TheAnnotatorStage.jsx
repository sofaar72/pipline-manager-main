import React, { useEffect, useRef } from "react";
import {
  Layer,
  Stage,
  Circle,
  Rect,
  Line,
  Group,
  Transformer,
} from "react-konva";

const TheAnnotatorStage = ({
  stageSize,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  annotations,
  currentFrameIndex,
  drawing,
  selecting,
  selectionRect,
  updateShape,
  deleteSelectedShapes,
}) => {
  const currentFrame = annotations?.find(
    (f) => f.frameId === currentFrameIndex
  );
  const transformerRef = useRef();
  const shapeRefs = useRef({}); // store refs per shape

  // Update transformer when selected shapes change
  useEffect(() => {
    if (!transformerRef.current) return;

    if (selecting) {
      const selectedNodes = [];
      currentFrame?.shapes.forEach((shape) => {
        if (shape.selected && shapeRefs.current[shape.id]) {
          selectedNodes.push(shapeRefs.current[shape.id]);
        }
      });
      transformerRef.current.nodes(selectedNodes);
    } else {
      // clear transformer when not selecting
      transformerRef.current.nodes([]);
    }

    transformerRef.current.getLayer()?.batchDraw();
  }, [annotations, currentFrameIndex, selecting]);

  // Handle Delete key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        deleteSelectedShapes();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [deleteSelectedShapes]);

  // helper to get bounding box of a line
  const getLineBounds = (points) => {
    const xs = [];
    const ys = [];
    for (let i = 0; i < points.length; i += 2) {
      xs.push(points[i] * stageSize.width);
      ys.push(points[i + 1] * stageSize.height);
    }
    return {
      x: Math.min(...xs),
      y: Math.min(...ys),
      width: Math.max(...xs) - Math.min(...xs),
      height: Math.max(...ys) - Math.min(...ys),
    };
  };

  return (
    <div className="w-full h-full top-0 left-0 absolute z-[999]">
      <Stage
        width={stageSize.width}
        height={stageSize.height}
        className="bg-green-500/20"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          cursor: drawing ? "crosshair" : "default",
        }}
      >
        <Layer>
          {/* Selection rectangle (marquee) */}
          {selectionRect && selecting && (
            <Rect
              x={selectionRect.x}
              y={selectionRect.y}
              width={selectionRect.width}
              height={selectionRect.height}
              stroke="blue"
              dash={[4, 4]}
              fill="rgba(0, 0, 255, 0.1)"
            />
          )}

          {currentFrame?.shapes.map((shape, i) => {
            const isSelected = shape.selected;

            switch (shape.type) {
              case "circle": {
                return (
                  <Circle
                    key={shape.id || i}
                    ref={(node) => (shapeRefs.current[shape.id] = node)}
                    x={shape.x * stageSize.width}
                    y={shape.y * stageSize.height}
                    radius={shape.radius || 5}
                    fill="red"
                    draggable={isSelected}
                    onDragEnd={(e) =>
                      updateShape(shape.id, {
                        x: e.target.x() / stageSize.width,
                        y: e.target.y() / stageSize.height,
                      })
                    }
                    onTransformEnd={(e) => {
                      const node = e.target;
                      const scaleX = node.scaleX();
                      const newRadius = (shape.radius || 5) * scaleX;

                      node.scaleX(1);
                      node.scaleY(1);

                      updateShape(shape.id, { radius: newRadius });
                    }}
                  />
                );
              }

              case "rect": {
                return (
                  <Rect
                    key={shape.id || i}
                    ref={(node) => (shapeRefs.current[shape.id] = node)}
                    x={shape.x * stageSize.width}
                    y={shape.y * stageSize.height}
                    width={shape.width * stageSize.width}
                    height={shape.height * stageSize.height}
                    fill="blue"
                    draggable={isSelected}
                    onDragEnd={(e) =>
                      updateShape(shape.id, {
                        x: e.target.x() / stageSize.width,
                        y: e.target.y() / stageSize.height,
                      })
                    }
                    onTransformEnd={(e) => {
                      const node = e.target;
                      const scaleX = node.scaleX();
                      const scaleY = node.scaleY();

                      node.scaleX(1);
                      node.scaleY(1);

                      updateShape(shape.id, {
                        x: node.x() / stageSize.width,
                        y: node.y() / stageSize.height,
                        width:
                          (shape.width * stageSize.width * scaleX) /
                          stageSize.width,
                        height:
                          (shape.height * stageSize.height * scaleY) /
                          stageSize.height,
                      });
                    }}
                  />
                );
              }

              case "line": {
                const bounds = getLineBounds(shape?.points);
                return (
                  <Group
                    key={i}
                    ref={(node) => {
                      if (node) shapeRefs.current[shape.id] = node;
                    }}
                    draggable={isSelected && !drawing}
                    onDragEnd={(e) => {
                      updateShape(shape.id, {
                        // normalize back to [0..1] space so stageSize resize works
                        x: e.target.x() / stageSize.width,
                        y: e.target.y() / stageSize.height,
                      });
                    }}
                  >
                    {/* Invisible hit area for easier selection (covers bounding box) */}
                    <Rect
                      x={bounds.x}
                      y={bounds.y}
                      width={bounds.width}
                      height={bounds.height}
                      fill="transparent"
                      strokeEnabled={false}
                      listening={true} // ✅ allow clicks
                    />

                    {/* Actual visible line */}

                    <Line
                      points={shape?.points?.map((p, idx) =>
                        idx % 2 === 0
                          ? p * stageSize.width
                          : p * stageSize.height
                      )}
                      stroke="red"
                      strokeWidth={2}
                      tension={0}
                      lineCap="round"
                      lineJoin="round"
                      listening={false} // ✅ so clicks go to invisible rect
                    />

                    {/* Selection outline */}
                    {/* {isSelected && !drawing && (
                      <Rect
                        x={bounds.x}
                        y={bounds.y}
                        width={bounds.width}
                        height={bounds.height}
                        stroke="cyan"
                        dash={[4, 4]}
                      />
                    )} */}
                  </Group>
                );
              }

              default:
                return null;
            }
          })}

          {/* 🔹 Transformer for scaling/rotating selected shapes */}
          <Transformer ref={transformerRef} rotateEnabled={true} />
        </Layer>
      </Stage>
    </div>
  );
};

export default TheAnnotatorStage;
