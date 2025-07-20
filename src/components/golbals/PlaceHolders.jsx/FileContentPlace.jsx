import React from "react";

const FileContentPlace = () => {
  return (
    <div className="w-full h-full flex flex-col gap-[25px] sec-padd animate-pulse">
      <div className="w-full h-[210px] bg-gray-500/50 radius animate-pulse"></div>
      <div className="w-full h-full flex-1 flex justify-between radius bg-gray-500/50 animate-pulse"></div>
    </div>
  );
};

export default FileContentPlace;
