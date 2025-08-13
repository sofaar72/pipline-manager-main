import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchThree = () => {
  return (
    <div className="w-full  border border-white/40 bg-[var(--search-color)]/50 radius p-[10px] h-[40px] flex relative text-white max-w-[300px]">
      <input
        className="w-full h-full  text-xs px-6 "
        type="text"
        placeholder="search..."
      />
      <FaSearch
        className="w-[12px] h-[12px] object-contain absolute left-[10px] top-1/2 -translate-y-1/2"
        src="/icons/Search one.svg"
        alt=""
      />
    </div>
  );
};

export default SearchThree;
