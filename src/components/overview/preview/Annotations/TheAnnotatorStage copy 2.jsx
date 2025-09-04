import React, { useEffect, useRef } from "react";
import {
  Layer,
  Stage,
  Circle,
  Rect,
  Line,
  Group,
  Transformer,
  Arrow,
} from "react-konva";
import { ACTIONS } from "./Actions";

const TheAnnotatorStage = ({
  stageSize,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  annotations,
  currentFrameIndex,

  selecting,
  selectionRect,
  updateShape,
  deleteSelectedShapes,
  // new
  stageRef,
  rectangles,
  fillColor,
  action,
  isDraggable,
  transformActive,
  transformerRef,
  handleStageMouseDown,
  handleStageMouseMove,
  handleStageMouseUp,
  isFullScreen,
  getShapesForFrame,
  denormalizeShape,
  stageToVideoCoords,
  normalizeRect,
  normalizedToVideoRect,
  denormalizeRect,
}) => {
  const currentFrame = (type = "rect") => {
    return annotations?.find((f) => f.frameId === currentFrameIndex);
  };

  console.log(currentFrame());

  const shapeRefs = useRef({}); // store refs per shape

  // Update transformer when selected shapes change
  useEffect(() => {
    if (!transformerRef.current) return;

    const selectedNodes = (currentFrame()?.shapes || [])
      .filter((s) => s.selected)
      .map((s) => shapeRefs.current[s.id])
      .filter(Boolean);

    transformerRef.current.nodes(selectedNodes);
    transformerRef.current.getLayer()?.batchDraw();
  }, [annotations, currentFrameIndex]);

  // Handle Delete key
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check for Delete or Backspace key
      if (e.key === "Delete" || e.key === "Backspace") {
        deleteSelectedShapes();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
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
    <div className={`w-full h-full top-0 left-0 absolute z-[999]`}>
      <Stage
        ref={stageRef}
        width={stageSize.width}
        height={stageSize.height}
        className="bg-green-500/20"
        onPointerDown={handleMouseDown}
        onPointerMove={handleMouseMove}
        onPointerUp={handleMouseUp}
        style={{
          cursor:
            action === ACTIONS.RECTANGLE ||
            action === ACTIONS.CIRCLE ||
            action === ACTIONS.ARROW ||
            action === ACTIONS.LINE
              ? "crosshair"
              : "default",
        }}
        onMouseDown={handleStageMouseDown}
        onMouseMove={handleStageMouseMove}
        onMouseUp={handleStageMouseUp}
      >
        <Layer>
          {/* THE MARQUEE (marquee) */}
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

          {/* THE ANNOTATIONS  */}

          {currentFrame()?.shapes?.map((shape) => {
            console.log(shape);
            switch (shape.type) {
              case "rect":
                const s = denormalizeRect(shape); // stage coords
                console.log("testsetste");
                return (
                  <Rect
                    ref={(n) => (shapeRefs.current[shape.id] = n)}
                    key={shape.id}
                    id={shape.id}
                    x={s.x} // if normalized
                    y={s.y} // if normalized
                    width={s.width}
                    height={s.height}
                    stroke={shape.stroke}
                    strokeWidth={2}
                    fill={shape.fillColor || "transparent"}
                    onClick={transformActive}
                    draggable={isDraggable}
                    // onDragEnd={(e) => {
                    //   const { x, y } = e.target.position();
                    //   updateShape(currentFrameIndex, shape.id, (s) => ({
                    //     ...s,
                    //     x,
                    //     y,
                    //   }));
                    // }}
                    onDragEnd={(e) => {
                      // convert dragged stage pos to video pos then normalize and save
                      const pos = e.target.position(); // stage coords
                      const videoPos = stageToVideoCoords(pos);
                      updateShape(currentFrameIndex, shape.id, (sh) => {
                        const shVideo = normalizedToVideoRect(sh);
                        // keep same video size, change x/y:
                        const updatedVideoRect = {
                          ...shVideo,
                          x: videoPos.x,
                          y: videoPos.y,
                        };
                        return { ...sh, ...normalizeRect(updatedVideoRect) };
                      });
                    }}
                    onTransformEnd={(e) => {
                      const node = e.target;

                      // Get final values BEFORE resetting anything
                      const { x, y } = node.position();
                      const width = node.width() * node.scaleX();
                      const height = node.height() * node.scaleY();
                      // const rotation = node.rotation(); // get rotation in degrees

                      // Update the shape in your state
                      updateShape(currentFrameIndex, shape.id, (s) => ({
                        ...s,
                        x,
                        y,
                        width,
                        height,
                        // rotation,
                      }));

                      // Reset scale after saving
                      node.scaleX(1);
                      node.scaleY(1);
                    }}
                  />
                  // <Rect
                  //   ref={(n) => (shapeRefs.current[shape.id] = n)}
                  //   key={shape.id}
                  //   id={shape.id}
                  //   x={shape.x} // if normalized
                  //   y={shape.y} // if normalized
                  //   width={shape.width}
                  //   height={shape.height}
                  //   stroke={shape.stroke}
                  //   strokeWidth={2}
                  //   fill={shape.fillColor || "transparent"}
                  //   onClick={transformActive}
                  //   draggable={isDraggable}
                  //   onDragEnd={(e) => {
                  //     const { x, y } = e.target.position();
                  //     updateShape(currentFrameIndex, shape.id, (s) => ({
                  //       ...s,
                  //       x,
                  //       y,
                  //     }));
                  //   }}
                  //   onTransformEnd={(e) => {
                  //     const node = e.target;

                  //     // Get final values BEFORE resetting anything
                  //     const { x, y } = node.position();
                  //     const width = node.width() * node.scaleX();
                  //     const height = node.height() * node.scaleY();
                  //     // const rotation = node.rotation(); // get rotation in degrees

                  //     // Update the shape in your state
                  //     updateShape(currentFrameIndex, shape.id, (s) => ({
                  //       ...s,
                  //       x,
                  //       y,
                  //       width,
                  //       height,
                  //       // rotation,
                  //     }));

                  //     // Reset scale after saving
                  //     node.scaleX(1);
                  //     node.scaleY(1);
                  //   }}
                  // />
                );
              case "circle":
                return (
                  <Circle
                    ref={(n) => (shapeRefs.current[shape.id] = n)}
                    key={shape.id}
                    id={shape.id}
                    x={shape.x} // if normalized
                    y={shape.y} // if normalized
                    radius={shape.radius}
                    stroke={shape.stroke}
                    strokeWidth={2}
                    fill={shape.fillColor || "transparent"}
                    onClick={transformActive}
                    draggable={isDraggable}
                    onDragEnd={(e) => {
                      const { x, y } = e.target.position();
                      updateShape(currentFrameIndex, shape.id, (s) => ({
                        ...s,
                        x,
                        y,
                      }));
                    }}
                    onTransformEnd={(e) => {
                      const node = e.target;

                      // Get final position and scale
                      const { x, y } = node.position();
                      const scaleX = node.scaleX();
                      const scaleY = node.scaleY();

                      // Update shape state
                      updateShape(currentFrameIndex, shape.id, (s) => ({
                        ...s,
                        x,
                        y,
                        radius: s.radius * Math.max(scaleX, scaleY), // scale radius uniformly
                      }));

                      // Reset scale so future transforms work correctly
                      node.scaleX(1);
                      node.scaleY(1);
                    }}
                  />
                );
              case "arrow":
                return (
                  <Arrow
                    ref={(n) => (shapeRefs.current[shape.id] = n)}
                    key={shape.id}
                    id={shape.id}
                    stroke={shape.fillColor}
                    strokeWidth={2}
                    points={shape.points}
                    x={shape.x}
                    y={shape.y}
                    fill={shape.fillColor || "transparent"}
                    onClick={transformActive}
                    draggable={isDraggable}
                    onDragEnd={(e) => {
                      const { x, y } = e.target.position();
                      updateShape(currentFrameIndex, shape.id, (s) => ({
                        ...s,
                        x,
                        y,
                      }));
                    }}
                  />
                );
              case "line":
                return (
                  <Line
                    ref={(n) => (shapeRefs.current[shape.id] = n)}
                    key={shape.id}
                    id={shape.id}
                    x={shape.x}
                    y={shape.y}
                    points={shape.points}
                    stroke={shape.fillColor}
                    strokeWidth={4}
                    onClick={transformActive}
                    draggable={isDraggable}
                    onDragEnd={(e) => {
                      const { x, y } = e.target.position();
                      updateShape(currentFrameIndex, shape.id, (s) => ({
                        ...s,
                        x,
                        y,
                      }));
                    }}
                    onTransformEnd={(e) => {
                      const node = e.target;
                      const { x, y } = node.position();
                      const scaleX = node.scaleX();
                      const scaleY = node.scaleY();

                      // Scale each point
                      const newPoints = shape.points.map((point, index) =>
                        index % 2 === 0 ? point * scaleX : point * scaleY
                      );

                      // Update shape state
                      updateShape(currentFrameIndex, shape.id, (s) => ({
                        ...s,
                        x,
                        y,
                        points: newPoints,
                      }));

                      // Reset scale
                      node.scaleX(1);
                      node.scaleY(1);
                    }}
                  />
                );
              default:
                return null;
            }
          })}

          {/* 🔹 Transformer for scaling/rotating selected shapes */}
          <Transformer
            ref={transformerRef}
            rotateEnabled={false}
            // boundBoxFunc={(oldBox, newBox) => newBox} // allow free scaling
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default TheAnnotatorStage;
