import React, { useCallback, useEffect, useState } from "react";

import { ToastContainer } from "react-toastify";

import TheButton from "./TheButton";

import { useTasks } from "../../hooks/useTasks";
import { useUser } from "../../hooks/useUser";
import { useTypes } from "../../hooks/useTypes";

const OnlyCreateTaskModal = ({
  header = "Create Task",
  setCreateModal = () => {},
  createTaskModal,
  entityId = null,
  status = 540,
  parentType = "PRD",
  typeId = null,
  compareType = null,
  fetchData = () => {},
}) => {
  const { addTask, createTaskLoading, taskSuccess } = useTasks();

  const create = () => {
    const newData = {
      type: typeId,
      parent_type: parentType,
      status: status,
      parent: entityId,
    };
    console.log(newData);

    addTask(newData, setCreateModal);
  };

  useEffect(() => {
    fetchData();
  }, [taskSuccess]);

  return (
    <>
      {/* show the toasts  */}
      <ToastContainer />
      <div
        className="w-[700px] h-fit px-[10px] py-[20px] radius bg-[var(--overview-color-one)] flex flex-col gap-[20px] justify-between transition"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full border-b-1 border-[var(--overview-color-three)]/80 h-lg text-bold text-white flex py-2">
          {header}
        </div>
        {/* actions  */}
        <div className="w-full flex justify-end gap-2">
          <TheButton
            cClass="w-fit !flex !items-center !justify-between gap-2 h-regular !bg-[var(--overview-color-done)]"
            onClick={() => {
              create();
            }}
            loading={createTaskLoading}
            type="submit"
          >
            <span>Create</span>
          </TheButton>
          <TheButton
            cClass="flex items-center justify-between gap-2 h-regular "
            onClick={(e) => {
              e.preventDefault();
              setCreateModal(false);
            }}
            type=""
          >
            <span>Cancel</span>
          </TheButton>
        </div>
      </div>
    </>
  );
};

export default OnlyCreateTaskModal;
