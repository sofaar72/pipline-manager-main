import { MenuButton } from "@headlessui/react";
import React from "react";

const TheButton = ({ cClass = "", children, onClick = () => {} }) => {
  return (
    <div
      className={`${cClass} c-button h-[35px] px-4 gap-2 radius text-sm text-white bg-[var(--overview-color-two)] cursor-pointer hover:bg-[var(--overview-color-three)] transition-all duration-200`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default TheButton;
