import React from "react";

const TheFrames = ({
  frames,
  onSelectFrame,
  currentFrameIndex,
  annotations,
  frameBoxRef,
  handleMouseDownDrag,
  handleMouseMoveDrag,
  handleMouseUpDrag,
  type,
}) => {
  if (type === "Video") {
    return (
      <div
        className="w-full h-[15px] flex gap-0 shrink-0 bg-[var(--overview-color-one)]"
        ref={frameBoxRef}
        onMouseDown={handleMouseDownDrag}
        onMouseMove={handleMouseMoveDrag}
        onMouseLeave={handleMouseUpDrag}
        onMouseUp={handleMouseUpDrag}
      >
        {frames.map((f, i) => {
          // const isBeforeOrSelected = i <= selectedFrameIndex;
          const isSelected = i === currentFrameIndex;
          const hasAnnotation =
            annotations?.find((frame) => frame.frameId === i)?.shapes.length >
            0;
          const isBeforeSelected = i < currentFrameIndex;

          let background = "";
          if (isSelected) background = "var(--overview-color-progress)";
          else if (hasAnnotation) background = "var(--overview-color-faild)";
          else if (isBeforeSelected) background = "var(--overview-color-done)";
          else
            background =
              i % 2 === 1
                ? "var(--overview-color-three)"
                : "var(--overview-color-four)";

          return (
            <div
              key={i}
              className="flex-1 h-full cursor-pointer"
              onMouseDown={() => onSelectFrame(i)}
              // onMouseDown={() => {
              //   // setIsDragging(true);
              //   // handleSeek(i);
              //   // pauseTheVideo();
              // }}
              onMouseEnter={() => {
                // if (isDragging) handleSeek(i);
              }}
              onMouseUp={() => {
                // setIsDragging(false)
              }}
              style={{
                background,
              }}
            ></div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="w-full h-[15px] flex gap-0 shrink-0 bg-[var(--overview-color-one)]"></div>
    );
  }
};

export default TheFrames;
