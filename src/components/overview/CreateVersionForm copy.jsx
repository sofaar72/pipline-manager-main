import React from "react";
import CustomInput from "./CustomInput";
import { FaCloudUploadAlt } from "react-icons/fa";
import UploadedItem from "./preview/files/UploadedItem";
import TheButton from "./TheButton";
import TheIcon from "./TheIcon";

const CreateVersionForm = ({ header = "Create Version" }) => {
  return (
    <div
      className="w-[700px] h-fit px-[10px] py-[20px] radius bg-[var(--overview-color-one)] flex flex-col gap-2 justify-between transition"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-full border-b-1 border-[var(--overview-color-three)]/80 h-lg text-bold text-white flex py-2">
        {header}
      </div>

      {/* inputs  */}
      <div className="w-full flex flex-1 flex-col gap-4">
        {/* Task  */}
        <CustomInput label="Task" onChange={() => {}} type="text" />
        {/* Note  */}
        <CustomInput label="Note" onChange={() => {}} type="description" />

        {/* files wrappers  */}
        <div className="w-full h-full flex flex-col gap-2 text-white">
          <div className="w-full flex gap-2">
            <div className="w-1/3 p-2 radius flex items-center justify-between h-xl border-2 border-[var(--overview-color-three)] hover:bg-[var(--overview-color-three)] cursor-pointer transition">
              <span>Work file upload</span>
              <TheIcon cClass="!border-none !bg-[var(--overview-color-three)]">
                <FaCloudUploadAlt />
              </TheIcon>
            </div>
            <div className="w-2/3 p-2 radius flex items-center justify-between h-xl border-2 border-[var(--overview-color-three)] cursor-pointer transition">
              <UploadedItem name={"file name"} size={"2mb"} />
            </div>
          </div>
          <div className="w-full h-full flex gap-2 justify-between ">
            <div className="w-1/3 h-full flex flex-col gap-2 ">
              {/* preview title  */}
              <div className="h-small w-full h-[40px] p-2 flex items-center justify-between radius border-2 border-[var(--overview-color-three)] hover:bg-[var(--overview-color-three)] transition cursor-pointer">
                <span>Preview Files</span>
                <FaCloudUploadAlt className="text-lg" />
              </div>
              <div className="w-full flex-1 border-2 border-[var(--overview-color-three)] radius px-2 py-4 flex flex-col gap-2">
                <UploadedItem name={"file name"} size={"2mb"} />
                <UploadedItem name={"file name"} size={"2mb"} />
                <UploadedItem name={"file name"} size={"2mb"} />
                <UploadedItem name={"file name"} size={"2mb"} />
              </div>
            </div>
            <div className="w-1/3 h-full flex flex-col gap-2">
              {/* preview title  */}
              <div className="h-small w-full h-[40px] p-2 flex items-center justify-between radius border-2 border-[var(--overview-color-three)] hover:bg-[var(--overview-color-three)] transition cursor-pointer">
                <span>Preview Files</span>
                <FaCloudUploadAlt className="text-lg" />
              </div>
              <div className="w-full flex-1 border-2 border-[var(--overview-color-three)] radius px-2 py-4 flex flex-col gap-2">
                <UploadedItem name={"file name"} size={"2mb"} />
                <UploadedItem name={"file name"} size={"2mb"} />
                <UploadedItem name={"file name"} size={"2mb"} />
                <UploadedItem name={"file name"} size={"2mb"} />
              </div>
            </div>
            <div className="w-1/3 h-full flex flex-col gap-2">
              {/* preview title  */}
              <div className="h-small w-full h-[40px] p-2 flex items-center justify-between radius border-2 border-[var(--overview-color-three)] hover:bg-[var(--overview-color-three)] transition cursor-pointer">
                <span>Preview Files</span>
                <FaCloudUploadAlt className="text-lg" />
              </div>
              <div className="w-full flex-1 border-2 border-[var(--overview-color-three)] radius px-2 py-4 flex flex-col gap-2">
                <UploadedItem name={"file name"} size={"2mb"} />
                <UploadedItem name={"file name"} size={"2mb"} />
                <UploadedItem name={"file name"} size={"2mb"} />
                <UploadedItem name={"file name"} size={"2mb"} />
              </div>
            </div>
          </div>
          {/* actions  */}
          <div className="w-full flex justify-end gap-2">
            <TheButton
              cClass="flex items-center justify-between gap-2 h-regular !bg-[var(--overview-color-done)]"
              onClick={() => {}}
            >
              <span>Create</span>
            </TheButton>
            <TheButton
              cClass="flex items-center justify-between gap-2 h-regular "
              onClick={() => {}}
            >
              <span>Cancel</span>
            </TheButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateVersionForm;
