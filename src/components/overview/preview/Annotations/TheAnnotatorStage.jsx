import React, { useEffect, useRef } from "react";
import {
  Stage,
  Layer,
  Rect,
  Circle,
  Line,
  Transformer,
  Arrow,
  Text,
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
  stageRef,
  action,
  isDraggable,
  transformerRef,
  transformActive,
  handleStageMouseDown,
  handleStageMouseMove,
  handleStageMouseUp,
  isFullScreen,
  getShapesForFrame,
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
  normalizeText = () => {},
  denormalizeText = () => {},
  normalizedToVideoText = () => {},
  handleTransformEnd,
}) => {
  const currentFrame = () =>
    annotations?.find((f) => f.frameId === currentFrameIndex) || { shapes: [] };
  const shapeRefs = useRef({});

  // Update transformer nodes when selection changes
  useEffect(() => {
    if (!transformerRef.current) return;
    const selectedNodes = currentFrame()
      .shapes.filter((s) => s.selected)
      .map((s) => shapeRefs.current[s.id])
      .filter(Boolean);

    transformerRef.current.nodes(selectedNodes);
    transformerRef.current.getLayer()?.batchDraw();
  }, [annotations, currentFrameIndex]);

  // Keyboard delete selected shapes
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Delete" || e.key === "Backspace") deleteSelectedShapes();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [deleteSelectedShapes]);

  return (
    <div className="w-full h-full absolute top-0 left-0 z-[999]">
      <Stage
        ref={stageRef}
        width={stageSize.width}
        height={stageSize.height}
        // className="bg-green-500/20"
        onPointerDown={handleMouseDown}
        onPointerMove={handleMouseMove}
        onPointerUp={handleMouseUp}
        onMouseDown={handleStageMouseDown}
        onMouseMove={handleStageMouseMove}
        onMouseUp={handleStageMouseUp}
        style={{
          cursor: [
            ACTIONS.RECTANGLE,
            ACTIONS.CIRCLE,
            ACTIONS.ARROW,
            ACTIONS.LINE,
            ACTIONS.TEXT,
          ].includes(action)
            ? "crosshair"
            : "default",
        }}
      >
        <Layer>
          {/* Selection marquee */}
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

          {/* Shapes */}
          {currentFrame()?.shapes?.map((shape) => {
            const shapeId = shape.id;
            const nodeRef = (n) => (shapeRefs.current[shapeId] = n);

            switch (shape.type) {
              case "rect": {
                const s = denormalizeRect(shape);
                return (
                  <Rect
                    ref={nodeRef}
                    key={shapeId}
                    id={shapeId}
                    x={s.x}
                    y={s.y}
                    width={s.width}
                    height={s.height}
                    stroke={shape.stroke}
                    strokeWidth={2}
                    fill={shape.fillColor || "transparent"}
                    draggable={isDraggable}
                    onClick={transformActive}
                    onDragEnd={(e) => {
                      const pos = e.target.position();
                      const videoPos = stageToVideoCoords(pos);
                      updateShape(currentFrameIndex, shapeId, (sh) => {
                        const shVideo = normalizedToVideoRect(sh);
                        return {
                          ...sh,
                          ...normalizeRect({
                            ...shVideo,
                            x: videoPos.x,
                            y: videoPos.y,
                          }),
                        };
                      });
                    }}
                    onTransformEnd={(e) =>
                      handleTransformEnd(
                        currentFrameIndex,
                        shape.id,
                        e.target,
                        shape
                      )
                    }
                  />
                );
              }

              case "circle": {
                const s = denormalizeCircle(shape);
                return (
                  <Circle
                    ref={nodeRef}
                    key={shapeId}
                    id={shapeId}
                    x={s.x}
                    y={s.y}
                    radius={s.radius}
                    stroke={shape.stroke}
                    strokeWidth={2}
                    fill={shape.fillColor || "transparent"}
                    draggable={isDraggable}
                    onClick={transformActive}
                    onDragEnd={(e) => {
                      const pos = e.target.position();
                      const videoPos = stageToVideoCoords(pos);
                      updateShape(currentFrameIndex, shapeId, (sh) =>
                        normalizeCircle({
                          ...normalizedToVideoCircle(sh),
                          x: videoPos.x,
                          y: videoPos.y,
                        })
                      );
                    }}
                    onTransformEnd={(e) =>
                      handleTransformEnd(
                        currentFrameIndex,
                        shape.id,
                        e.target,
                        shape
                      )
                    }
                  />
                );
              }

              case "arrow": {
                const s = denormalizeArrow(shape);
                return (
                  <Arrow
                    ref={nodeRef}
                    key={shapeId}
                    id={shapeId}
                    x={s.x}
                    y={s.y}
                    points={s.points}
                    stroke={shape.stroke || shape.fillColor}
                    strokeWidth={2}
                    fill={shape.fillColor || "transparent"}
                    draggable={isDraggable}
                    onClick={transformActive}
                    onDragEnd={(e) => {
                      const pos = e.target.position();
                      const videoPos = stageToVideoCoords(pos);
                      updateShape(currentFrameIndex, shapeId, () =>
                        normalizeArrow({
                          ...normalizedToVideoArrow(shape),
                          x: videoPos.x,
                          y: videoPos.y,
                        })
                      );
                    }}
                    onTransformEnd={(e) =>
                      handleTransformEnd(
                        currentFrameIndex,
                        shape.id,
                        e.target,
                        shape
                      )
                    }
                  />
                );
              }

              case "line": {
                const s = denormalizeLine(shape);
                return (
                  <Line
                    ref={nodeRef}
                    key={shapeId}
                    id={shapeId}
                    x={s.x}
                    y={s.y}
                    points={s.points}
                    stroke={shape.stroke || shape.fillColor}
                    strokeWidth={4}
                    draggable={isDraggable}
                    onClick={transformActive}
                    onDragEnd={(e) => {
                      const pos = e.target.position();
                      const videoPos = stageToVideoCoords(pos);
                      updateShape(currentFrameIndex, shapeId, () =>
                        normalizeLine({
                          ...normalizedToVideoLine(shape),
                          x: videoPos.x,
                          y: videoPos.y,
                        })
                      );
                    }}
                    onTransformEnd={(e) =>
                      handleTransformEnd(
                        currentFrameIndex,
                        shape.id,
                        e.target,
                        shape
                      )
                    }
                  />
                );
              }

              case "text": {
                const s = denormalizeText(shape);

                return (
                  <Text
                    ref={nodeRef}
                    key={shapeId}
                    id={shapeId}
                    x={s?.x}
                    y={s?.y}
                    text={shape.text || "Text"}
                    fontSize={s?.fontSize}
                    fontFamily={shape.fontFamily || "Arial"}
                    fill={shape.fill || shape.stroke || "#000"}
                    draggable={isDraggable}
                    onClick={transformActive}
                    onDblClick={(e) => {
                      // Double-click to edit text
                      const textNode = e.target;
                      const stage = textNode.getStage();
                      const stageContainer = stage.container();
                      const textPosition = textNode.absolutePosition();
                      const stageRect = stageContainer.getBoundingClientRect();

                      // Create textarea for editing
                      const textarea = document.createElement("textarea");
                      stageContainer.appendChild(textarea);

                      textarea.value = shape.text || "";
                      textarea.style.position = "absolute";
                      textarea.style.top = textPosition.y + "px";
                      textarea.style.left = textPosition.x + "px";
                      textarea.style.width =
                        Math.max(200, textNode.width() + 50) + "px";
                      textarea.style.height =
                        Math.max(100, textNode.height() + 50) + "px";
                      textarea.style.fontSize = s.fontSize + "px";
                      textarea.style.fontFamily = shape.fontFamily || "Arial";
                      textarea.style.border = "3px solid #3b82f6";
                      textarea.style.borderRadius = "8px";
                      textarea.style.padding = "12px";
                      textarea.style.background = "white";
                      textarea.style.boxShadow =
                        "0 4px 12px rgba(0, 0, 0, 0.15)";
                      textarea.style.zIndex = "9999";
                      textarea.style.resize = "none";
                      textarea.style.outline = "none";
                      textarea.style.color = "#000";

                      // Ensure textarea stays within stage bounds
                      const maxRight =
                        stageContainer.offsetWidth -
                        parseInt(textarea.style.width);
                      const maxBottom =
                        stageContainer.offsetHeight -
                        parseInt(textarea.style.height);

                      if (textPosition.x > maxRight) {
                        textarea.style.left = maxRight + "px";
                      }
                      if (textPosition.y > maxBottom) {
                        textarea.style.top = maxBottom + "px";
                      }

                      textarea.focus();
                      textarea.select();

                      const removeTextarea = () => {
                        const newText = textarea.value;
                        if (stageContainer.contains(textarea)) {
                          stageContainer.removeChild(textarea);
                        }

                        // Update the text shape
                        updateShape(currentFrameIndex, shapeId, (sh) => ({
                          ...sh,
                          text: newText,
                        }));
                      };

                      textarea.addEventListener("keydown", (e) => {
                        // Prevent arrow keys from propagating to window (frame navigation)
                        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                          e.stopPropagation();
                        }
                        if (e.key === "Backspace") {
                          e.stopPropagation();
                        }

                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          removeTextarea();
                        }
                        if (e.key === "Escape") {
                          removeTextarea();
                        }
                      });

                      textarea.addEventListener("blur", removeTextarea);
                    }}
                    onDragEnd={(e) => {
                      const pos = e.target.position();
                      const videoPos = stageToVideoCoords(pos);
                      updateShape(currentFrameIndex, shapeId, (sh) =>
                        normalizeText({
                          ...normalizedToVideoText(sh),
                          x: videoPos.x,
                          y: videoPos.y,
                        })
                      );
                    }}
                    onTransformEnd={(e) =>
                      handleTransformEnd(
                        currentFrameIndex,
                        shape.id,
                        e.target,
                        shape
                      )
                    }
                  />
                );
              }

              default:
                return null;
            }
          })}

          {action === ACTIONS.SELECT && (
            <Transformer ref={transformerRef} rotateEnabled={false} />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default TheAnnotatorStage;
