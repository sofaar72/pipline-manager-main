import { MenuButton } from "@headlessui/react";
import React from "react";

const CbuttonTwo = ({ cClass = "", children }) => {
  return (
    <MenuButton
      className={`${cClass} c-button h-[40px] px-4 gap-2 radius text-sm text-white bg-[var(--overview-color-two)] cursor-pointer hover:bg-[var(--overview-color-three)] transition-all duration-200`}
    >
      {children}
    </MenuButton>
  );
};

export default CbuttonTwo;
