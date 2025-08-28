import React from "react";

const TheIcon = ({ children, cClass = "", onClick = () => {} }) => {
  return (
    <button
      onClick={onClick}
      className={`${cClass} w-[35px] h-[35px] p-[5px] shrink-0 flex items-center justify-center border-2  border-[var(--overview-color-four)] radius bg-transparent  hover:bg-[var(--overview-color-four)] transition cursor-pointer`}
    >
      {children}
    </button>
  );
};

export default TheIcon;
