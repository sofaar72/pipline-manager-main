import React, { useEffect, useState } from "react";
import { IoIosAttach } from "react-icons/io";
import { MdOutlineSend } from "react-icons/md";
import TheIcon from "../../TheIcon";
import TheButton from "../../TheButton";

const CreateComment = ({
  sendComment,
  loading,
  versionId,
  taskId,
  createResult,
  type = "normal",
  parentId = null,
  getAllComments,
}) => {
  const userId = localStorage.getItem("user_id") || "";

  const [comment, setComment] = useState({
    text: "",
    author: null,
    version: versionId.id || undefined,
    // attachment: { file: null },
  });

  const handelComment = (e) => {
    console.log(e.target.value);
    setComment({ ...comment, text: e.target.value });
    // setComment({...comment,text})
  };

  const getTheComments = () => {
    getAllComments(versionId.id, taskId, parentId);
  };

  const createComment = (e) => {
    e.preventDefault();
    sendComment(
      {
        ...comment,
        author: Number(userId),
        parent: type === "reply" ? parentId : undefined,
        version: versionId.id,

        // annotations: annotationData,
      },
      getTheComments
    );
  };

  useEffect(() => {
    // console.log(createResult);
    setComment({
      text: "",
      author: null,
    });
  }, [createResult]);

  return (
    <form
      className={`w-full radius ${
        type === "reply"
          ? "bg-[var(--overview-color-two)]/50"
          : "bg-[var(--overview-color-three)]/50"
      }  flex flex-col gap-2 relative`}
      onSubmit={createComment}
    >
      {/* cm send input  */}
      <div className="w-full flex items-center justify-between p-2">
        <input
          className="h-regular text-white/80 placeholder:text-white/80 w-full "
          type="text"
          placeholder="Leave a comment ..."
          onChange={handelComment}
          value={comment.text}
        />
        {/* attach  */}
        <TheIcon cClass="border-none !bg-[var(--overview-color-three)] hover:!bg-[var(--overview-color-four)] !h-[25px] !w-[25px]">
          <IoIosAttach />
        </TheIcon>
      </div>
      <div className="w-full flex items-center justify-between p-2">
        <TheButton
          cClass="flex items-center justify-between gap-2 h-regular !p-2 !bg-[var(--overview-color-three)] hover:!bg-[var(--overview-color-four)] !h-full"
          onClick={() => {}}
        >
          <span>Status</span>
        </TheButton>
        <TheButton
          cClass="bg-transparent !p-0 hover:!bg-transparent"
          type="submit"
          loading={loading}
        >
          <TheIcon cClass="border-none !bg-[var(--overview-color-three)] !h-[25px] !w-[25px] hover:!bg-[var(--overview-color-four)]">
            <MdOutlineSend />
          </TheIcon>
        </TheButton>
      </div>
    </form>
  );
};

export default CreateComment;
