import React from "react";
import { IoIosClose } from "react-icons/io";
import TheIcon from "../TheIcon";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const PreviewTopBar = ({
  hidePrev,
  taskId,
  onUpdateTask,
  onDeleteTask,
  hasTaskData = false,
}) => {
  return (
    <div className="w-full h-[20px] radius bg-[var(--overview-color-one)] text-white h-lg flex items-center justify-between p-2 shrink-0">
      <div className="flex gap-2 items-center">
        {hasTaskData && (
          <>
            <TheIcon
              cClass="text-xs border-none !h-[20px] !p-0 !w-[20px] !bg-[var(--overview-color-done)] hover:!bg-[var(--overview-color-done)]/50"
              onClick={onUpdateTask}
              title="Edit Task"
            >
              <FaEdit />
            </TheIcon>
            <TheIcon
              cClass="text-xs border-none !h-[20px] !p-0 !w-[20px] !bg-[var(--overview-color-faild)] hover:!bg-[var(--overview-color-faild)]/50"
              onClick={onDeleteTask}
              title="Delete Task"
            >
              <MdDelete />
            </TheIcon>
          </>
        )}
      </div>
      <TheIcon
        cClass="text-xl border-none h-fit !p-0 !w-fit"
        onClick={hidePrev}
        title="Close Preview"
      >
        <IoIosClose />
      </TheIcon>
    </div>
  );
};

export default PreviewTopBar;
