import React, { useState } from "react";
import { IoCheckbox } from "react-icons/io5";
import { MdCheckBoxOutlineBlank } from "react-icons/md";

const CheckBoxItem = ({ label = "text", isChecked = true }) => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <span className="text-lg" onClick={() => setChecked(!checked)}>
        {checked ? <IoCheckbox /> : <MdCheckBoxOutlineBlank />}
      </span>
      <label
        for="hs-default-checkbox"
        className="text-sm text-white h-lg  dark:text-neutral-400"
      >
        {label}
      </label>
    </div>
  );
};

export default CheckBoxItem;
