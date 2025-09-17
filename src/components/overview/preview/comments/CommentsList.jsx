import React from "react";
import CommentItem from "./CommentItem";

const CommentsList = ({
  comments,
  getAllComments,
  taskId,
  versionId,
  sendComment,
  loading,
  createResult,
}) => {
  return (
    <div className="flex flex-col h-[250px]">
      <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-2 bg-[var(--overview-color-two)] text-white">
        {comments?.map((comment) => {
          return (
            <CommentItem
              comment={comment}
              getAllComments={getAllComments}
              taskId={taskId}
              versionId={versionId}
              sendComment={sendComment}
              loading={loading}
              createResult={createResult}
            />
          );
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
