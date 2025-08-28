import React, { useEffect, useState } from "react";
import { FaEraser, FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa6";
import { IoMdRefresh } from "react-icons/io";
import { MdAirlineStops } from "react-icons/md";
import { IoMusicalNote, IoVolumeMediumSharp } from "react-icons/io5";
import { IoVolumeMute } from "react-icons/io5";
import { MdCompare } from "react-icons/md";
import { MdFullscreen } from "react-icons/md";
import { FaPenAlt } from "react-icons/fa";
import { BsChatText } from "react-icons/bs";
import { BsEraserFill } from "react-icons/bs";
import TheIcon from "../../TheIcon";

const TheToolbar = ({
  //   tool,
  //   setTool,
  isLoope,
  isMuted,
  isPlaying,
  pauseOrPlay,
  muteOrNot,
  loopOrNot,

  drawing,
  toggleDrawing,
  eraising,
  toggleEraising,
  //   toggleFullscreen,
  //   mode,
  //   setMode,
  //   strokeColor,
  //   setStrokeColor,
  //   setSelectedIds,
}) => {
  //   const colors = ["red", "blue", "green", "white"];
  //   const [openColor, setOpenColor] = useState(false);

  //   const setTheStroke = (color) => {
  //     setStrokeColor(color);
  //     setOpenColor(!openColor);
  //   };

  useEffect(() => {
    console.log(drawing);
  }, [drawing]);

  return (
    <div className="w-full h-[25px] shrink-0 bg-[#1D1B37] flex justify-between gap-2 text-white">
      {/* Video Tools  */}
      <div className="w-fit h-full flex items-center gap-0 text-sm lg-regular">
        <TheIcon
          onClick={() => pauseOrPlay()}
          cClass={`!w-[30px] !h-full shrink-0 !border-none !bg-[var(--overview-color-two)] hover:!bg-[var(--overview-color-three)] !rounded-none`}
        >
          {!isPlaying ? <FaPlay /> : <FaPause />}
        </TheIcon>
        <TheIcon
          onClick={() => loopOrNot()}
          cClass={`!w-[30px] !h-full shrink-0 !border-none !bg-[var(--overview-color-two)] hover:!bg-[var(--overview-color-three)] !rounded-none`}
        >
          {!isLoope ? <MdAirlineStops /> : <IoMdRefresh />}
        </TheIcon>
        <TheIcon
          onClick={() => muteOrNot()}
          cClass={`!w-[30px] !h-full shrink-0 !border-none !bg-[var(--overview-color-two)] hover:!bg-[var(--overview-color-three)] !rounded-none`}
        >
          {!isMuted ? <IoVolumeMediumSharp /> : <IoVolumeMute />}
        </TheIcon>
      </div>
      {/* annotate handlers  */}
      <div className="w-fit h-full flex items-center gap-0 text-sm lg-regular">
        {/* draw  */}
        <TheIcon
          onClick={() => toggleDrawing()}
          cClass={`!w-[30px] !h-full shrink-0 !border-none ${
            drawing
              ? "!bg-[var(--overview-color-three)]"
              : "!bg-[var(--overview-color-two)] "
          } !hover:!bg-[var(--overview-color-three)] !rounded-none`}
        >
          <FaPenAlt className="text-sm" />
        </TheIcon>

        {/* <button
          onClick={() => {
            const newMode = mode === "draw" ? "drag" : "draw";
            setMode(newMode);
            if (newMode === "draw") {
              setSelectedIds([]);
            }
          }}
          className="p-2 flex items-center justify-center text-white bg-[#7341E6]/20 w-[40px] h-full cursor-pointer hover:bg-[#7341E6]/30 transition"
        >
          {mode === "draw" ? <FaPenAlt /> : <FaEraser />}
        </button> */}
      </div>

      {/* other tools  */}
      {/* <div className="w-fit  flex items-center gap-0 text-sm">

        <div
          className={`${
            openColor ? "w-[100px] opacity-100" : "w-0 opacity-0"
          }  h-full  bg-[var(--modeling)]/50 transition flex gap-2 items-center justify-between p-2 overflow-hidden`}
        >
          {colors.map((color) => {
            return (
              <>
                {color === "red" && (
                  <div
                    className="w-[20px] h-[20px] bg-red-500 rounded-full overflow-hidden shrink-0 cursor-pointer"
                    onClick={() => setTheStroke("red")}
                  ></div>
                )}
                {color === "blue" && (
                  <div
                    className="w-[20px] h-[20px] bg-blue-500 rounded-full overflow-hidden shrink-0 cursor-pointer"
                    onClick={() => setTheStroke("blue")}
                  ></div>
                )}
                {color === "green" && (
                  <div
                    className="w-[20px] h-[20px] bg-green-500 rounded-full overflow-hidden shrink-0 cursor-pointer"
                    onClick={() => setTheStroke("green")}
                  ></div>
                )}
                {color === "white" && (
                  <div
                    className="w-[20px] h-[20px] bg-white-500 rounded-full overflow-hidden shrink-0 cursor-pointer"
                    onClick={() => setTheStroke("white")}
                  ></div>
                )}
              </>
            );
          })}
        </div>
        <button
          onClick={() => {
            setOpenColor(!openColor);
          }}
          className="p-2 flex items-center justify-center text-white bg-[#7341E6]/20 w-[40px] h-full cursor-pointer hover:bg-[#7341E6]/30 transition"
        >
          <div className="w-[20px] h-[20px]">
            {strokeColor === "red" && (
              <div className="w-full h-full bg-red-500 rounded-full overflow-hidden"></div>
            )}
            {strokeColor === "blue" && (
              <div className="w-full h-full bg-blue-500 rounded-full overflow-hidden"></div>
            )}
            {strokeColor === "green" && (
              <div className="w-full h-full bg-green-500 rounded-full overflow-hidden"></div>
            )}
            {strokeColor === "white" && (
              <div className="w-full h-full bg-white-500 rounded-full overflow-hidden"></div>
            )}
          </div>
        </button>

      

        <button
          onClick={() => toggleFullscreen()}
          className="p-2 flex items-center justify-center text-white bg-[#7341E6]/20 w-[40px] h-full cursor-pointer hover:bg-[#7341E6]/30 transition"
        >
          <MdFullscreen />
        </button>

        <button
        onClick={() => setTool("pen")}
        style={{ fontWeight: tool === "pen" ? "bold" : "normal" }}
      >
        Pen
      </button>
      <button
        onClick={() => setTool("rect")}
        style={{ fontWeight: tool === "rect" ? "bold" : "normal" }}
      >
        Rect
      </button>
      </div> */}
    </div>
  );
};

export default TheToolbar;
