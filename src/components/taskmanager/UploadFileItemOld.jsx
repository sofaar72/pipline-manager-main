import React, { useEffect, useRef, useState } from "react";
import CdropDownNoBg from "../golbals/CdropDownNoBg";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { BiSolidCheckboxChecked } from "react-icons/bi";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

const UploadFileItem = ({
  index,
  removeUploadItem,
  fileDatas,
  files,
  setFiles,
  setFileDatas,
  userId,
  id,
}) => {
  const [fileType, setFileType] = useState("");
  const [fileName, setFileName] = useState("File Name ...");
  const [fileSize, setFileSize] = useState("File Size ...");
  const [fileSelected, setFileSelected] = useState(false);
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  const addToFileDatas = (file) => {
    setFileSelected(!fileSelected);
    // toast.success("File added successfully");
  };

  useEffect(() => {
    if (fileSelected) {
      // toast.success("File added successfully");

      if (
        file &&
        fileType &&
        fileName &&
        fileSize &&
        fileType !== "Select file Type" &&
        fileName !== "File Name ..." &&
        fileSize !== "File Size ..."
      ) {
        setFileDatas([
          ...fileDatas,
          {
            id: id,
            // type: fileType,
            is_preview: fileType === "is_preview" ? true : undefined,
            is_export: fileType === "is_export" ? true : undefined,
            is_resource: fileType === "is_resource" ? true : undefined,
            name: fileName,
            size: fileSize,
            // file: file,
            uploaded_by: userId,
          },
        ]);
        setFiles([...files, file]);
      }
    } else {
      setFileDatas(fileDatas.filter((_, i) => i !== index));
      setFiles(files.filter((_, i) => i !== index));
      // toast.error("File removed successfully");
    }
  }, [fileSelected]);

  const handleUploadFile = (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (file.size) {
      setFileSize(file.size);
    }
    if (file.name) {
      setFileName(file.name);
    }

    // console.log(file);
  };

  const uploadRef = useRef(null);

  const uploadFileTrigger = () => {
    uploadRef.current.click();
  };
  useEffect(() => {
    return () => {
      setFile(null);
    };
  }, []);

  return (
    <div
      className={`w-full  flex justify-between gap-2 p-2 transition  ${
        dragging
          ? "bg-[var(--secondary-normal)]/10"
          : "bg-[var(--primary-form-bg)]"
      } ${file ? "!bg-[#653069]" : ""} ${
        fileSelected ? "!bg-[var(--third-normal)]/20" : ""
      } radius text-[10px] relative border border-white/40`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDragging(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
          setFile(file);
          setFileName(file.name);
          setFileSize((file.size / (1024 * 1024)).toFixed(2) + " Mb");
        }
      }}
    >
      {/* toast component  */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        theme="dark"
      />

      {/* <input
        className="absolute top-0 left-0 placeholder:text-white p-2 flex items-center h-full "
        type="text"
        placeholder="File Name ..."
        value={fileName}
        // onChange={(e) => setFileName(e.target.value)}
      /> */}
      <div className="w-full flex justify-between gap-10 h-full gap-2">
        <div className="flex-1  flex flex-col justify-between gap-3">
          {/* upload file  */}
          <input
            type="file"
            ref={uploadRef}
            hidden
            onChange={(e) => handleUploadFile(e)}
          />
          <div
            className={`w-fit flex items-center gap-2 bg-[var(--primary-add-file-bg)] radius px-2 py- cursor-pointer py-1  ${
              dragging ? " bg-[var(--primary-add-file-bg)]/10" : ""
            }
            ${fileSelected ? "!bg-[var(--third-normal)]/50" : ""}
            `}
            onClick={uploadFileTrigger}
            data-tooltip-id={`tooltip-file-name-${index}`}
          >
            <span className="text-[10px]">
              {file ? file.name.slice(0, 10) + "..." : "No file selected"}
            </span>
            <img
              className="w-[20px] h-[20px] object-contain"
              src="/icons/Download.svg"
              alt=""
            />
          </div>
          {file && (
            <ReactTooltip
              id={`tooltip-file-name-${index}`}
              // variant="light"
              place="top"
              className=" text-white text-[10px] rounded-md p-2"
            >
              <div className="w-fit p-2 flex flex-col gap-2 py-2 ">
                <div className="w-full flex items-center justify-between gap-2">
                  <span className="text-[10px]">File Name</span>
                  <span className="text-[10px]">{fileName}</span>
                </div>
                <div className="w-full flex items-center justify-between gap-2">
                  <span className="text-[10px]">File Size</span>
                  <span className="text-[10px]">{fileSize} Mb</span>
                </div>
              </div>
            </ReactTooltip>
          )}
          {/* <span className="h-full flex items-center p-2 bg-[#211F42] radius ">
            {fileName}
          </span> */}
          {/* <span className="h-full flex items-center p-2 bg-[#211F42] radius ">
            {fileSize} Mb
          </span> */}
        </div>

        <div className=" flex flex-col justify-between items-end gap-2 ">
          <div className="flex items-center gap-2">
            <div className="w-fit">
              {/* select part  */}
              <CdropDownNoBg
                options={["is_preview", "is_export", "is_resource"]}
                init="Select file Type"
                select={(e) => setFileType(e)}
              ></CdropDownNoBg>
            </div>
            {/* remove part  */}
            <button
              onClick={() => removeUploadItem(id, setFile)}
              className="text-white text-[10px] flex items-center gap-1 cursor-pointer group"
            >
              {/* <span className="group-hover:text-red-500 transition">
                Remove
              </span> */}
              <img
                className="w-[20px] h-[20px] object-contain hover:scale-110 transition-all duration-300 transition group-hover:bg-red-500 rounded-full p-[2px]"
                src="/icons/Delete.svg"
                alt=""
              />
              {/* <span className="text-red-500">Remove</span> */}
            </button>
          </div>

          {/* add file part  */}
          <div className="w-fit flex items-center  gap-2">
            {/* add file  */}

            <button
              className={` text-[10px] flex items-center gap-1 cursor-pointer p-1 radius  transition disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-gray-500/50 ${
                fileSelected
                  ? "bg-[var(--third-normal)] "
                  : "bg-[var(--secondary-normal)]"
              }`}
              onClick={() => addToFileDatas(file)}
              disabled={!file || !fileType || !fileName || !fileSize}
            >
              <span className="">{fileSelected ? "Selected" : "Select"}</span>
              {!fileSelected ? (
                <img
                  className="w-[20px] h-[20px] object-contain"
                  src="/icons/Add.svg"
                  alt=""
                />
              ) : (
                <BiSolidCheckboxChecked className="text-white w-[20px] h-[20px]" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadFileItem;
