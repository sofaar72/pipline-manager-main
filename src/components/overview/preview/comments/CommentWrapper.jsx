import React from "react";
import CommentHeader from "./CommentHeader";
import CommentsList from "./CommentsList";
import CreateComment from "./CreateComment";

const CommentWrapper = ({
  comments,
  sendComment,
  createCommentLoading,
  versionId,
  taskId,
  createResult,
  getAllComments,
  getAllCommentReplies,
}) => {
  return (
    <div className="w-full h-full flex-1 flex flex-col gap-[10px]">
      <CommentHeader />
      <CreateComment
        sendComment={sendComment}
        loading={createCommentLoading}
        versionId={versionId}
        createResult={createResult}
        getAllComments={getAllComments}
        taskId={taskId}
      />
      <CommentsList
        comments={comments}
        getAllComments={getAllCommentReplies}
        taskId={taskId}
        versionId={versionId}
        sendComment={sendComment}
        loading={createCommentLoading}
        createResult={createResult}
      />
    </div>
  );
};

export default CommentWrapper;
