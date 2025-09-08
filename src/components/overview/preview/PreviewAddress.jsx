import React from "react";
import { IoIosClose } from "react-icons/io";

const PreviewAddress = ({ addressbar, hidePrev }) => {
  return (
    <div className="w-full h-[40px] radius bg-[var(--overview-color-two)] text-white h-lg flex items-center p-2 shrink-0 flex justify-between">
      <div>{addressbar}</div>
    </div>
  );
};

export default PreviewAddress;
