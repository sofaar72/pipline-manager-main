import React from "react";
import { MdDelete } from "react-icons/md";
import { IoIosRefresh } from "react-icons/io";

const UploadedItem = ({ name, size, del = () => {} }) => {
  return (
    <div className="w-full flex flex-col gap-2 cursor-pointer">
      {/* file itself  */}
      <div className="w-full h-[40px] radius bg-[var(--overview-color-three)] transition hover:bg-[var(--overview-color-four)] px-2 py-1 flex gap-2 justify-between h-small items-center">
        <div className="flex flex-col h-full gap-1 justify-between items-start">
          <span>{name}</span>
          <span>{size}</span>
        </div>
        <span onClick={del}>
          <MdDelete className="h-lg" />
        </span>
      </div>
      {/* preview part  */}
      <div className="w-full flex flex-col gap-1">
        <div className="w-full flex items-center gap-2 ">
          <div className="relative w-full h-[3px] rounded-full bg-[var(--overview-color-three)] overflow-hidden">
            <div className="absolute left-0 w-[90%] h-full bg-[var(--overview-color-done)]"></div>
          </div>
          <span className="h-small">90%</span>
        </div>
        <div className="w-full justify-between flex items-center gap-2 h-small">
          <span className="h-regular">
            <IoIosRefresh />
          </span>
          <span>in progress</span>
        </div>
      </div>
    </div>
  );
};

export default UploadedItem;
