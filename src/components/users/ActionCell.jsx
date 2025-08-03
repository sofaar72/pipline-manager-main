// components/ActionCell.jsx
import React from "react";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

const ActionCell = (props) => {
  const data = props.data;

  return (
    <div className="text-lg" style={{ display: "flex", gap: "12px" }}>
      <button
        className="cursor-pointer transition group"
        onClick={() => console.log("Edit", data)}
      >
        <FaEdit className="group-hover:!text-[var(--primary-color-light)]  transition" />
      </button>
      <button
        className="cursor-pointer transition group"
        onClick={() => console.log("Delete", data)}
      >
        <AiFillDelete className="group-hover:text-red-500 transition" />
      </button>
    </div>
  );
};

export default ActionCell;
