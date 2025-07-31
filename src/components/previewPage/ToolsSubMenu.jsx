import React from "react";
import { FaPen } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { IoTriangleOutline } from "react-icons/io5";
import { RiRectangleLine } from "react-icons/ri";

const ToolsSubMenu = ({
  items,
  selectShape,
  isOpenShapeMenu,
  setIsOpenShapeMenu,
}) => {
  const selectToolShape = (e, shape) => {
    e.stopPropagation();
    e.preventDefault();
    selectShape(shape);
    setIsOpenShapeMenu(false);
  };

  return (
    <div
      className={`w-fit px-2 py-4 gap-2 transition-all duration-300 radius h-full absolute z-[100] top-1/2 translate-y-[-50%] right-[calc(100%+12px)] bg-black/20 flex items-center justify-between ${
        isOpenShapeMenu ? "opacity-100 " : "opacity-0 pointer-events-none"
      }`}
    >
      {items?.map((tool) => (
        <button
          key={tool}
          onClick={(e) => selectToolShape(e, tool)}
          className="cursor-pointer"
        >
          {tool === "rectangle" && <RiRectangleLine />}
          {tool === "circle" && <FaRegCircle />}
          {tool === "triangle" && <IoTriangleOutline />}
          {tool === "pen" && <FaPen />}
        </button>
      ))}
    </div>
  );
};

export default ToolsSubMenu;
