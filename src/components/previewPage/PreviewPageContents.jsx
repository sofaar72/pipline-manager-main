import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { FaFileAlt, FaSpinner } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { VideoAnnotator } from "./VideoAnnotator";
import { useEpisodeManagerContext } from "../../assets/context/EpisodeManagerContext";
import { useEntities } from "../../hooks/useEntities";
import { VscOpenPreview } from "react-icons/vsc";
import { GrAttachment } from "react-icons/gr";
import { useComments } from "../../hooks/useComments";
import VideoAnnotation from "./videoAnnotation/VideoAnnotation";

const PreviewPageContents = ({
  comments: theComments,
  sendComment = () => {},
  sendAllAnnotations = () => {},
  fileId = null,
  videoUrl = null,
}) => {
  const { pathname } = useLocation();
  const { createLoading, createError } = useComments();
  const { taskId, versionId } = useLocation()?.state || {};
  const navigate = useNavigate();
  const [comment, setComment] = useState({
    text: "",
    author: null,
    version: versionId || undefined,
    // attachment: { file: null },
  });
  const userId = localStorage.getItem("user_id") || "";
  const [annotationData, setAnnotationData] = useState([]);

  const { dataType } = useEpisodeManagerContext();

  const uploadRef = useRef(null);

  const segments = pathname.split("/").filter(Boolean);
  const pathArray = [];
  segments.forEach((segment, index) => {
    pathArray.push(segment);
    if (index !== segments.length - 1) {
      pathArray.push("|");
    }
  });

  const locationState = useLocation().state;

  const { globalCurrentPage } = useEpisodeManagerContext();

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

  const handelComment = (e) => {
    // console.log(e.target.value);
    setComment({ ...comment, text: e.target.value });
    // setComment({...comment,text})
  };
  const uploadCommentAttachment = (e) => {
    const cmFile = e.target.files[0];
    // console.log(cmFile);

    // setComment({
    //   ...comment,
    //   attachment: { file: cmFile },
    // });
  };

  const handleUpload = () => {
    uploadRef.current.click();
  };
  const createComment = (e) => {
    e.preventDefault();
    // console.log(comment);
    sendComment({
      ...comment,
      author: Number(userId),
      // annotations: annotationData,
    });
    // setComment((prev) => {
    //   return { ...prev, text: "", attachment: { file: null } };
    // });
  };

  // send annotations each 2 second

  useEffect(() => {
    // console.log(fileId);
    const handler = setTimeout(() => {
      sendAllAnnotations({ annotations: annotationData, file: fileId });
    }, 2000); // 2 seconds

    return () => {
      clearTimeout(handler);
    };
  }, [annotationData]);

  return (
    <div className="w-full h-full flex items-center justify-center gap-[20px]">
      {/* PREVIEW PART  */}
      <div className="w-full max-w-[1000px] flex-3 h-full flex flex-col justify-between gap-[20px]">
        {/* address part */}
        <div className="w-fit h-[40px] flex items-center gap-[5px] radius text-white text-sm">
          <MdKeyboardDoubleArrowLeft
            // onClick={() => navigate("/task-manager/production")}
            onClick={() => {
              if (dataType && locationState?.id) {
                navigate(`/file-manager/${dataType}/${locationState.id}`, {
                  state: {
                    fromPreview: true,
                    id: locationState.id,
                    currentPage: globalCurrentPage,
                    taskId: taskId,
                    versionId: versionId,
                  },
                });
              }
            }}
            className="text-2xl cursor-pointer hover:text-[var(--primary-color-light)] transition"
          />
          {pathArray.map((item, index) => (
            <span
              key={index}
              className={`${
                item === "|"
                  ? "text-gray-400 cursor-default"
                  : "cursor-pointer transition hover:text-[var(--primary-color-light)]"
              } ${item === "preview" && "text-[var(--primary-color-light)]"} 
              ${item == versionId && "text-[var(--primary-color-light)]"}
              `}
            >
              {item}
            </span>
          ))}
        </div>

        {/* preview part */}
        <div className="w-full h-full flex flex-col gap-[20px] radius  overflow-hidden">
          {/* video annotation Preview  */}
          {/* <VideoAnnotator
            annotationData={annotationData}
            setAnnotationData={setAnnotationData}
            videoUrl={videoUrl}
          /> */}

          <VideoAnnotation />
        </div>

        {/* comment part */}
        <div className="w-full h-[115px] bg-[var(--primary-color-light)]/20  radius p-4 relative">
          <input
            name="text"
            type="text"
            placeholder="Add a comment ... "
            value={comment.text}
            onChange={handelComment}
            className="w-full  bg-transparent border-none outline-none text-white text-xs"
          />
          {/* upload file  */}
          <input
            ref={uploadRef}
            name="file"
            type="file"
            // value={comment.text}
            onChange={uploadCommentAttachment}
            className="w-full  bg-transparent border-none outline-none text-white text-xs hidden"
          />
          {/* tools top left  */}
          <div className="absolute top-0 right-0  flex items-center justify-between p-4">
            <div
              className="flex items-center gap-2"
              onClick={() => createComment()}
            >
              {/* upload icon  */}
              <div className="flex flex-row gap-2 items-center">
                <span className="text-[10px]">
                  {comment.attachment?.file?.name &&
                    comment.attachment?.file?.name}
                </span>
                <div
                  className="bg-[var(--primary-color-light)]/20 transition hover:bg-[var(--primary-color-light)]/50 cursor-pointer p-2 radius text-xs flex gap-2 items-center w-fit"
                  onClick={handleUpload}
                >
                  {/* Attachments */}
                  <GrAttachment />
                </div>
              </div>
            </div>
          </div>
          {/* bottom  */}
          <div className="absolute bottom-0 left-0  flex items-center justify-between p-4">
            <button
              className="min-w-[100px] bg-[var(--primary-color-light)]/20 transition hover:bg-[var(--primary-color-light)]/50 cursor-pointer p-2 radius flex gap-2 items-center justify-center"
              disabled={createLoading}
            >
              <span className="text-xs font-[200]" onClick={createComment}>
                Send
              </span>
              {createLoading && (
                <span className="text-sm ml-2">
                  <FaSpinner className="animate-spin" />
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* COMMENTS PART  */}
      <div className="w-full flex-1 h-full bg-[var(--primary-color-light)]/20  radius p-4 relative flex flex-col gap-4 ">
        {/* top  part  */}
        {/* <div className="w-full h-[200px] bg-[var(--primary-color-light)]/50  radius"></div> */}
        {/*comments bottom part  */}
        <div className="w-full flex-1 bg-[var(--primary-color-light)]/20 radius overflow-y-auto">
          {/* comments tab switch  */}

          {/* comments list  */}
          <div className="w-full h-full flex flex-col gap-2 px-4 overflow-y-auto">
            {/* comment item  */}

            {theComments && theComments.length > 0 ? (
              <>
                {theComments?.map((comment) => (
                  <div
                    key={comment.id}
                    className="w-full flex gap-2   px-4 py-6 relative"
                  >
                    {/* image part  */}
                    <div className="w-[30px] h-[30px] rounded-full relative">
                      <div className="absolute top-[-5px] left-[-5px] w-[10px] h-[10px] bg-[var(--primary-color-light)]/50 rounded-full"></div>
                      <img
                        src={comment?.author?.avatar || ""}
                        alt="user"
                        className="absolute top-0 left-0  z-10 w-full h-full object-cover rounded-full shrink-0"
                      />
                    </div>
                    {/* contents  */}
                    <div className="flex flex-col gap-2">
                      <span className="text-white text-xs">
                        {comment?.author?.first_name || ""}
                      </span>
                      <span className="text-white/80 text-xs">
                        {convertDate(comment?.created_at)}
                      </span>
                      <span className="text-white text-xs">
                        {comment?.text}
                      </span>
                    </div>
                    {/* line  */}
                    <div className="absolute bottom-0 left-0 w-full h-[1px] line-grad"></div>
                  </div>
                ))}
              </>
            ) : (
              <div className="w-full text-sm font-[200] p-4 flex text-center justify-center">
                There is No comment here!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPageContents;
