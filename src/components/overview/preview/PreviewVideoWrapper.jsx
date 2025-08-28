import React, { useState } from "react";
import TheButton from "../TheButton";
import { MdOutlineArrowDropDown } from "react-icons/md";
import TheDropDown from "../TheDropDown";
import TheIcon from "../TheIcon";
import { FaPlus } from "react-icons/fa";
import VideoPreview from "./Annotations/TheVideo";
import TheAnnotationWrapper from "./Annotations/TheAnnotationWrapper";

const PreviewVideoWrapper = ({ switcher, setSwitcher, previewWidth }) => {
  return (
    <div
      className={`w-full ${
        previewWidth >= 550 ? "h-[400px]" : "h-[300px]"
      }  radius bg-[var(--overview-color-two)]/50 text-white h-lg flex flex-col gap-[10px] p-2  shrink-0`}
    >
      {/* header part  */}
      <div className=" w-full h-[40px] flex items-center gap-2 justify-between">
        {/* variations  */}
        <div className="flex items-center gap-1">
          <TheDropDown
            cClass="!bg-[var(--overview-color-three)]"
            init={"Versions"}
            items={[
              { id: 1, name: "one" },
              { id: 2, name: "two" },
              { id: 3, name: "three" },
            ]}
            width={"w-[100px]"}
          />

          <TheIcon cClass=" !border-none" onClick={() => {}}>
            <FaPlus />
          </TheIcon>
        </div>
        <div className="flex items-center gap-2">
          <TheButton
            cClass={`flex items-center justify-between gap-2 h-regular ${
              switcher === "file" && "!bg-[var(--overview-color-three)]"
            }`}
            onClick={() => {
              setSwitcher("file");
            }}
          >
            <span>Files</span>
          </TheButton>
          <TheButton
            cClass={`flex items-center justify-between gap-2 h-regular  ${
              switcher === "comment" && "!bg-[var(--overview-color-three)]"
            }`}
            onClick={() => {
              setSwitcher("comment");
            }}
          >
            <span>Comments</span>
          </TheButton>
        </div>
      </div>

      {/* the video and annotations stage  */}
      <TheAnnotationWrapper previewWidth={previewWidth} />
    </div>
  );
};

export default PreviewVideoWrapper;
