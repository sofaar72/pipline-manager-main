import React from "react";

const CustomInput = ({
  type = "text",
  label = "",
  name = "",
  onChange = () => {},
  inputClass = "",
  textAreaClass = "",
  placeholder = "text",
  value = "",
}) => {
  if (type === "text") {
    return (
      <div className="w-full flex text-left flex-col gap-2 text-white h-regular">
        <label htmlFor="version">{label}</label>
        <input
          id={name}
          name={name}
          className={`${inputClass} the_input radius h-[30px] w-[60px] px-2`}
          placeholder={placeholder}
          type={type}
          onChange={onChange}
          value={value}
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
          id={name}
          name={name}
          className={`${textAreaClass} w-full the_input radius h-[100px]  px-2 py-2`}
          placeholder={placeholder}
          value={value}
          type={type}
          onChange={onChange}
        />
      </div>
    );
  }
};

export default CustomInput;
