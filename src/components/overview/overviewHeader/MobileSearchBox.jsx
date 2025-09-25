import React, { useEffect, useRef } from "react";
import TheDropDown from "../TheDropDown";
import { IoMdClose } from "react-icons/io";
import TheIcon from "../TheIcon";
import TheSearch from "../TheSearch";

const MobileSearchBox = ({ searchItem, searchEntity, closeModal }) => {
  const boxRef = useRef(null);
  // 🔑 Detect clicks outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        closeModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeModal]);

  return (
    <div
      ref={boxRef}
      className="w-fit h-[60px] bg-[var(--overview-color-one)] p-2 flex items-center radius  gap-2 relative border-2 border-white/20"
      onClick={(e) => e.stopPropagation()}
    >
      <TheSearch
        placeHolder="Search.."
        onChange={searchEntity}
        value={searchItem}
      />
      {/* close icon  */}
      <TheIcon
        onClick={() => closeModal(false)}
        cClass="border-none text-white"
      >
        <IoMdClose />
      </TheIcon>
    </div>
  );
};

export default MobileSearchBox;
