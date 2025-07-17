import React from "react";

const DownloadButton = ({ click, size = "text-[10px]" }) => {
  return (
    <button
      className={`flex gap-2 items-center ${size} text-white cursor-pointer`}
      onClick={click}
    >
      {/* <span>Download</span> */}
      <img className="w-[18px] h-[18px]" src="/icons/Download.svg" alt="" />
    </button>
  );
};

export default DownloadButton;
