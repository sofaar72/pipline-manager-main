import React from "react";

const PreviewAddress = ({ addressbar }) => {
  return (
    <div className="w-full h-[40px] radius bg-[var(--overview-color-two)] text-white h-lg flex items-center p-2 shrink-0">
      {addressbar}
    </div>
  );
};

export default PreviewAddress;
