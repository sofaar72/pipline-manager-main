import React from "react";
import { FaDownload } from "react-icons/fa";
import TheIcon from "../../TheIcon";

const FileItem = ({
  filename = "File Name",
  filedesc = "File Desc",
  isMasterFile = false,
  isPublishFile = false,
  isWipFile = false,
  cClass,
  file,
}) => {
  return (
    <div
      className={`relative w-full cursor-pointer h-[30px] radius border border-[var(--overview-color-one)] ${
        isMasterFile
          ? "bg-[var(--overview-color-three)]/50"
          : "bg-[var(--overview-color-one)]"
      }  flex gap-10 h-regular text-white/60`}
    >
      <div className="w-[150px] flex items-center gap-2">
        <span className="px-2 h-full flex items-center">
          {file?.name?.length > 20 ? file.name.slice(0, 20) + "..." : file.name}
        </span>
        {/* the badge  */}
        {isMasterFile && (
          <div className="px-2 py-[2px] h-fit flex items-center radius justify-center bg-[var(--color-purple-normal-light)]">
            Master
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

      {/* the download icon  */}
      <TheIcon
        cClass="!border-none !p-0 !h-[20px] !w-[20px] absolute right-[10px] top-1/2 -translate-y-1/2"
        onClick={file.download_url}
      >
        <FaDownload />
      </TheIcon>
    </div>
  );
};

export default FileItem;
