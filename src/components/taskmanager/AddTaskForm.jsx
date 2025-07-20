import React from "react";
import FormInputC from "../golbals/FormInputC";
import { DialogPanel } from "@headlessui/react";

const AddTaskForm = ({ entity }) => {
  return (
    <DialogPanel
      transition
      className="w-full flex items-center justify-center max-w-[796px] h-[708px] bg-[var(--primary-modal-box)] radius px-[24px] py-[16px]"
    >
      <div className="w-full h-full modal-content flex flex-col justify-center items-center text-white relative gap-[30px]">
        {/* modal header  */}
        <div className="w-full text-center">
          <h3 className="text-lg">Create Task</h3>
        </div>
        {/* modal form  */}
        <form className="w-full flex flex-col gap-[30px]">
          <FormInputC
            name={"task-name"}
            type={"text"}
            placeholder={"Task Name"}
          />
          <FormInputC
            name={"task-duration"}
            type={"text"}
            placeholder={"Task Duration"}
          />
          <FormInputC
            name={"task-status"}
            type={"radio"}
            placeholder={"Task Status"}
          />
          <FormInputC
            name={"task-assign-to"}
            type={"select"}
            placeholder={"Assign to"}
          />
          <FormInputC
            name={"task-file"}
            type={"file"}
            placeholder={"Attach File"}
          />
        </form>
      </div>
    </DialogPanel>
  );
};

export default AddTaskForm;
