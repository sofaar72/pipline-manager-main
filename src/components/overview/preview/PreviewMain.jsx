import React, { useState } from "react";
import PreviewAddress from "./PreviewAddress";
import PreviewVideoWrapper from "./PreviewVideoWrapper";
import PreviewFilesAndComments from "./PreviewFilesAndComments";

const PreviewMain = ({ addressbar, previewWidth, stopResizing }) => {
  const [switcher, setSwitcher] = useState("comment");
  return (
    <div
      className="w-full h-full flex flex-col gap-[10px] p-[10px] shrink-0"
      onClick={(e) => {
        e.stopPropagation();
        // stopResizing();
      }}
    >
      <PreviewAddress addressbar={addressbar} />
      <PreviewVideoWrapper
        switcher={switcher}
        setSwitcher={setSwitcher}
        previewWidth={previewWidth}
      />
      <PreviewFilesAndComments switcher={switcher} setSwitcher={setSwitcher} />
    </div>
  );
};

export default PreviewMain;
