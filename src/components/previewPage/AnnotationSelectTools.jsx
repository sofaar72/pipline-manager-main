import React, { useState } from "react";
import { MdFullscreen } from "react-icons/md";
import { IoDownloadOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { GoZoomIn } from "react-icons/go";
import { FaPen } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { IoTriangleOutline } from "react-icons/io5";
import { RiRectangleLine } from "react-icons/ri";
import { IoMdColorPalette } from "react-icons/io";
import { RiText } from "react-icons/ri";
import ToolsSubMenu from "./ToolsSubMenu";
import ColorsSubMenu from "./ColorsSubMenu";
import { MdDelete } from "react-icons/md";

const AnnotationSelectTools = ({
  selectedTool,
  setSelectedTool,
  selectedColor,
  setSelectedColor,
  handleDeleteAll,
}) => {
  const [isOpenShapeMenu, setIsOpenShapeMenu] = useState(false);
  const [selectedShape, setSelectedShape] = useState("pen");
  // const [selectedColor, setSelectedColor] = useState("red");
  const [isOpenColorMenu, setIsOpenColorMenu] = useState(false);
  const handleOpenShapeMenu = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpenShapeMenu(!isOpenShapeMenu);
  };

  const handleSelectShape = (shape) => {
    setSelectedShape(shape);
    setSelectedTool(shape);
  };
  const handleOpenColorMenu = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpenColorMenu(!isOpenColorMenu);
  };

  const handleSelecyColor = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className=" w-fit shrink-0 flex  gap-8 justify-between bg-[#2B284B]/40 radius backdrop-blur-2xl px-2 py-4 text-white">
      {/* resize  */}

      <span className="w-full h-fit flex items-center justify-center cursor-pointer ">
        <MdFullscreen
          className="text-[3xl] cursor-pointer shrink-0"
          size={20}
        />
      </span>
      {/* download  */}
      <span className="w-full h-fit flex items-center justify-center cursor-pointer ">
        <IoDownloadOutline
          className="text-[3xl] cursor-pointer shrink-0"
          size={20}
        />
      </span>
      {/* add  */}
      <span className="w-full h-fit flex items-center justify-center cursor-pointer ">
        <FaPlus className="text-[3xl] cursor-pointer shrink-0" size={20} />
      </span>
      {/* zoom  */}
      <span className="w-full h-fit flex items-center justify-center cursor-pointer ">
        <GoZoomIn className="text-[3xl] cursor-pointer shrink-0" size={20} />
      </span>
      {/* pen  */}
      <span
        className="w-full h-fit flex items-center justify-center cursor-pointer relative"
        onClick={handleOpenShapeMenu}
      >
        {selectedShape === "pen" && (
          <FaPen className="text-[3xl] cursor-pointer shrink-0" size={15} />
        )}
        {selectedShape === "rectangle" && (
          <RiRectangleLine
            className="text-[3xl] cursor-pointer shrink-0"
            size={15}
          />
        )}
        {/* {selectedShape === "circle" && (
          <FaRegCircle
            className="text-[3xl] cursor-pointer shrink-0"
            size={15}
          />
        )}
        {selectedShape === "triangle" && (
          <IoTriangleOutline
            className="text-[3xl] cursor-pointer shrink-0"
            size={15}
          />
        )} */}
        <ToolsSubMenu
          items={["pen"]}
          isOpenShapeMenu={isOpenShapeMenu}
          setIsOpenShapeMenu={setIsOpenShapeMenu}
          selectShape={handleSelectShape}
        />
      </span>
      {/* color  */}
      <span
        className="w-full h-fit flex items-center justify-center cursor-pointer relative"
        onClick={handleOpenColorMenu}
      >
        <div
          className="w-[20px] h-[20px] rounded-full"
          style={{ background: selectedColor }}
        ></div>
        <ColorsSubMenu
          colors={[
            "red",
            "green",
            "blue",
            // "yellow",
            // "purple",
            // "orange",
            // "pink",
            // "brown",
            // "gray",
            // "black",
            // "white",
          ]}
          isOpenColorMenu={isOpenColorMenu}
          setIsOpenColorMenu={setIsOpenColorMenu}
          selectColor={handleSelecyColor}
        />
      </span>
      {/* text  */}
      <span className="w-full h-fit flex items-center justify-center cursor-pointer ">
        <RiText className="text-[3xl] cursor-pointer shrink-0" size={20} />
      </span>
    </div>
  );
};

export default AnnotationSelectTools;
