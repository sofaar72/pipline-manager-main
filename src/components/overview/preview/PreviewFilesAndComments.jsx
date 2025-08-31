import React from "react";
import CommentWrapper from "./comments/CommentWrapper";
import FilesWrapper from "./files/FilesWrapper";

const PreviewFilesAndComments = ({ switcher, setSwitcher }) => {
  return (
    <div className="w-full flex-1 radius bg-[var(--overview-color-two)] text-white h-lg flex items-center p-2 justify-center shrink-0">
      {switcher === "file" ? <FilesWrapper /> : <CommentWrapper />}
    </div>
  );
};

export default PreviewFilesAndComments;
