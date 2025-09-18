import { MenuButton } from "@headlessui/react";
import React, { useEffect } from "react";
import Loading from "../golbals/Loading";

const TheButton = ({
  cClass = "",
  children,
  onClick = () => {},
  onKeyDown = () => {},
  loading = false,
  type = "",
  disabled = false,
}) => {
  return (
    <button
      className={`${cClass} c-button h-[35px] px-4 gap-2 radius text-sm text-white bg-[var(--overview-color-two)] cursor-pointer hover:bg-[var(--overview-color-three)] transition-all duration-200 relative`}
      onClick={onClick}
      type={type}
      disabled={loading}
    >
      {children}
      {loading && (
        <span className="   w-[20px] h-[20px]">
          <Loading size={"w-5 h-5"} />
        </span>
      )}
    </button>
  );
};

export default TheButton;
