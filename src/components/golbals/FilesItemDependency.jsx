import React from "react";

const FilesItemDependency = ({ file }) => {
  return (
    <a
      href={file?.download_url}
      download={file?.download_url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full radius h-[60px] flex gap-[15px] file-bg-2  px-[4px] py-[4px] cursor-pointer transition-2 relative border border-white/20"
    >
      <div className="w-[15px] h-[15px] radius ">
        <img
          className="w-full h-full object-contain"
          src="/icons/File.svg"
          alt=""
        />
      </div>

      {/* text part  */}
      <div className="w-full h-full flex flex-col gap-0 justify-between text-[10px]">
        <div className="flex gap-2 items-center">
          <span className=""> File Name</span>
          <span className=""> {file?.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="">Size</span>
          <span className="">{file?.size} mb</span>
        </div>
        <div className="w-full flex items-center justify-end gap-2">
          <span className="">Download</span>
          <img
            className="w-[15px] h-[15px] flex items-center justify-center"
            src="/icons/Download.svg"
            alt=""
          />
        </div>
      </div>
    </a>
  );
};

export default FilesItemDependency;
