import React, { useEffect, useState } from "react";
import DropDownModal from "../taskmanager/DropDownModal";
import DropDownModalTwo from "../taskmanager/DropDownModalTwo";

const TheGlobalDropDown = ({ selected, items, setItems }) => {
  const [dropdown, setDropdown] = useState(false);
  return (
    <div className="w-full h-[42px] bg-transparent relative  z-[20]">
      <div
        className="w-full h-full flex items-center justify-between gap-2 cursor-pointer"
        onClick={() => setDropdown(!dropdown)}
      >
        <span className="text-sm font-[300] text-white/70">{selected}</span>
        <img
          className={`transition ${dropdown ? "rotate-180" : "rotate-0"}`}
          src="/icons/Arrow Down.svg"
          alt=""
        />
      </div>
      {/* bottom border  */}
      <div className="w-full h-[1px] line-grad bottom-0 absolute"></div>

      {/* user assign modal  */}
      <DropDownModalTwo
        openDropDown={dropdown}
        closeDropDown={setDropdown}
        items={items}
        setItems={setItems}
        selectedType={selected}
      ></DropDownModalTwo>
    </div>
  );
};

export default TheGlobalDropDown;
