import React, { useCallback, useEffect, useState } from "react";

import { ToastContainer } from "react-toastify";

import TheButton from "../../TheButton";

const OnlyRemoveCommentModal = ({
  header = "Are you sure want to remove Comment?",
  removeCommentModal,
  id,
  removeComment,
  fetchData = () => {},
}) => {
  const removeTheComment = () => {
    // console.log("removing");
    removeComment(id, fetchData, removeCommentModal);
    // addTask(newData, setCreateModal);
  };

  // useEffect(() => {
  //   fetchData();
  // }, [taskSuccess]);

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
              removeTheComment();
            }}
            // onKeyDown={(e) => {
            //   if (e.key === "Enter") {
            //     console.log("enter");
            //   }
            // }}
            // loading={createTaskLoading}
            type="submit"
          >
            <span>Remove</span>
          </TheButton>
          <TheButton
            cClass="flex items-center justify-between gap-2 h-regular "
            onClick={(e) => {
              e.preventDefault();
              removeCommentModal(false);
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

export default OnlyRemoveCommentModal;
