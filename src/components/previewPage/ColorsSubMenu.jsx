import React from "react";
import { FaPen } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { IoTriangleOutline } from "react-icons/io5";
import { RiRectangleLine } from "react-icons/ri";

const ColorsSubMenu = ({
  colors,
  selectColor,
  isOpenColorMenu,
  setIsOpenColorMenu,
}) => {
  const selectTheColor = (e, color) => {
    e.stopPropagation();
    e.preventDefault();
    selectColor(color);
    setIsOpenColorMenu(false);
  };

  return (
    <div
      className={`w-fit px-2 py-4 gap-2 transition-all duration-300 radius h-full absolute z-[100] top-1/2 translate-y-[-50%] right-[calc(100%+12px)] bg-black/20 flex items-center justify-between ${
        isOpenColorMenu ? "opacity-100 " : "opacity-0 pointer-events-none"
      }`}
    >
      {colors?.map((color) => (
        <button
          key={color}
          onClick={(e) => selectTheColor(e, color)}
          className="cursor-pointer"
        >
          <div
            className="w-[20px] h-[20px] rounded-full"
            style={{ backgroundColor: color }}
          ></div>
        </button>
      ))}
    </div>
  );
};

export default ColorsSubMenu;
