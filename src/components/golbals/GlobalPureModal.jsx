import { Dialog, DialogBackdrop } from "@headlessui/react";
import React, { useEffect } from "react";

const GlobalPureModal = ({
  open = false,
  setOpen = () => {},
  modalContent = () => {},
  children,
}) => {
  return (
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
        <div
          className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 "
          // onClick={(e) => e.stopPropagation()}
        >
          {
            //   modalContent(setOpen) ||

            children
          }
        </div>
      </div>
    </Dialog>
  );
};

export default GlobalPureModal;
