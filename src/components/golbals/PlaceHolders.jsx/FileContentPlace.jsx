import React from "react";
import Lottie from "lottie-react";
import animationData from "../../../assets/lotties/Searching.json";

const FileContentPlace = () => {
  return (
    <div className="w-full h-full flex flex-col gap-[25px] sec-padd animate-pulse">
      <div className="w-full h-[160px] shrink-0 bg-gray-500/50 radius animate-pulse"></div>
      <div className="w-full h-full flex-1 flex justify-between radius bg-gray-500/50 animate-pulse">
        {/* <Lottie
          className="w-[100%] h-[100%] animate-pulse"
          animationData={animationData}
          loop={true}
        /> */}
      </div>
    </div>
  );
};

export default FileContentPlace;
