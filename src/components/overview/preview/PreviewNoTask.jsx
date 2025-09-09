import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "../../../assets/lotties/Searching.json";

import TheButton from "../TheButton";

const PreviewNoTask = ({ openCreateTask }) => {
  return (
    <div className="w-full h-full radius bg-[var(--overview-color-one)] text-white h-xl flex items-center p-2 shrink-0 flex-col ">
      <div className="w-full flex flex-col gap-4">
        <span className="">There is no task here first Create one</span>

        {/* dvider  */}
        <div className="w-full bg-[var(--overview-color-four)]/50 h-[1px]"></div>
        <TheButton
          cClass="!bg-[var(--overview-color-done)]/80 hover:!bg-[var(--overview-color-done)] h-[50px]"
          onClick={openCreateTask}
        >
          Create Task
        </TheButton>
        <Lottie
          className="w-[100%] h-[100%] animate-pulse"
          animationData={animationData}
          loop={true}
        />
      </div>
    </div>
  );
};

export default PreviewNoTask;
