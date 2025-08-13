import React, { useEffect, useRef, useState } from "react";
import {
  Stage,
  Layer,
  Image as KImage,
  Rect,
  Line,
  Text,
  Group,
} from "react-konva";
import useImage from "use-image";
import { v4 as uuidv4 } from "uuid";

const MIN_SIZE = 10;

export default function AnnotatorStage({ frame, tool }) {
  const [image] = useImage(frame?.src || "");
  const [annotations, setAnnotations] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const isDrawing = useRef(false);

  // Deselect annotation when frame or tool changes to pen

  useEffect(() => {
    console.log(annotations);
  }, [annotations]);
  useEffect(() => {
    if (tool === "pen") setSelectedId(null);
  }, [frame, tool]);

  // Keyboard Delete handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Delete" && selectedId && tool === "select") {
        handleRemove();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId, tool]);

  const handleMouseDown = (e) => {
    if (tool === "select") {
      // Selection mode: click on empty space deselects
      if (e.target === e.target.getStage()) {
        setSelectedId(null);
        return;
      }
      return; // Don't draw anything in select mode on mouse down
    }

    // Pen or rect drawing mode:
    const pos = e.target.getStage().getPointerPosition();
    if (!pos) return;

    setAnnotations((prev) => {
      const currentFrameAnnotations = prev[frame.index] || [];

      let newAnnotation = null;
      if (tool === "rect") {
        newAnnotation = {
          id: uuidv4(),
          type: "rect",
          x: pos.x,
          y: pos.y,
          width: 0,
          height: 0,
          stroke: "red",
        };
      } else if (tool === "pen") {
        newAnnotation = {
          id: uuidv4(),
          type: "pen",
          points: [pos.x, pos.y],
          stroke: "blue",
          strokeWidth: 2,
        };
      }

      if (!newAnnotation) return prev;

      return {
        ...prev,
        [frame.index]: [...currentFrameAnnotations, newAnnotation],
      };
    });

    isDrawing.current = true;
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) return;
    if (tool === "select") return; // no drawing when in select mode
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    if (!point) return;

    setAnnotations((prev) => {
      const currentFrameAnnotations = prev[frame.index] || [];
      const last = currentFrameAnnotations[currentFrameAnnotations.length - 1];
      if (!last) return prev;

      let updatedLast = { ...last };
      if (last.type === "rect") {
        let w = point.x - last.x;
        let h = point.y - last.y;

        // Enforce minimum size during drawing
        const absW = Math.abs(w);
        const absH = Math.abs(h);
        if (absW < MIN_SIZE) w = w < 0 ? -MIN_SIZE : MIN_SIZE;
        if (absH < MIN_SIZE) h = h < 0 ? -MIN_SIZE : MIN_SIZE;

        updatedLast.width = w;
        updatedLast.height = h;
      } else if (last.type === "pen") {
        updatedLast.points = last.points.concat([point.x, point.y]);
      }

      const updatedAnnotationsForFrame = [
        ...currentFrameAnnotations.slice(0, -1),
        updatedLast,
      ];

      return {
        ...prev,
        [frame.index]: updatedAnnotationsForFrame,
      };
    });
  };

  const handleMouseUp = () => {
    if (tool === "select") return;
    isDrawing.current = false;

    // Remove too small annotations (rect or pen)
    setAnnotations((prev) => {
      const currentFrameAnnotations = prev[frame.index] || [];
      if (currentFrameAnnotations.length === 0) return prev;

      const last = currentFrameAnnotations[currentFrameAnnotations.length - 1];
      if (!last) return prev;

      if (last.type === "rect") {
        if (
          Math.abs(last.width) < MIN_SIZE ||
          Math.abs(last.height) < MIN_SIZE
        ) {
          return {
            ...prev,
            [frame.index]: currentFrameAnnotations.slice(0, -1),
          };
        }
      } else if (last.type === "pen") {
        const points = last.points;
        let length = 0;
        for (let i = 0; i < points.length - 2; i += 2) {
          const dx = points[i + 2] - points[i];
          const dy = points[i + 3] - points[i + 1];
          length += Math.sqrt(dx * dx + dy * dy);
        }
        if (length < MIN_SIZE) {
          return {
            ...prev,
            [frame.index]: currentFrameAnnotations.slice(0, -1),
          };
        }
      }

      return prev;
    });
  };

  // Selection only active in select tool
  const handleSelect = (id) => {
    if (tool !== "select") return;
    setSelectedId(id);
  };

  const handleRemove = () => {
    if (!selectedId) return;
    setAnnotations((prev) => {
      const currentFrameAnnotations = prev[frame.index] || [];
      const filtered = currentFrameAnnotations.filter(
        (a) => a.id !== selectedId
      );
      return {
        ...prev,
        [frame.index]: filtered,
      };
    });
    setSelectedId(null);
  };

  const selectedAnnotation = (annotations[frame.index] || []).find(
    (a) => a.id === selectedId
  );

  // Helper functions to detect clicks near annotations (same as before)
  const SELECT_MARGIN = 10;

  const isNearRect = (pos, rect) => {
    const left = Math.min(rect.x, rect.x + rect.width) - SELECT_MARGIN;
    const right = Math.max(rect.x, rect.x + rect.width) + SELECT_MARGIN;
    const top = Math.min(rect.y, rect.y + rect.height) - SELECT_MARGIN;
    const bottom = Math.max(rect.y, rect.y + rect.height) + SELECT_MARGIN;

    return pos.x >= left && pos.x <= right && pos.y >= top && pos.y <= bottom;
  };

  const isNearPen = (pos, pen) => {
    const points = pen.points;
    if (!points || points.length < 2) return false;
    const xs = points.filter((_, i) => i % 2 === 0);
    const ys = points.filter((_, i) => i % 2 === 1);
    const minX = Math.min(...xs) - SELECT_MARGIN;
    const maxX = Math.max(...xs) + SELECT_MARGIN;
    const minY = Math.min(...ys) - SELECT_MARGIN;
    const maxY = Math.max(...ys) + SELECT_MARGIN;

    return pos.x >= minX && pos.x <= maxX && pos.y >= minY && pos.y <= maxY;
  };

  // New stage click handler for select mode to select annotations by click near them
  const handleStageClick = (e) => {
    if (tool !== "select") return; // Only in select mode

    const pos = e.target.getStage().getPointerPosition();
    if (!pos) return;

    // If click on empty area (stage itself), deselect
    if (e.target === e.target.getStage()) {
      setSelectedId(null);
      return;
    }

    // Try to find annotation near click position
    const currentFrameAnnotations = annotations[frame.index] || [];
    const found = currentFrameAnnotations.find((a) => {
      if (a.type === "rect") return isNearRect(pos, a);
      if (a.type === "pen") return isNearPen(pos, a);
      return false;
    });

    if (found) {
      setSelectedId(found.id);
    } else {
      setSelectedId(null);
    }
  };

  const handleDragEnd = (e, annotation) => {
    const pos = e.target.position();
    setAnnotations((prev) => {
      const currentFrameAnnotations = prev[frame.index] || [];
      return {
        ...prev,
        [frame.index]: currentFrameAnnotations.map((a) => {
          if (a.id !== annotation.id) return a;

          if (a.type === "rect") {
            return {
              ...a,
              x: pos.x,
              y: pos.y,
            };
          }
          if (a.type === "pen") {
            // Calculate drag delta
            const deltaX =
              pos.x - Math.min(...a.points.filter((_, i) => i % 2 === 0));
            const deltaY =
              pos.y - Math.min(...a.points.filter((_, i) => i % 2 === 1));
            // Shift all points
            const newPoints = a.points.map((point, i) =>
              i % 2 === 0 ? point + deltaX : point + deltaY
            );
            return {
              ...a,
              points: newPoints,
            };
          }
          return a;
        }),
      };
    });
  };

  return (
    <Stage
      width={800}
      height={450}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={handleStageClick}
      style={{ cursor: tool === "select" ? "default" : "crosshair" }}
    >
      <Layer>
        {image && <KImage image={image} />}
        {(annotations[frame.index] || []).map((a) => {
          if (a.type === "rect") {
            return (
              <Rect
                key={a.id}
                x={a.x}
                y={a.y}
                width={a.width}
                height={a.height}
                stroke={a.stroke}
                fill="transparent"
                strokeWidth={2}
                onClick={(e) => {
                  e.cancelBubble = true;
                  handleSelect(a.id);
                }}
                listening={tool === "select"}
                draggable={tool === "select" && selectedId === a.id}
                onDragEnd={(e) => handleDragEnd(e, a)}
              />
            );
          }
          if (a.type === "pen") {
            return (
              <Line
                key={a.id}
                points={a.points}
                stroke={a.stroke}
                strokeWidth={a.strokeWidth}
                tension={0.5}
                lineCap="round"
                onClick={(e) => {
                  e.cancelBubble = true;
                  handleSelect(a.id);
                }}
                listening={tool === "select"}
                draggable={tool === "select" && selectedId === a.id}
                onDragEnd={(e) => handleDragEnd(e, a)}
              />
            );
          }
          return null;
        })}

        {/* Selection box + Remove button */}
        {tool === "select" &&
          selectedAnnotation &&
          selectedAnnotation.type === "rect" && (
            <Group>
              <Rect
                x={selectedAnnotation.x}
                y={selectedAnnotation.y}
                width={selectedAnnotation.width}
                height={selectedAnnotation.height}
                stroke="orange"
                dash={[6, 4]}
                strokeWidth={2}
                listening={false}
                perfectDrawEnabled={false}
              />
              <Rect
                x={selectedAnnotation.x + selectedAnnotation.width - 15}
                y={selectedAnnotation.y - 15}
                width={15}
                height={15}
                fill="red"
                cornerRadius={3}
                shadowBlur={2}
                onClick={(e) => {
                  e.cancelBubble = true;
                  handleRemove();
                }}
                style={{ cursor: "pointer" }}
              />
              <Text
                text="X"
                x={selectedAnnotation.x + selectedAnnotation.width - 12}
                y={selectedAnnotation.y - 14}
                fontSize={12}
                fill="white"
                onClick={(e) => {
                  e.cancelBubble = true;
                  handleRemove();
                }}
                style={{ cursor: "pointer" }}
              />
            </Group>
          )}

        {tool === "select" &&
          selectedAnnotation &&
          selectedAnnotation.type === "pen" && (
            <Group>
              {(() => {
                const points = selectedAnnotation.points;
                const xs = points.filter((_, i) => i % 2 === 0);
                const ys = points.filter((_, i) => i % 2 === 1);
                const minX = Math.min(...xs);
                const maxX = Math.max(...xs);
                const minY = Math.min(...ys);
                const maxY = Math.max(...ys);
                return (
                  <>
                    <Rect
                      x={minX}
                      y={minY}
                      width={maxX - minX}
                      height={maxY - minY}
                      stroke="orange"
                      dash={[6, 4]}
                      strokeWidth={2}
                      listening={false}
                      perfectDrawEnabled={false}
                    />
                    <Rect
                      x={maxX - 15}
                      y={minY - 15}
                      width={15}
                      height={15}
                      fill="red"
                      cornerRadius={3}
                      shadowBlur={2}
                      onClick={(e) => {
                        e.cancelBubble = true;
                        handleRemove();
                      }}
                      style={{ cursor: "pointer" }}
                    />
                    <Text
                      text="X"
                      x={maxX - 12}
                      y={minY - 14}
                      fontSize={12}
                      fill="white"
                      onClick={(e) => {
                        e.cancelBubble = true;
                        handleRemove();
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  </>
                );
              })()}
            </Group>
          )}
      </Layer>
    </Stage>
  );
}
