import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { IoMdSave } from "react-icons/io";

const TheSearch = ({ placeHolder = "", onChange = () => {} }) => {
  const [saved, setSaved] = useState([]);
  const [showSaved, setShowSaved] = useState(false);

  const showSavedHandler = () => {
    setShowSaved(true);
  };
  const dontShowSavedHandler = () => {
    setShowSaved(false);
  };
  return (
    <div className="border-2 border-[var(--overview-color-four)] h-lg w-[250px] h-[35px] px-[10px] pl-[30px] py-[5px] shrink-0 flex items-center justify-between  radius text-whit relative">
      <input
        type="text"
        className="w-full h-full"
        placeholder={placeHolder}
        onChange={onChange}
      />
      <div className="absolute left-[5px] top-1/2 -translate-y-[50%] ">
        <IoSearchSharp className="text-lg text-white/70" />
      </div>
      <div
        className="absolute right-[5px] top-1/2 -translate-y-[50%] cursor-pointer"
        onMouseOver={() => {
          showSavedHandler();
        }}
        onMouseLeave={() => {
          setTimeout(() => {
            dontShowSavedHandler();
          }, 200);
        }}
      >
        <IoMdSave className="text-lg text-white/70" />
      </div>
      {/* show the saved  */}

      {/* <div
        className={`absolute transition top-[100%] right-0 w-[200px] h-[200px] bg-red-500 cursor-pointer ${
          showSaved
            ? "opacity-100 pointer-events-auto"
            : "opacity-0  pointer-events-none"
        }`}
        onMouseOver={() => {
          showSavedHandler();
        }}
        onMouseLeave={() => {
          setTimeout(() => {
            dontShowSavedHandler();
          }, 500);
        }}
      ></div> */}
    </div>
  );
};

export default TheSearch;
