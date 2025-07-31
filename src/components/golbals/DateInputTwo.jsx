// components/form/DateInput.jsx
import React, { forwardRef } from "react";

const DateInput = forwardRef(
  ({ label, name, value, onChange, onBlur, error, touched, ref, onClick }) => {
    return (
      <div className="w-full relative" onClick={onClick}>
        {/* <label htmlFor={name} className="block text-white text-sm mb-1">
        {label}
      </label> */}
        <input
          ref={ref}
          id={name}
          name={name}
          type="date"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="text-white bg-transparent border border-white/40  p-2 text-sm w-full input-create"
        />
        {error && touched && (
          <p className="absolute top-full right-0 text-red-500 text-xs mt-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

export default DateInput;
