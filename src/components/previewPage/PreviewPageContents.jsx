import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { VideoAnnotator } from "./VideoAnnotator";
import { useEpisodeManagerContext } from "../../assets/context/EpisodeManagerContext";
import { useEntities } from "../../hooks/useEntities";

const sampleComments = [
  {
    id: 1,
    name: "John Doe",
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    time: "2 hours ago",
  },
  {
    id: 2,
    name: "Jane Doe",
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    time: "2 hours ago",
  },
];

const PreviewPageContents = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [comments, setComments] = useState(sampleComments);
  const { dataType } = useEpisodeManagerContext();
  const { entityResults } = useEntities();

  const segments = pathname.split("/").filter(Boolean);
  const pathArray = [];
  segments.forEach((segment, index) => {
    pathArray.push(segment);
    if (index !== segments.length - 1) {
      pathArray.push("|");
    }
  });

  const locationState = useLocation().state;

  return (
    <div className="w-full h-full flex items-center justify-center gap-[20px]">
      <div className="w-full flex-1 h-full flex flex-col justify-between gap-[20px]">
        {/* address part */}
        <div className="w-fit h-[40px] flex items-center gap-[5px] radius text-white text-sm">
          <MdKeyboardDoubleArrowLeft
            // onClick={() => navigate("/task-manager/production")}
            onClick={() => {
              if (dataType && locationState?.id) {
                navigate(`/task-manager/${dataType}/${locationState.id}`, {
                  state: { fromPreview: true, id: locationState.id },
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
              } ${item === "preview" && "text-[var(--primary-color-light)]"}`}
            >
              {item}
            </span>
          ))}
        </div>

        {/* preview part */}
        <div className="w-full h-[740px] flex flex-col gap-[20px] radius">
          <div className="flex items-center gap-2">
            <FaFileAlt className="text-white text-md" />
            <span className="text-white text-md capitalize">File Name</span>
          </div>

          <VideoAnnotator />
        </div>

        {/* comment part */}
        <div className="w-full h-[115px] bg-[var(--primary-color-light)]/20  radius p-4 relative">
          <input
            type="text"
            placeholder="Add a comment ... "
            className="w-full  bg-transparent border-none outline-none text-white text-xs"
          />
          {/* tools top left  */}
          <div className="absolute top-0 right-0  flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <IoMdClose className="text-white text-md cursor-pointer hover:text-gray-400/90 transition" />
            </div>
            <div
              className="flex items-center gap-2"
              onClick={() =>
                setComments([
                  ...comments,
                  {
                    id: comments.length + 1,
                    name: "John Doe",
                  },
                ])
              }
            >
              <IoMdAdd className="text-white text-md cursor-pointer hover:text-gray-400/90 transition" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-[357px] h-full bg-[var(--primary-color-light)]/20  radius p-4 relative flex flex-col gap-4">
        {/* top  part  */}
        <div className="w-full h-[200px] bg-[var(--primary-color-light)]/50  radius"></div>
        {/*comments bottom part  */}
        <div className="w-full flex-1 bg-gray-500/50 radius overflow-y-auto">
          {/* comments tab switch  */}

          {/* comments list  */}
          <div className="w-full h-full flex flex-col gap-2 px-4 overflow-y-auto">
            {/* comment item  */}
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="w-full flex gap-2   px-4 py-6 relative"
              >
                {/* image part  */}
                <div className="w-[30px] h-[30px] rounded-full relative">
                  <div className="absolute top-[-5px] left-[-5px] w-[10px] h-[10px] bg-[var(--primary-color-light)]/50 rounded-full"></div>
                  <img
                    src="/images/sidebar-avatar.png"
                    alt="user"
                    className="absolute top-0 left-0  z-10 w-full h-full object-cover rounded-full shrink-0"
                  />
                </div>
                {/* contents  */}
                <div className="flex flex-col gap-2">
                  <span className="text-white text-xs">John Doe</span>
                  <span className="text-white/80 text-xs">2 hours ago</span>
                  <span className="text-white text-xs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </span>
                </div>
                {/* line  */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] line-grad"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPageContents;
