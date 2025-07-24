import React from "react";
import { FiZoomIn, FiZoomOut } from "react-icons/fi";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import { MdBackHand } from "react-icons/md";

const VideoTools = ({ goToPrevThumbnail, goToNextThumbnail }) => {
  return (
    <div className="absolute z-[30] bottom-[calc(0px+80px)] left-0 w-full h-[50px] bg-black/50  backdrop-blur-lg p-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {/* <span className="text-white text-md">00:00</span> */}
        <div className="flex items-center gap-2">
          <HiOutlineArrowNarrowLeft
            className="text-white text-2xl cursor-pointer hover:text-gray-400/90 transition"
            onClick={goToPrevThumbnail}
          />
        </div>
        <div className="flex items-center gap-2">
          <HiOutlineArrowNarrowRight
            className="text-white text-2xl cursor-pointer hover:text-gray-400/90 transition"
            onClick={goToNextThumbnail}
          />
        </div>
      </div>

      {/* tools part  */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <MdBackHand className="text-white text-md cursor-pointer hover:text-gray-400/90 transition" />
        </div>
        <div className="flex items-center gap-2">
          <FiZoomIn className="text-white text-md cursor-pointer hover:text-gray-400/90 transition" />
        </div>
        <div className="flex items-center gap-2">
          <FiZoomOut className="text-white text-md cursor-pointer hover:text-gray-400/90 transition" />
        </div>
      </div>
    </div>
  );
};

export default VideoTools;
