import React, { useCallback, useEffect, useState } from "react";

import { ToastContainer } from "react-toastify";

import TheButton from "./TheButton";

import { useTasks } from "../../hooks/useTasks";
import { useUser } from "../../hooks/useUser";
import { useTypes } from "../../hooks/useTypes";

const OnlyCreateMultiTaskModal = ({
  header = "Create Tasks",
  setCreateModal = () => {},
  entityIdies = [],
  typeId = null,
  status = 540,
  createTaskModal,
  parentType = "PRD",
  // compareType = null,
  fetchData = () => {},
}) => {
  const { addTask, createTaskLoading, taskSuccess } = useTasks();

  // const create = async () => {
  //   if (!entityIdies.length) return;

  //   try {
  //     for (const ent of entityIdies) {
  //       const newData = {
  //         type: typeId,
  //         parent_type: parentType,
  //         status: status,
  //         parent: ent,
  //       };
  //       await addTask(newData, setCreateModal);
  //     }

  //     // Fetch updated data only once after all tasks are added
  //     fetchData();
  //   } catch (err) {
  //     console.error("Error creating tasks:", err);
  //   }
  // };

  const create = async () => {
    if (!entityIdies.length) return;

    try {
      // Collect promises for all addTask calls
      const promises = entityIdies.map((ent) => {
        const newData = {
          type: typeId,
          parent_type: parentType,
          status,
          parent: ent,
        };

        // make sure addTask returns a Promise
        return addTask(newData, setCreateModal);
      });

      // Wait for all tasks to finish
      await Promise.all(promises);

      // Fetch updated data only once after all tasks are added
      await fetchData();
    } catch (err) {
      console.error("Error creating tasks:", err);
    }
  };

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

export default OnlyCreateMultiTaskModal;
