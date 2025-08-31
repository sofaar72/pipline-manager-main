import React from "react";
import CommentHeader from "./CommentHeader";
import CommentsList from "./CommentsList";
import CreateComment from "./CreateComment";

const CommentWrapper = () => {
  return (
    <div className="w-full h-full flex-1 flex flex-col gap-[10px]">
      <CommentHeader />
      <CreateComment />
      <CommentsList />
    </div>
  );
};

export default CommentWrapper;
