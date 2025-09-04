import React, { useEffect, useState } from "react";
import PreviewAddress from "./PreviewAddress";
import PreviewVideoWrapper from "./PreviewVideoWrapper";
import PreviewFilesAndComments from "./PreviewFilesAndComments";
import { useTasks } from "../../../hooks/useTasks";

const PreviewMain = ({
  addressbar,
  previewWidth,
  stopResizing,
  isResizing,
  hidePrev,
  entityId,
}) => {
  const [switcher, setSwitcher] = useState("comment");

  const { fetchAllTasks, taskResults } = useTasks();
  // FETCH TASKS
  useEffect(() => {
    if (addressbar) {
      fetchAllTasks(entityId);
    }
  }, [addressbar]);
  // FETCH VERSIONS OF THE TASK
  // useEffect(() => {

  // }, [taskResults]);

  return (
    <div
      className="w-full h-full flex flex-col gap-[10px] p-[10px] shrink-0"
      onClick={(e) => {
        e.stopPropagation();
        // stopResizing();
      }}
    >
      <PreviewAddress addressbar={addressbar} hidePrev={hidePrev} />
      <PreviewVideoWrapper
        switcher={switcher}
        setSwitcher={setSwitcher}
        previewWidth={previewWidth}
        isResizing={isResizing}
      />
      <PreviewFilesAndComments switcher={switcher} setSwitcher={setSwitcher} />
    </div>
  );
};

export default PreviewMain;
