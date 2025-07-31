import React, { useEffect, useState, useCallback } from "react";
import {
  Stage,
  Layer,
  Rect,
  Circle,
  Line,
  RegularPolygon,
  Text,
} from "react-konva";
import AnnotationSelectTools from "./AnnotationSelectTools";
import { MdDelete } from "react-icons/md";

const MIN_DRAW_SIZE = 5;

const AnnotationCanvas = ({
  videoRef,
  selectedTime,
  isPlaying,
  annotations,
  setAnnotations,
  anotateable,
  selectedTool = "rectangle",
  setSelectedTool,
  selectedColor,
  setSelectedColor,
  deleteAnnotations,
}) => {
  const [newShape, setNewShape] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 640, height: 360 });
  const [selectedShapeIndex, setSelectedShapeIndex] = useState(null);

  const updateDimensions = useCallback(() => {
    if (videoRef?.current) {
      const video = videoRef.current;
      setDimensions({
        width: video.offsetWidth || 640,
        height: video.offsetHeight || 360,
      });
    }
  }, [videoRef]);

  useEffect(() => {
    updateDimensions();
    const video = videoRef?.current;
    if (video) {
      video.addEventListener("loadedmetadata", updateDimensions);
      video.addEventListener("resize", updateDimensions);
      window.addEventListener("resize", updateDimensions);
      return () => {
        video.removeEventListener("loadedmetadata", updateDimensions);
        video.removeEventListener("resize", updateDimensions);
        window.removeEventListener("resize", updateDimensions);
      };
    }
  }, [videoRef, updateDimensions]);

  const handleMouseDown = (e) => {
    if (isPlaying || selectedTime === null) return;
    const stage = e.target.getStage();
    const pos = stage.getPointerPosition();
    if (!pos) return;

    setStartPos(pos);
    setIsDrawing(true);

    if (selectedTool === "pen") {
      setNewShape({ tool: "pen", points: [pos.x, pos.y] });
    } else {
      setNewShape({
        tool: selectedTool,
        x: pos.x,
        y: pos.y,
        width: 0,
        height: 0,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !newShape || !startPos) return;

    const stage = e.target.getStage();
    const pos = stage.getPointerPosition();
    if (!pos) return;

    if (selectedTool === "pen") {
      setNewShape((prev) => ({
        ...prev,
        points: [...prev.points, pos.x, pos.y],
      }));
    } else {
      setNewShape({
        ...newShape,
        width: pos.x - startPos.x,
        height: pos.y - startPos.y,
      });
    }
  };

  const handleMouseUp = () => {
    if (!isDrawing || !newShape || selectedTime === null) {
      resetDraw();
      return;
    }

    if (
      (selectedTool !== "pen" &&
        (Math.abs(newShape.width) < MIN_DRAW_SIZE ||
          Math.abs(newShape.height) < MIN_DRAW_SIZE)) ||
      (selectedTool === "pen" && newShape.points.length < 4)
    ) {
      resetDraw();
      return;
    }

    const label = "";
    // const label = prompt("Enter label for this annotation:");
    // if (!label) {
    //   resetDraw();
    //   return;
    // }

    const current = annotations[selectedTime] || [];
    const updated = {
      ...annotations,
      [selectedTime]: [
        ...current,
        { ...newShape, label, color: selectedColor },
      ],
    };

    setAnnotations(updated);
    resetDraw();
  };

  const resetDraw = () => {
    setNewShape(null);
    setStartPos(null);
    setIsDrawing(false);
  };

  const handleDelete = (index) => {
    const updated = (annotations[selectedTime] || []).filter(
      (_, i) => i !== index
    );
    setAnnotations({ ...annotations, [selectedTime]: updated });
  };

  const handleDeleteAll = () => {
    deleteAnnotations(selectedTime);
  };

  return (
    <div
      className={`absolute z-[60] top-0 left-0 w-full h-full ${
        anotateable ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* annotation box  */}
      <div className="w-full h-full relative ">
        {/* annotation tools  */}
        {annotations[selectedTime] && annotations[selectedTime].length > 0 && (
          <div
            className="absolute z-[101] bottom-[200px]  left-[16px]   w-fit h-fit bg-black/20 radius p-2  flex items-center gap-2 cursor-pointer"
            onClick={handleDeleteAll}
          >
            <span className="text-white text-xs">Remove All Annotations</span>
            <span className="">
              <MdDelete
                className="text-[3xl] cursor-pointer shrink-0"
                size={40}
              />
            </span>
          </div>
        )}
        {anotateable && (
          <div className="h-full absolute z-[101] top-[16px]  right-[16px]   ">
            <AnnotationSelectTools
              selectedTool={selectedTool}
              setSelectedTool={setSelectedTool}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              handleDeleteAll={handleDeleteAll}
            />
          </div>
        )}
        {/* annotation panel  */}
        <div
          className={`absolute z-[100] top-0 left-0 w-full h-full bg-black/20 `}
        >
          <Stage
            width={dimensions.width}
            height={dimensions.height}
            onMouseDown={anotateable ? handleMouseDown : undefined}
            onMouseMove={anotateable ? handleMouseMove : undefined}
            onMouseUp={anotateable ? handleMouseUp : undefined}
            style={{
              backgroundColor: "transparent",
              pointerEvents: anotateable ? "auto" : "none",
            }}
            onClick={(e) => {
              if (e.target === e.target.getStage()) {
                setSelectedShapeIndex(null);
              }
            }}
          >
            <Layer>
              {(annotations[selectedTime] || []).map((shape, idx) => {
                switch (shape.tool) {
                  case "rectangle":
                    return (
                      <>
                        <Rect
                          draggable
                          key={idx}
                          x={shape.x}
                          y={shape.y}
                          width={shape.width}
                          height={shape.height}
                          // stroke={selectedColor}
                          stroke={shape.color}
                          fill="rgba(255,0,0,0.1)"
                          onClick={(e) => {
                            e.cancelBubble = true;
                            setSelectedShapeIndex(idx);
                          }}
                          // onClick={() => handleDelete(idx)}
                          onDragEnd={(e) => {
                            const updatedShapes = [
                              ...(annotations[selectedTime] || []),
                            ];
                            updatedShapes[idx] = {
                              ...shape,
                              x: e.target.x(),
                              y: e.target.y(),
                            };
                            setAnnotations({
                              ...annotations,
                              [selectedTime]: updatedShapes,
                            });
                          }}
                        />

                        {selectedShapeIndex === idx && (
                          <>
                            {/* <Text
                              text={shape.label || "No label"}
                              x={shape.x}
                              y={shape.y - 20}
                              fontSize={14}
                              fill="#fff"
                            /> */}

                            <Rect
                              x={shape.x}
                              y={shape.y}
                              width={shape.width}
                              height={shape.height}
                              stroke="white"
                              strokeWidth={2}
                              // dash={[4, 4]}
                              listening={false} // prevents this selection box from interfering with events
                            />
                            <Text
                              text="✕ Remove"
                              x={shape.x + shape.width}
                              y={shape.y - 20}
                              fontSize={14}
                              fill="white"
                              onClick={() => handleDelete(idx)}
                              cursor="pointer"
                            />
                          </>
                        )}
                      </>
                    );
                  case "circle":
                    const centerX = shape.x + shape.width / 2;
                    const centerY = shape.y + shape.height / 2;
                    const radius =
                      Math.min(Math.abs(shape.width), Math.abs(shape.height)) /
                      2;

                    return (
                      <React.Fragment key={idx}>
                        {/* Main circle */}
                        <Circle
                          draggable
                          x={centerX}
                          y={centerY}
                          radius={radius}
                          stroke={shape.color}
                          fill="rgba(0,255,0,0.1)"
                          onClick={(e) => {
                            e.cancelBubble = true;
                            setSelectedShapeIndex(idx);
                          }}
                          onDragEnd={(e) => {
                            const updatedShapes = [
                              ...(annotations[selectedTime] || []),
                            ];
                            updatedShapes[idx] = {
                              ...shape,
                              x: e.target.x() - shape.width / 2,
                              y: e.target.y() - shape.height / 2,
                            };
                            setAnnotations({
                              ...annotations,
                              [selectedTime]: updatedShapes,
                            });
                          }}
                        />

                        {/* Selection ring */}
                        {selectedShapeIndex === idx && (
                          <>
                            <Circle
                              x={centerX}
                              y={centerY}
                              radius={radius}
                              stroke="white"
                              strokeWidth={4}
                              // dash={[4, 4]}
                              listening={false}
                            />
                            <Text
                              text="✕ Remove"
                              x={centerX - 20}
                              y={shape.y - 20}
                              fontSize={14}
                              fill="white"
                              onClick={() => handleDelete(idx)}
                            />
                          </>
                        )}
                      </React.Fragment>
                    );

                  case "triangle":
                    return (
                      <>
                        <RegularPolygon
                          draggable
                          key={idx}
                          x={shape.x + shape.width / 2}
                          y={shape.y + shape.height / 2}
                          sides={3}
                          radius={
                            Math.max(
                              Math.abs(shape.width),
                              Math.abs(shape.height)
                            ) / 2
                          }
                          stroke={shape.color}
                          // stroke={selectedColor}
                          fill="rgba(255,165,0,0.1)"
                          onClick={() => setSelectedShapeIndex(idx)}
                          onDragEnd={(e) => {
                            const updatedShapes = [
                              ...(annotations[selectedTime] || []),
                            ];
                            updatedShapes[idx] = {
                              ...shape,
                              x: e.target.x(),
                              y: e.target.y(),
                            };
                            setAnnotations({
                              ...annotations,
                              [selectedTime]: updatedShapes,
                            });
                          }}
                        />
                        {selectedShapeIndex === idx && (
                          <>
                            <RegularPolygon
                              x={shape.x + shape.width / 2}
                              y={shape.y + shape.height / 2}
                              sides={3}
                              radius={
                                Math.max(
                                  Math.abs(shape.width),
                                  Math.abs(shape.height)
                                ) / 2
                              }
                              stroke="white"
                              strokeWidth={2}
                              // dash={[4, 4]}
                              listening={false} // prevents this selection box from interfering with events
                            />
                            <Text
                              text="✕ Remove"
                              x={shape.x + shape.width / 2 - 20}
                              y={shape.y - 20}
                              fontSize={14}
                              fill="white"
                              onClick={() => handleDelete(idx)}
                            />
                          </>
                        )}
                      </>
                    );
                  case "pen":
                    return (
                      <>
                        <Line
                          key={idx}
                          points={shape.points}
                          stroke={shape.color}
                          strokeWidth={10}
                          lineCap="round"
                          tension={0.5}
                          draggable
                          onClick={() => setSelectedShapeIndex(idx)}
                          onDragEnd={(e) => {
                            const node = e.target;
                            const dx = node.x();
                            const dy = node.y();

                            const newPoints = shape.points.map((val, i) =>
                              i % 2 === 0 ? val + dx : val + dy
                            );

                            const updatedShapes = [
                              ...(annotations[selectedTime] || []),
                            ];
                            updatedShapes[idx] = {
                              ...shape,
                              points: newPoints,
                            };

                            setAnnotations({
                              ...annotations,
                              [selectedTime]: updatedShapes,
                            });

                            // Reset node position so it doesn’t apply transform + point offset
                            node.position({ x: 0, y: 0 });
                          }}
                        />
                        {shape.points.length >= 2 && (
                          <>
                            {selectedShapeIndex === idx && (
                              <>
                                <Line
                                  key={idx}
                                  points={shape.points}
                                  stroke="white"
                                  strokeWidth={10}
                                  lineCap="round"
                                  tension={0.5}
                                  listening={false} // prevents this selection box from interfering with events
                                />
                                <Text
                                  text="✕ Remove"
                                  x={shape.points[0] + 20}
                                  y={shape.points[1] - 20}
                                  fontSize={14}
                                  fill="white"
                                  onClick={() => handleDelete(idx)}
                                  cursor="pointer"
                                />
                              </>
                            )}
                          </>
                        )}
                      </>
                    );

                  default:
                    return null;
                }
              })}

              {/* Live Preview While Drawing */}
              {newShape &&
                selectedTool !== "pen" &&
                selectedTool === "rectangle" && (
                  <Rect
                    x={newShape.x}
                    y={newShape.y}
                    width={newShape.width}
                    height={newShape.height}
                    stroke={selectedColor}
                    dash={[4, 4]}
                    fill="rgba(0,0,255,0.1)"
                  />
                )}

              {newShape && selectedTool === "circle" && (
                <Circle
                  x={newShape.x + newShape.width / 2}
                  y={newShape.y + newShape.height / 2}
                  radius={
                    Math.min(
                      Math.abs(newShape.width),
                      Math.abs(newShape.height)
                    ) / 2
                  }
                  stroke={selectedColor}
                  dash={[4, 4]}
                  fill="rgba(0,255,0,0.1)"
                />
              )}

              {newShape && selectedTool === "triangle" && (
                <RegularPolygon
                  x={newShape.x + newShape.width / 2}
                  y={newShape.y + newShape.height / 2}
                  sides={3}
                  radius={
                    Math.max(
                      Math.abs(newShape.width),
                      Math.abs(newShape.height)
                    ) / 2
                  }
                  stroke={selectedColor}
                  dash={[4, 4]}
                  fill="rgba(255,165,0,0.1)"
                />
              )}

              {newShape && selectedTool === "pen" && (
                <Line
                  points={newShape.points}
                  stroke={selectedColor}
                  strokeWidth={2}
                  lineCap="round"
                  tension={0.5}
                  dash={[5, 5]}
                />
              )}
            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  );
};

export default AnnotationCanvas;
