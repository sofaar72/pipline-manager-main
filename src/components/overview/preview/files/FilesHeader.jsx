import { Checkbox } from "@headlessui/react";
import React from "react";
import CheckBoxItem from "../../../golbals/CheckBoxItem";
import TheButton from "../../TheButton";

const FilesHeader = ({ setOpen }) => {
  return (
    <div className="w-full flex items- justify-between bg-[var(--overview-color-two)] text-white h-[25px]">
      {/* filters  */}
      <div className="flex items-center gap-8">
        <CheckBoxItem label="All" isChecked={true} />
        <CheckBoxItem label="Exports" />
        <CheckBoxItem label="Dependencies" />
      </div>
      <div className="flex items-center gap-8">
        <TheButton
          cClass="flex items-center justify-between gap-2 h-regular !p-2 !bg-[var(--overview-color-three)] hover:!bg-[var(--overview-color-four)] !h-full"
          onClick={(e) => {
            e.preventDefault();

            setOpen(true);
          }}
        >
          <span>Add</span>
          <span>+</span>
        </TheButton>
      </div>
    </div>
  );
};

export default FilesHeader;
