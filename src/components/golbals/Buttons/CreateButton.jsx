import React from "react";
import { FaPlus } from "react-icons/fa";

const CreateButton = ({ onClick = () => {}, text = "text" }) => {
  return (
    <button
      onClick={onClick}
      className="text-xs  flex items-center  radius cursor-pointer gap-2 group transition"
    >
      <span className="hover:text-[var(--primary-color-light)] transition">
        {text}
      </span>
      <span className="text-[10px] bg-[var(--primary-color-light)] transition hover:text-[var(--primary-color-light)] p-1 radius">
        <FaPlus />
      </span>
    </button>
  );
};

export default CreateButton;
