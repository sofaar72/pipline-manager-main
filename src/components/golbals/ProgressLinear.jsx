import React, { useEffect, useState } from "react";

const ProgressLinear = ({ color = "#0dd750", height = 10 }) => {
  const [progress, setProgress] = useState(45);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setProgress(progress + 1);
  //     if (progress >= 100) {
  //       clearInterval(interval);
  //       setProgress(0);
  //     }
  //   }, 100);
  //   return () => clearInterval(interval);
  // }, [progress]);

  return (
    <>
      <div className="flex flex-col gap-1 items-end h-fit w-full">
        <div className="w-full flex items-center gap-2 justify-between">
          <span className="text-[10px] font-[300] text-white">Progress</span>
          <span className="text-[10px] font-[300] text-white">{progress}%</span>
        </div>

        <div
          className="w-full  rounded-full h-[10px] bg-[#DBDBF8]"
          style={{ height: `${height}px` }}
        >
          <div
            className=" h-full rounded-full"
            style={{ width: `${progress}%`, backgroundColor: color }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default ProgressLinear;
