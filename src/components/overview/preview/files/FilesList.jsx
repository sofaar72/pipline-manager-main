import React from "react";
import FileItem from "./FileItem";
import FileDviderTitle from "./FileDviderTitle";

const FilesList = () => {
  return (
    <div className="flex flex-col h-[360px]">
      <div className="flex-1 overflow-y-scroll flex flex-col gap-2 pr-2 bg-[var(--overview-color-two)] text-white">
        <div className="w-full flex flex-col gap-[10px]">
          <FileDviderTitle title="Work Files" />
          <FileItem isMasterFile />
          <FileItem isPublishFile />
          <FileItem isWipFile />
        </div>
        <div className="w-full flex flex-col gap-[10px]">
          <FileDviderTitle title="Exports" />
          <FileItem />
          <FileItem />
          <FileItem />
          <FileItem />
        </div>
        <div className="w-full flex flex-col gap-[10px]">
          <FileDviderTitle title="Dependancies" />
          <FileItem />
          <FileItem />
          <FileItem />
          <FileItem />
        </div>
      </div>
    </div>
  );
};

export default FilesList;
