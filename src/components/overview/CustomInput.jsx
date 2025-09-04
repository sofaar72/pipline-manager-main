import React from "react";

const CustomInput = ({ type = "text", label = "", onChange = () => {} }) => {
  if (type === "text") {
    return (
      <div className="w-full flex text-left flex-col gap-2 text-white h-regular">
        <label htmlFor="version">{label}</label>
        <input
          className="the_input radius h-[30px] w-[60px] px-2"
          placeholder="text"
          type={type}
          onChange={onChange}
        />
      </div>
    );
  }

  if (type === "description") {
    return (
      <div className="w-full flex text-left flex-col gap-2 text-white h-regular">
        <label className="w-full" htmlFor="version">
          {label}
        </label>
        <textarea
          className="w-full the_input radius h-[100px]  px-2 py-2"
          placeholder="text"
          //   type={type}
          //   onChange={onChange}
        />
      </div>
    );
  }
};

export default CustomInput;
