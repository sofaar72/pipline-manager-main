import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { IoMdSave } from "react-icons/io";
import TheDropDownForSearch from "./TheDropDownForSearch";

const TheSearch = ({ placeHolder = "", onChange = () => {}, value }) => {
  const [saved, setSaved] = useState([]);

  // save small filters
  const saveSmallFilters = (e) => {
    e.stopPropagation();
    setSaved((prev) => {
      if (prev.includes(value)) {
        return prev; // skip duplicates
      }
      return [...prev, value];
    });
  };

  const removeSaved = (item) => {
    setSaved((prev) => prev.filter((i) => i !== item));
  };

  const selectFromSaved = (item) => {
    // set input value from saved
    onChange({ target: { value: item } });
  };

  return (
    <div className="border-2  border-[var(--overview-color-four)] h-lg w-[250px] h-[35px] px-[10px] pl-[30px] py-[5px] shrink-0 flex items-center justify-between radius relative">
      <input
        type="text"
        className="w-full h-full bg-transparent text-white "
        placeholder={placeHolder}
        onChange={onChange}
        value={value}
      />

      {/* search icon */}
      <div className="absolute left-[5px] top-1/2 -translate-y-[50%] ">
        <IoSearchSharp className="text-lg text-white/70" />
      </div>

      {/* save dropdown */}
      <div className="absolute right-[5px] top-1/2 -translate-y-[50%] cursor-pointer">
        {value && (
          <TheDropDownForSearch
            cClass={"w-fit bg-transparent hover:bg-transparent !gap-0"}
            items={saved.map((item) => ({ id: item, name: item }))}
            funcAfterForSearch={selectFromSaved}
            remove={removeSaved}
          >
            <IoMdSave
              className="text-lg text-white/70 hover:!text-white"
              onClick={saveSmallFilters}
            />
          </TheDropDownForSearch>
        )}
      </div>
    </div>
  );
};

export default TheSearch;
