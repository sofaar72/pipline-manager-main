import React, { useState } from "react";
import { MdFeedback } from "react-icons/md";
import TheButton from "../../TheButton";
import ReplyItem from "./ReplyItem";

const CommentItem = () => {
  const [replyPart, setReplyPart] = useState(false);
  return (
    <div className="w-full radius bg-[var(--overview-color-three)]/50  flex flex-col gap-2 relative p-2 cursor-pointer">
      {/* header  */}
      <div className="w-full flex  gap-2 justify-between text-white">
        {/* image and infos  */}
        <div className="flex  gap-2">
          {/* image part  */}
          <div className="relative w-[24px] h-[24px] rounded-full bg-gray-500 ">
            <div className="absolute -left-[2px] -top-[2px]">
              <span className="flex items-center justify-center w-[16px] h-[16px] rounded-full bg-[var(--overview-color-progress)] text-white">
                <MdFeedback className="w-[10px] h-[10px]" />
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-[5px] h-regular">
            <span>A person comment</span>
            <span>Role</span>
          </div>
          <div className="w-[100px] h-[16px] flex items-center  bg-[var(--overview-color-four)] gap-[2px] p-2 rounded-full"></div>
        </div>
        <span className="h-small">A mounth ago</span>
      </div>
      {/* description  */}
      <p className="h-small">
        Why do we use it? It is a long established fact that a reader will be
        distracted by the readable content of a page when looking at its layout.
        The point of using Lorem Ipsum is that it has a more-or-less normal
        distribution of letters, as opposed to using 'Content here,
      </p>
      <div className="w-full flex justify-end items-center">
        <TheButton
          cClass="flex items-center justify-between gap-2 h-regular !p-2 !bg-black/80 hover:!bg-black !w-fit !h-[11px]"
          onClick={() => {
            setReplyPart(!replyPart);
          }}
        >
          <span>Reply</span>
        </TheButton>
      </div>

      {/* the reply part  */}
      {replyPart && (
        <div className="w-full h-[200px] radius bg-[var(--overview-color-four)]/50 p-2 h-regular overflow-y-scroll flex flex-col gap-2">
          <ReplyItem />
          <ReplyItem />
          <ReplyItem />
        </div>
      )}
    </div>
  );
};

export default CommentItem;
