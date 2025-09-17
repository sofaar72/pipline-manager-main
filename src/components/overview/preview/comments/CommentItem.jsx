import React, { useEffect, useState, version } from "react";
import { MdFeedback } from "react-icons/md";
import TheButton from "../../TheButton";
import ReplyItem from "./ReplyItem";
import CreateComment from "./CreateComment";

const CommentItem = ({
  comment,
  getAllComments,
  taskId,
  versionId,
  sendComment,
  loading,
  createResult,
}) => {
  const [replyPart, setReplyPart] = useState(false);

  const convertDate = (date) => {
    const sentDate = new Date(date);
    const now = new Date();

    const diffMs = now - sentDate;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30); // Approximate

    if (diffHours < 24) {
      return `Sent ${diffHours} hour(s) ago`;
    } else if (diffDays < 30) {
      return `Sent ${diffDays} day(s) ago`;
    } else {
      const remainingDays = diffDays % 30;
      const remainingHours = diffHours % 24;
      return `Sent ${diffMonths} month(s), ${remainingDays} day(s), ${remainingHours} hour(s) ago`;
    }
  };

  const showReplies = () => {
    setReplyPart(!replyPart);
  };

  useEffect(() => {
    if (replyPart) {
      getReplyComments();
    }
  }, [replyPart]);

  const getReplyComments = () => {
    getAllComments(versionId.id, taskId, comment.parent);
  };
  return (
    <div className="w-full radius bg-[var(--overview-color-three)]/50  flex flex-col gap-2 relative p-2 cursor-pointer">
      {/* header  */}
      <div className="w-full flex  gap-2 justify-between text-white">
        {/* image and infos  */}
        <div className="flex  gap-2">
          {/* image part  */}
          <div className="relative w-[24px] h-[24px] rounded-full bg-gray-500 ">
            <img
              className="w-full h-full object-contain"
              src={comment?.author.avatar}
              alt=""
            />
            {comment?.message_type === "fb" && (
              <div className="absolute -left-[2px] -top-[2px]">
                <span className="flex items-center justify-center w-[16px] h-[16px] rounded-full bg-[var(--overview-color-progress)] text-white">
                  <MdFeedback className="w-[10px] h-[10px]" />
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-[5px] h-regular">
            <span>
              {comment?.author.first_name + " " + comment?.author.last_name}
            </span>
            {/* <span>Role</span> */}
            <span className="h-xs">{comment?.author.email}</span>
          </div>
          {comment?.attachment && comment?.attachment.length > 0 && (
            <div className="w-[100px] h-[16px] flex items-center  bg-[var(--overview-color-four)] gap-[2px] p-2 rounded-full"></div>
          )}
        </div>
        <span className="h-small">{convertDate(comment?.created_at)}</span>
      </div>
      {/* description  */}
      {comment?.text && <p className="h-small">{comment.text}</p>}
      <div className="w-full flex justify-end items-center">
        <TheButton
          cClass="flex items-center justify-between gap-2 h-regular !p-2 !bg-black/80 hover:!bg-black !w-fit !h-[11px]"
          onClick={() => {
            showReplies();
          }}
        >
          <span>Replies</span>
        </TheButton>
      </div>

      {/* the reply part  */}
      {replyPart && (
        <div className="w-full h-[200px] radius bg-[var(--overview-color-four)]/50 p-2 h-regular overflow-y-scroll flex flex-col gap-2">
          {/* <ReplyItem commentReplies={} /> */}
          <CreateComment
            sendComment={sendComment}
            loading={loading}
            versionId={versionId}
            taskId={taskId}
            createResult={createResult}
            type="reply"
            parentId={comment.id}
            getAllComments={getAllComments}
          />
          {/* <ReplyItem /> */}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
