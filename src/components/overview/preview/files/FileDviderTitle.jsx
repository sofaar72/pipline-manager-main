import React from "react";

const FileDviderTitle = ({ title = "test title" }) => {
  return (
    <div className="w-full py-1 h-lg text-white  border-b border-[var(--overview-color-three)]">
      {title}
    </div>
  );
};

export default FileDviderTitle;
