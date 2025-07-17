import React from "react";

const TabItem = ({ children }) => {
  return (
    <div className="w-full h-full  flex-1  flex justify-between gap-[15px] ">
      {children}
    </div>
  );
};

export default TabItem;
