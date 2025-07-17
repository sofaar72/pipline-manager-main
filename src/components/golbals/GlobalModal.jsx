import React, { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import FormInputC from "./FormInputC";

const GlobalModal = ({
  children,
  text = "Add task",
  clickButton = () => {},
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="!z-[999999999999999999999999]">
      {text ? (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 transition  rounded-md text-white  text-sm  px-[10px] py-[5px] cursor-pointer 
        hover:bg-[var(--primary-color-light)]/20
        "
        >
          <span>{text}</span>
          <img className="w-[12px] h-[12px]" src="/icons/Add.svg" alt="" />
        </button>
      ) : (
        <>{clickButton(setOpen)}</>
      )}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="relative z-[999999999999] "
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-[var(--primary-color-dark)]/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div
          className="fixed inset-0 !z-[100000] w-screen overflow-y-auto radius "
          onClick={() => setOpen(false)}
        >
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            {children}
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default GlobalModal;
