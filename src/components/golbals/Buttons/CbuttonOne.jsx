import React from "react";
import Loading from "../Loading";
const CbuttonOne = ({
  children,
  color = "",
  disabled = false,
  size = "12px",
  height = "",
  cClasses = "",
  type = "",
  loading = false,
}) => {
  return (
    <button
      style={{
        backgroundColor: disabled ? "gray" : color,
        fontSize: size,
      }}
      className={[
        `${height} text-white c-button px-2 py-[1px] radius hover:!bg-[var(--primary-color-light)] transition-all duration-200 gap-2 border-none relative  ${cClasses} ${
          disabled ? "cursor-auto" : "cursor-pointer"
        }`,
      ]}
      disabled={loading || disabled}
      type={type}
    >
      {children}
      {loading && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <Loading size={"w-6 h-6"} />
        </div>
      )}
    </button>
  );
};

export default CbuttonOne;
