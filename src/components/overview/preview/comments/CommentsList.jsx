import React from "react";
import CommentItem from "./CommentItem";

const CommentsList = ({ comments }) => {
  console.log(comments);
  return (
    <div className="flex flex-col h-[250px]">
      <div className="flex-1 overflow-y-scroll flex flex-col gap-2 pr-2 bg-[var(--overview-color-two)] text-white">
        {comments?.map((comment) => {
          <CommentItem comment={comment} />;
        })}
        {/* <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem /> */}
      </div>
    </div>
  );
};

export default CommentsList;
