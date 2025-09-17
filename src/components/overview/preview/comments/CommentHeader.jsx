import { Checkbox } from "@headlessui/react";
import React from "react";
import CheckBoxItem from "../../../golbals/CheckBoxItem";
import TheButton from "../../TheButton";

const CommentHeader = () => {
  return (
    <div className="w-full flex items-center gap-2 bg-[var(--overview-color-two)] text-white h-[25px]">
      <CheckBoxItem label="All" />
      <CheckBoxItem label="Feedbacks" />
      {/* filters  */}
    </div>
  );
};

export default CommentHeader;
// <div className="flex items-center gap-8">
//   {/* <TheButton
//     cClass="flex items-center justify-between gap-2 h-regular !p-2 !bg-[var(--overview-color-three)] hover:!bg-[var(--overview-color-four)] !h-full"
//     onClick={() => {}}
//   >
//     <span>Add</span>
//     <span>+</span>
//   </TheButton> */}
// </div>
