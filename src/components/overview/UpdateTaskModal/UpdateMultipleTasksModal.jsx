import React from "react";
import { ToastContainer } from "react-toastify";
import { useTasks } from "../../../hooks/useTasks";
import UpdateTaskForm from "./UpdateTaskForm";

const UpdateMultipleTasksModal = ({
  header = "Update Multiple Tasks",
  selectedTasksNumbers = 20,
  setModal,
  taskIdies,
  status,
  fetchData,
  selectedProjects,
}) => {
  const {
    fetchAllTaskStatuses,
    statusesLoading,
    statusesError,
    statusesResults,
  } = useTasks();

  return (
    <>
      <div
        className="w-[400px] h-fit px-[10px] py-[20px] radius bg-[var(--overview-color-one)] flex flex-col gap-[20px] justify-between transition"
        onClick={(e) => e.stopPropagation()}
      >
        {/* top  */}
        <div className="w-full border-b-1 border-[var(--overview-color-three)]/80 h-lg text-bold text-white flex py-2 flex-col items-start gap-2">
          <div className="h-lg font-bold">{header}</div>
          <div className="h-regular font-[300]">
            {selectedTasksNumbers} tasks selected
          </div>
          <div className="h-regular font-[300]">
            These updates will apply to All tasks
          </div>
        </div>
        {/* The Form Part  */}
        <UpdateTaskForm
          setCreateModal={setModal}
          fetchData={fetchData}
          taskIdies={taskIdies}
        />
      </div>
    </>
  );
};

export default UpdateMultipleTasksModal;
