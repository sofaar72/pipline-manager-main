import React from "react";
import SelectProjectContents from "../../components/projects/SelectProjectContents";

const SelectProjectPage = () => {
  return (
    <div className="w-full h-full text-white flex gap-[30px] flex-col lg:flex-row overflow-hidden">
      {/* contents  */}
      <SelectProjectContents />
    </div>
  );
};

export default SelectProjectPage;
