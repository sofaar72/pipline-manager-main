import React, { useEffect } from "react";
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
import { useStage } from "../../../hooks/annotationHooks/useStage";

export default function VideoToolbar({
  tool,
  setTool,
  previewName = "preview name",
  version = "V1",
  isLoope,
  isMuted,
  isPlaying,
  pauseOrPlay,
  muteOrNot,
  loopOrNot,
  toggleFullscreen,
  mode,
  setMode,
  setSelectedIds,
}) {
  return (
    <div className="w-full h-[40px] shrink-0 bg-[#1D1B37] flex justify-between gap-2 text-white">
      {/* NAME & VERSION  */}
      <div className="w-fit  flex items-center gap-0 text-sm">
        <div className="p-2 flex items-center text-white bg-[#462691] h-full">
          {previewName}
        </div>
        <div className="p-2 flex items-center justify-center text-white bg-[#7341E6] w-[40px] h-full">
          {version}
        </div>
        <button
          onClick={() => pauseOrPlay()}
          className="p-2 flex items-center justify-center text-white bg-[#7341E6]/20 w-[40px] h-full cursor-pointer hover:bg-[#7341E6]/30 transition"
        >
          {!isPlaying ? <FaPlay /> : <FaPause />}
        </button>
        <button
          onClick={() => loopOrNot()}
          className="p-2 flex items-center justify-center text-white bg-[#7341E6]/20 w-[40px] h-full cursor-pointer hover:bg-[#7341E6]/30 transition"
        >
          {!isLoope ? <MdAirlineStops /> : <IoMdRefresh />}
        </button>
        <button
          onClick={() => muteOrNot()}
          className="p-2 flex items-center justify-center text-white bg-[#7341E6]/20 w-[40px] h-full cursor-pointer hover:bg-[#7341E6]/30 transition"
        >
          {!isMuted ? <IoVolumeMediumSharp /> : <IoVolumeMute />}
        </button>
      </div>

      {/* other tools  */}
      <div className="w-fit  flex items-center gap-0 text-sm">
        <button
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
        </button>
        <button
          onClick={() => toggleFullscreen()}
          className="p-2 flex items-center justify-center text-white bg-[#7341E6]/20 w-[40px] h-full cursor-pointer hover:bg-[#7341E6]/30 transition"
        >
          <MdFullscreen />
        </button>

        {/* <button
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
      </button> */}
      </div>
    </div>
  );
}
