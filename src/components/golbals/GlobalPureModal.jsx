import { Dialog, DialogBackdrop } from "@headlessui/react";
import React, { useEffect, useRef } from "react";

const GlobalPureModal = ({
  open = false,
  setOpen = () => {},
  modalContent = () => {},
  children,
}) => {
  const backdropMouseDownOnSelf = useRef(false);
  const panelMouseDown = useRef(false);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-[9998] bg-[var(--primary-color-dark)]/75 transition"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-[var(--primary-color-dark)]/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div
        className="fixed inset-0 !z-[100000] w-screen overflow-y-auto radius "
        onMouseDownCapture={(e) => {
          // Track if the initial mousedown started on the backdrop itself
          backdropMouseDownOnSelf.current = e.target === e.currentTarget;
          // Reset panel flag; will be set by panel on mousedown
          panelMouseDown.current = false;
        }}
        onClick={() => {
          // Close if the interaction did not start inside the panel
          if (!panelMouseDown.current) {
            setOpen(false);
          }
          backdropMouseDownOnSelf.current = false;
          panelMouseDown.current = false;
        }}
        onMouseUp={() => {
          backdropMouseDownOnSelf.current = false;
          panelMouseDown.current = false;
        }}
      >
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
          <div
            className="radius"
            onMouseDown={(e) => {
              panelMouseDown.current = true;
              e.stopPropagation();
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
          {
            //   modalContent(setOpen) ||
          }
        </div>
      </div>
    </Dialog>
  );
};

export default GlobalPureModal;
