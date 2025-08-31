import React from "react";
import CommentItem from "./CommentItem";

const CommentsList = () => {
  return (
    <div className="flex flex-col h-[250px]">
      <div className="flex-1 overflow-y-scroll flex flex-col gap-2 pr-2 bg-[var(--overview-color-two)] text-white">
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
      </div>
    </div>
  );
};

export default CommentsList;
