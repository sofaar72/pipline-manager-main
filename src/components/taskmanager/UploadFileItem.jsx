import React from "react";
import CdropDownNoBg from "../golbals/CdropDownNoBg";

const UploadFileItem = ({ index, removeUploadItem }) => {
  return (
    <div className="w-full h-[40px] flex justify-between gap-2 p-2 bg-[var(--primary-form-bg)] radius text-[10px] relative border border-white/40">
      <input
        className="absolute top-0 left-0 placeholder:text-white p-2 flex items-center h-full "
        type="text"
        placeholder="File Name ..."
      />

      <div className="flex gap-4 items-cente flex-1 w-full flex-1 justify-end">
        {/* select part  */}
        <CdropDownNoBg
          options={["Preview", "Export", "Resource"]}
          init="Select file Type"
          select={() => {}}
        ></CdropDownNoBg>

        {/* add file part  */}
        <button className="text-white text-[10px] flex items-center gap-1 cursor-pointer ">
          <span className="">Add</span>
          <img
            className="w-[20px] h-[20px] object-contain"
            src="/icons/Add.svg"
            alt=""
          />
        </button>
        {/* remove part  */}
        <button
          onClick={() => removeUploadItem(index)}
          className="text-white text-[10px] flex items-center gap-1 cursor-pointer "
        >
          <img
            className="w-[20px] h-[20px] object-contain hover:scale-110 transition-all duration-300 transition hover:bg-red-500 rounded-full p-[2px]"
            src="/icons/Delete.svg"
            alt=""
          />
          {/* <span className="text-red-500">Remove</span> */}
        </button>
      </div>
    </div>
  );
};

export default UploadFileItem;
