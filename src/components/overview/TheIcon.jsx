import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

const TheIcon = ({
  children,
  cClass = "",
  onClick = () => {},
  tooltip,
  title = "",
  tooltipId,
}) => {
  return (
    <>
      <button
        title={title}
        data-tooltip-id={tooltipId}
        onClick={onClick}
        className={`${cClass} w-[35px] h-[35px] p-[5px] shrink-0 flex items-center justify-center border-2  border-[var(--overview-color-four)] radius bg-transparent  hover:bg-[var(--overview-color-four)] transition cursor-pointer`}
      >
        {children}
      </button>

      <ReactTooltip
        id={tooltipId}
        // variant="light"
        place="bottom"
        className=" text-white !text-xs rounded-md p-2 !bg-[var(--overview-color-two)]/20"
      >
        {tooltip}
      </ReactTooltip>
    </>
  );
};

export default TheIcon;
