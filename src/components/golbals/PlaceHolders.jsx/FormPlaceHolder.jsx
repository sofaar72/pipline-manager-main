import React from "react";

const FormPLaceHolder = ({ classes, children }) => {
  return (
    <div class={`${classes} animate-pulse `}>
      <div className="w-full flex flex-col gap-5 mb-auto">
        <div class="w-full h-[40px] bg-gray-500/50 rounded"></div>
        <div class="w-full h-[40px] bg-gray-500/50 rounded"></div>
      </div>
      <div class="w-full h-[40px] bg-gray-500/50 rounded"></div>
    </div>
  );
};

export default FormPLaceHolder;
