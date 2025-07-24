import React, { useEffect, useState } from "react";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";

const FilesItemExport = ({
  file,
  download = true,
  setVersionFiles = () => {},
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [mediaId, setMediaId] = useState(null);

  useEffect(() => {
    if (isChecked) {
      setVersionFiles((prev) => [...prev, file?.media_id]);
    } else {
      setVersionFiles((prev) => prev.filter((id) => id !== file?.media_id));
    }
  }, [isChecked]);
  return (
    <a
      href={file?.download_url}
      download
      target="_blank"
      rel="noopener noreferrer"
      className={`w-full radius h-[60px] flex gap-[15px]  px-[4px] py-[4px] cursor-pointer transition relative border border-white/20 ${
        !download && isChecked ? "!bg-[var(--third-normal)]/50" : "file-bg "
      }`}
      onClick={() => {
        setIsChecked(!isChecked);
      }}
    >
      <div className="w-[15px] h-[15px] radius ">
        <img
          className="w-full h-full object-contain"
          src="/icons/File.svg"
          alt=""
        />
      </div>

      {/* text part  */}
      <div className="w-full h-full flex flex-col gap-0 justify-between text-[10px]">
        <div className="flex gap-2 items-center">
          <span className=""> File Name</span>
          <span className=""> {file?.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="">Size</span>
          <span className="">{file?.size} mb</span>
        </div>
        {download ? (
          <div className="w-full flex items-center justify-end gap-2">
            <span className="">Download</span>
            <img
              className="w-[15px] h-[15px] flex items-center justify-center"
              src="/icons/Download.svg"
              alt=""
            />
          </div>
        ) : (
          // checked
          <div className="w-full flex items-center justify-end gap-2 p-1">
            {isChecked ? (
              <ImCheckboxChecked className="w-[15px] h-[15px] radius" />
            ) : (
              <ImCheckboxUnchecked className="w-[15px] h-[15px] radius" />
            )}
          </div>
        )}
      </div>
    </a>
  );
};

export default FilesItemExport;
