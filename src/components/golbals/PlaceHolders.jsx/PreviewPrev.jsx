import React from "react";

const PreviewPrev = () => {
  return (
    <div className="w-full h-full flex items-center justify-center gap-[20px]">
      <div className="w-full flex-1 h-full flex flex-col justtify-between gap-[20px]">
        {/* adress part  */}
        <div className="w-full h-[40px] bg-gray-500/50 animate-pulse radius"></div>
        {/* preview part  */}
        <div className="w-full h-[740px] bg-gray-500/50 animate-pulse radius"></div>
        {/* comment part  */}
        <div className="w-full h-[115px] bg-gray-500/50 animate-pulse radius"></div>
      </div>
      <div className="w-[357px] h-full bg-gray-500/50 animate-pulse radius"></div>
    </div>
  );
};

export default PreviewPrev;
