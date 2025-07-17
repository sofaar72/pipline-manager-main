import React from "react";

const SearchOne = () => {
  return (
    <div className="w-full  border-b border-b-white/40 flex relative py-2">
      <input
        className="w-full h-full  text-xs px-6 "
        type="text"
        placeholder="search..."
      />
      <img
        className="w-[12px] h-[12px] object-contain absolute left-0 top-1/2 -translate-y-1/2"
        src="/icons/Search one.svg"
        alt=""
      />
    </div>
  );
};

export default SearchOne;
