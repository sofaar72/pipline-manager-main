import React from "react";
import { IoIosClose } from "react-icons/io";
import TheIcon from "../TheIcon";

const PreviewAddress = ({ addressbar, hidePrev }) => {
  return (
    <div className="w-full h-[40px] radius bg-[var(--overview-color-two)] text-white h-lg flex items-center p-2 shrink-0 flex justify-between">
      <div>{addressbar}</div>
      <TheIcon
        cClass="text-xl border-none h-fit !p-0 !w-fit"
        onClick={hidePrev}
      >
        <IoIosClose />
      </TheIcon>
    </div>
  );
};

export default PreviewAddress;
