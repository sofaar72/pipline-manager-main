import React from "react";

import FilesHeader from "./FilesHeader";
import FilesList from "./FilesList";

const FilesWrapper = () => {
  return (
    <div className="w-full h-full flex-1 flex flex-col gap-[10px]">
      <FilesHeader />
      <FilesList />
    </div>
  );
};

export default FilesWrapper;
