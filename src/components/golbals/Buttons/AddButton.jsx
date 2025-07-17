import React from "react";

const AddButton = ({ click, size = "text-[10px]" }) => {
  return (
    <button
      className={`flex gap-2 items-center ${size} text-white cursor-pointer`}
      onClick={click}
    >
      <span>Add</span>
      <img className="w-[18px] h-[18px]" src="/icons/Add.svg" alt="" />
    </button>
  );
};

export default AddButton;
