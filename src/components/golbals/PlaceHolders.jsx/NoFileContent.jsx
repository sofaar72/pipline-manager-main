import Lottie from "lottie-react";
import React from "react";
// import animationData from "../../../assets/lotties/Searching.json";
import animationData from "../../../assets/lotties/Suci_the_Ghost.json";

const NoFileContent = () => {
  return (
    <div className="w-full h-full flex-1  flex radius items-center justify-center bg-gray-500/50 overflow-hidden">
      <Lottie
        className="w-[100%] h-[100%] animate-pulse "
        animationData={animationData}
        loop={true}
      />
    </div>
  );
};

export default NoFileContent;
