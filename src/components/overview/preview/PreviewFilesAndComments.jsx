import React from "react";

const PreviewFilesAndComments = ({ switcher, setSwitcher }) => {
  return (
    <div className="w-full flex-1 radius bg-[var(--overview-color-two)] text-white h-lg flex items-center p-2 justify-center shrink-0">
      {switcher === "file" ? "preview Files" : "preview Comments"}
    </div>
  );
};

export default PreviewFilesAndComments;
