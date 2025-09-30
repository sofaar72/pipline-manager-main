import React from "react";
import { FaDownload } from "react-icons/fa";
import TheIcon from "../../TheIcon";
import { MdDelete } from "react-icons/md";

const FileItem = ({
  filename = "File Name",
  filedesc = "File Desc",
  isMasterFile = false,
  isPublishFile = false,
  isWipFile = false,
  isPreview = false,
  cClass,
  file,
  remove = () => {},
  fetchVersionPreview,
  versionId,
}) => {
  const testFunc = () => {
    console.log("test");
  };
  return (
    <div
      className={`relative w-full h-[30px] radius border border-[var(--overview-color-one)]  ${
        isMasterFile
          ? "bg-[var(--overview-color-three)]/50"
          : "bg-[var(--overview-color-one)]"
      }  flex gap-10 h-regular text-white/60`}
    >
      <div className="w-1/2 flex items-center gap-2">
        <span className="px-2 h-full flex items-center" title={file?.name}>
          {file?.name?.length > 30 ? file.name.slice(0, 30) + "..." : file.name}
        </span>
        {/* the badge  */}
        {isMasterFile && (
          <div className="px-2 py-[2px] h-fit flex items-center radius justify-center bg-[var(--color-purple-normal-light)]">
            Master
          </div>
        )}
        {isPreview && (
          <div className="px-2 py-[2px] h-fit flex items-center radius justify-center bg-[var(--overview-color-faild)]">
            Preview
          </div>
        )}
        {isPublishFile && (
          <div className="px-2 py-[2px] h-fit flex items-center radius justify-center bg-[var(--overview-color-todo)]">
            Publish
          </div>
        )}
        {isWipFile && (
          <div className="px-2 py-[2px] h-fit flex items-center radius justify-center bg-[var(--overview-color-progress)]">
            Wip
          </div>
        )}
      </div>
      <div className="w-[1px] h-full bg-white"></div>
      <span className="px-2 h-full flex items-center">{file.size} KB</span>

      <div className="w-fit flex items-center gap-2 ml-auto pr-2">
        {/* the download icon  */}

        <a
          href={file.download_url}
          target="_blank"
          rel="noopener noreferrer"
          download
          onClick={(e) => e.stopPropagation()}
        >
          <TheIcon cClass="!border-none !p-0 !h-[20px] !w-[20px]">
            <FaDownload />
          </TheIcon>
        </a>
        {/* delete file  */}
        <TheIcon
          cClass="!border-none !p-0 !h-[20px] !w-[20px] cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            remove(file.media_id, fetchVersionPreview, versionId.id);
          }}
        >
          <MdDelete />
        </TheIcon>
      </div>
    </div>
  );
};

export default FileItem;
