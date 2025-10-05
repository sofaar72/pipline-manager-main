import React, { useCallback, useEffect, useState } from "react";

import TheButton from "./TheButton";

import { useTasks } from "../../hooks/useTasks";
import { useUser } from "../../hooks/useUser";
import { useTypes } from "../../hooks/useTypes";
import { toast } from "react-toastify";

const DeleteTaskModal = ({
  header = "Remove Tasks",

  fetchData = () => {},
  tasksToRemove,
  closeModal,
}) => {
  const { deleteTheTask, deleteTaskLoading } = useTasks();
  const [success, setSuccess] = useState(false);

  const remove = async () => {
    try {
      if (tasksToRemove && tasksToRemove.length > 0) {
        const results = await Promise.all(
          tasksToRemove.map((id) => deleteTheTask(id))
        );

        // Check how many were successful
        const successCount = results.filter(Boolean).length;

        if (successCount > 0) {
          toast.success(`${successCount} task(s) removed successfully`);
          setSuccess(true);
          closeModal(false);
        } else {
          toast.error("Failed to remove tasks");
        }
      }
    } catch (err) {
      console.error("Error deleting tasks:", err);
      toast.error("Error while removing tasks");
    }
  };

  useEffect(() => {
    if (success) {
      fetchData();
      setSuccess(false);
    }
  }, [success]);

  return (
    <>
      <div
        className="w-[700px] h-fit px-[10px] py-[20px] radius bg-[var(--overview-color-one)] flex flex-col gap-[20px] justify-between transition"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full border-b-1 border-[var(--overview-color-three)]/80 h-lg text-bold text-white flex py-2">
          {header} ({tasksToRemove.length} tasks to remove)
        </div>
        <p className="flex h-lg text-white">
          Are you sure you want to remove tasks?
        </p>
        {/* actions  */}
        <div className="w-full flex justify-end gap-2">
          <TheButton
            cClass="w-fit !flex !items-center !justify-between gap-2 h-regular !bg-[var(--overview-color-done)]"
            onClick={() => {
              remove();
            }}
            loading={deleteTaskLoading}
            type="submit"
          >
            <span>Remove</span>
          </TheButton>
          <TheButton
            cClass="flex items-center justify-between gap-2 h-regular "
            onClick={(e) => {
              e.preventDefault();
              closeModal(false);
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

export default DeleteTaskModal;
