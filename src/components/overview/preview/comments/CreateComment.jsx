import React from "react";
import { IoIosAttach } from "react-icons/io";
import { MdOutlineSend } from "react-icons/md";
import TheIcon from "../../TheIcon";
import TheButton from "../../TheButton";

const CreateComment = () => {
  return (
    <div className="w-full radius bg-[var(--overview-color-three)]/50  flex flex-col gap-2 relative">
      {/* cm send input  */}
      <div className="w-full flex items-center justify-between p-2">
        <input
          className="h-regular text-white/80 placeholder:text-white/80 w-full "
          type="text"
          placeholder="Leave a comment ..."
        />
        {/* attach  */}
        <TheIcon cClass="border-none !bg-[var(--overview-color-three)] hover:!bg-[var(--overview-color-four)] !h-[25px] !w-[25px]">
          <IoIosAttach />
        </TheIcon>
      </div>
      <div className="w-full flex items-center justify-between p-2">
        <TheButton
          cClass="flex items-center justify-between gap-2 h-regular !p-2 !bg-[var(--overview-color-three)] hover:!bg-[var(--overview-color-four)] !h-full"
          onClick={() => {}}
        >
          <span>Status</span>
        </TheButton>
        <TheIcon cClass="border-none !bg-[var(--overview-color-three)] !h-[25px] !w-[25px] hover:!bg-[var(--overview-color-four)]">
          <MdOutlineSend />
        </TheIcon>
      </div>
    </div>
  );
};

export default CreateComment;
