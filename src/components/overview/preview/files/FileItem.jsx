import React, { useState } from "react";
import { FaDownload } from "react-icons/fa";
import TheIcon from "../../TheIcon";
import { MdDelete } from "react-icons/md";
import { FaCopy } from "react-icons/fa6";

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
  const [copied, setCopied] = useState(false);

  const formatSizeMB = (sizeInKb) => {
    if (typeof sizeInKb !== "number" || isNaN(sizeInKb)) return "-";
    const sizeInMb = sizeInKb / 1024;
    return `${sizeInMb.toFixed(2)} MB`;
  };

  console.log(file);

  // ✅ Copy file ID to clipboard
  const copyFileId = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(file?.media_id || "");
      setCopied(true);
      // Hide popup after 1.5 seconds
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div
      className={`relative w-full h-[30px] radius border border-[var(--overview-color-one)]  ${
        isMasterFile
          ? "bg-[var(--overview-color-three)]/50"
          : "bg-[var(--overview-color-one)]"
      } flex gap-10 h-regular text-white/60`}
    >
      <div className="w-1/3 flex items-center gap-2 border-r border-white/20 overflow-hidden">
        <span className="px-2 h-full flex items-center" title={file?.name}>
          {file?.name?.length > 100
            ? file.name.slice(0, 100) + "..."
            : file.name}
        </span>
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

      <span className="w-[100px] px-2 h-full flex items-center border-r border-white/20">
        {formatSizeMB(file?.size)}
      </span>
      <span className="px-2 h-full flex items-center">
        Created At: {file.created_at}
      </span>

      <div className="w-fit flex items-center gap-2 ml-auto pr-2 relative">
        {/* ✅ Copy to clipboard with popup */}
        <div className="relative">
          <TheIcon
            cClass="!border-none !p-0 !h-[20px] !w-[20px] cursor-pointer"
            onClick={copyFileId}
          >
            <FaCopy />
          </TheIcon>

          {/* Popup */}
          {copied && (
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-[2px] rounded-md shadow-md whitespace-nowrap">
              File Id Copied!
            </div>
          )}
        </div>

        {/* Download file */}
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

        {/* Delete file */}
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
