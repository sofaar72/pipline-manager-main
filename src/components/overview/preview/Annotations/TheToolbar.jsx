import React, { useEffect, useState } from "react";
import {
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaEraser,
  FaPlay,
} from "react-icons/fa6";
import { FaPause } from "react-icons/fa6";
import { IoMdRefresh } from "react-icons/io";
import {
  MdAirlineStops,
  MdOutlineRectangle,
  MdRectangle,
} from "react-icons/md";
import { IoMusicalNote, IoVolumeMediumSharp } from "react-icons/io5";
import { IoVolumeMute } from "react-icons/io5";
import { MdCompare } from "react-icons/md";
import { MdFullscreen } from "react-icons/md";
import { FaCircle, FaMousePointer, FaPenAlt } from "react-icons/fa";
import { BsChatText } from "react-icons/bs";
import { BsEraserFill } from "react-icons/bs";
import { FaLongArrowAltRight } from "react-icons/fa";
import TheIcon from "../../TheIcon";
import { BiSelection } from "react-icons/bi";
import { ACTIONS } from "./Actions";
import TheButton from "../../TheButton";
import { RiFullscreenLine } from "react-icons/ri";

const TheToolbar = ({
  isLoope,
  isMuted,
  isPlaying,
  pauseOrPlay,
  muteOrNot,
  loopOrNot,

  selecting,
  // new
  action,
  setAction,
  fillColor,
  setFillColor,
  isFullScreen,
  toggleFullscreen,
  previewWidth,
}) => {
  const [openShapes, setOpenShapes] = useState(false);

  useEffect(() => {
    console.log(isFullScreen);
  }, [isFullScreen]);

  useEffect(() => {
    if (previewWidth >= 550) {
      setAction(null);
    }
  }, [previewWidth]);

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
      {previewWidth >= 550 && (
        <div className="w-fit h-full flex items-center gap-0 text-sm lg-regular">
          <TheIcon
            onClick={() => setOpenShapes(!openShapes)}
            cClass={`!w-[30px] !h-full !bg-[var(--overview-color-two)] hover:!bg-[var(--overview-color-three)] !rounded-none !border-none
            ${
              action === ACTIONS.RECTANGLE ||
              action === ACTIONS.CIRCLE ||
              action === ACTIONS.ARROW
                ? "!bg-[var(--overview-color-three)]"
                : "!bg-[var(--overview-color-two)] "
            } 
            `}
          >
            {openShapes ? <FaChevronRight /> : <FaChevronLeft />}
          </TheIcon>

          <div
            className={`${
              openShapes ? "w-[90px]" : "w-0"
            } h-full flex  z-10 transition overflow-hidden`}
          >
            <TheIcon
              onClick={() => setAction(ACTIONS.RECTANGLE)}
              cClass={`!w-[30px] !h-full shrink-0 !border-none ${
                action === ACTIONS.RECTANGLE
                  ? "!bg-[var(--overview-color-three)]"
                  : "!bg-[var(--overview-color-two)] "
              } !hover:!bg-[var(--overview-color-three)] !rounded-none`}
            >
              <MdRectangle className="text-sm" />
            </TheIcon>
            <TheIcon
              onClick={() => setAction(ACTIONS.CIRCLE)}
              cClass={`!w-[30px] !h-full shrink-0 !border-none ${
                action === ACTIONS.CIRCLE
                  ? "!bg-[var(--overview-color-three)]"
                  : "!bg-[var(--overview-color-two)] "
              } !hover:!bg-[var(--overview-color-three)] !rounded-none`}
            >
              <FaCircle className="text-sm" />
            </TheIcon>
            <TheIcon
              onClick={() => setAction(ACTIONS.ARROW)}
              cClass={`!w-[30px] !h-full shrink-0 !border-none ${
                action === ACTIONS.ARROW
                  ? "!bg-[var(--overview-color-three)]"
                  : "!bg-[var(--overview-color-two)] "
              } !hover:!bg-[var(--overview-color-three)] !rounded-none`}
            >
              <FaLongArrowAltRight className="text-sm" />
            </TheIcon>
          </div>

          {/* draw  */}
          <TheIcon
            onClick={() => setAction(ACTIONS.LINE)}
            cClass={`!w-[30px] !h-full shrink-0 !border-none ${
              action === ACTIONS.LINE
                ? "!bg-[var(--overview-color-three)]"
                : "!bg-[var(--overview-color-two)] "
            } !hover:!bg-[var(--overview-color-three)] !rounded-none`}
          >
            <FaPenAlt className="text-sm" />
          </TheIcon>

          <TheIcon
            onClick={() => setAction(ACTIONS.SELECT)}
            cClass={`!w-[30px] !h-full shrink-0 !border-none ${
              action === ACTIONS.SELECT
                ? "!bg-[var(--overview-color-three)]"
                : "!bg-[var(--overview-color-two)] "
            } !hover:!bg-[var(--overview-color-three)] !rounded-none`}
          >
            <FaMousePointer className="text-sm" />
          </TheIcon>

          <TheButton cClass="!h-full !rounded-none !w-[35px] !p-0 ">
            <input
              className="w-full px-1 cursor-pointer"
              type="color"
              value={fillColor}
              onChange={(e) => setFillColor(e.target.value)}
            />
          </TheButton>

          <TheIcon
            onClick={() => toggleFullscreen()}
            cClass={`!w-[30px] !h-full shrink-0 !border-none ${
              isFullScreen
                ? "!bg-[var(--overview-color-three)]"
                : "!bg-[var(--overview-color-two)] "
            } hover:!bg-[var(--overview-color-three)] !rounded-none`}
          >
            <RiFullscreenLine />
          </TheIcon>
        </div>
      )}
    </div>
  );
};

export default TheToolbar;
