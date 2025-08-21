import React, { useEffect } from "react";
import { Group, Line, Rect, Text } from "react-konva";

export default function Annotations({
  lines = [], // default to empty array
  mode,
  selectedIds = [],
  isSelecting,
  selection,
  getLineBBox,
  handleDragEnd,
  onDelete,
  deselectId,
  strokeColor,
}) {
  // Keyboard delete support
  useEffect(() => {
    function handleKeyDown(e) {
      if (
        (e.key === "Delete" || e.key === "Backspace") &&
        selectedIds.length > 0
      ) {
        onDelete(selectedIds);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIds, onDelete]);

  // Debugging current frame lines
  useEffect(() => {
    if (lines.length > 0) {
      console.log("First line in current frame:", lines[0]);
    }
  }, [lines]);

  useEffect(() => {
    console.log(selectedIds);
  }, [selectedIds]);

  return (
    <>
      {/* All drawn lines for the current frame */}
      {lines.map((line, i) => {
        const isSelected = selectedIds.includes(line.id);
        const bbox = isSelected ? getLineBBox(line) : null;

        if (isSelected) {
          return (
            <Group
              id={line.id.toString()}
              key={line.id}
              x={line.x}
              y={line.y}
              draggable
              onDragEnd={(e) => {
                handleDragEnd(line.id, { x: e.target.x(), y: e.target.y() });
              }}
              onContextMenu={(e) => {
                e.evt.preventDefault();
                deselectId(line.id);
              }}
            >
              <Line
                id={line.id.toString()}
                points={line.points}
                stroke="blue"
                strokeWidth={2}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                shadowBlur={5}
              />
              {/* Bounding box */}
              <Rect
                x={bbox.x - line.x}
                y={bbox.y - line.y}
                width={bbox.width}
                height={bbox.height}
                stroke="red"
                dash={[4, 4]}
                fill="transparent"
                strokeWidth={1}
              />
              {/* Delete button */}
              <Group
                x={bbox.x - line.x + bbox.width - 12}
                y={bbox.y - line.y - 12}
                onClick={() => onDelete(line.id)}
                style={{ cursor: "pointer" }}
              >
                <Rect
                  width={20}
                  height={20}
                  fill="red"
                  cornerRadius={4}
                  shadowBlur={3}
                />
                <Text
                  text="×"
                  fontSize={16}
                  fill="white"
                  align="center"
                  verticalAlign="middle"
                  width={20}
                  height={20}
                  padding={2}
                />
              </Group>
            </Group>
          );
        }

        // Not selected
        return (
          <Line
            id={line.id.toString()}
            key={line.id}
            points={line.points}
            x={line.x}
            y={line.y}
            stroke={line.stroke}
            strokeWidth={2}
            tension={0.5}
            lineCap="round"
            lineJoin="round"
          />
        );
      })}

      {/* Selection box */}
      {isSelecting && selection && (
        <Rect
          x={selection.x}
          y={selection.y}
          width={selection.w}
          height={selection.h}
          fill="rgba(0,161,255,0.2)"
          stroke="blue"
          dash={[4, 4]}
        />
      )}
    </>
  );
}
