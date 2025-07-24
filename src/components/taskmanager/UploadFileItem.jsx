import React, { useRef, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import CdropDown from "../golbals/CDropDown";
import CdropDownNoBg from "../golbals/CdropDownNoBg";

const UploadFileItem = ({
  id,
  index,
  files,
  setFiles,
  uploadItems,
  setUploadItems,
  removeUploadItem,
}) => {
  const fileInputRef = useRef(null);
  const [fileType, setFileType] = useState("is_preview");

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Update files array
    setFiles((prev) => {
      const updatedFiles = [...prev];
      updatedFiles[index] = file;
      return updatedFiles;
    });

    // Update UI info (name, size, type)
    const updatedItems = [...uploadItems];
    updatedItems[index] = {
      ...updatedItems[index],
      name: file.name,
      // size: (file.size / 1024).toFixed(2) + " KB",
      size: file.size,
      // type: file.type,
      is_export: fileType === "is_export" ? true : undefined,
      is_resource: fileType === "is_resource" ? true : undefined,
      is_preview: fileType === "is_preview" ? true : undefined,
    };
    setUploadItems(updatedItems);
  };

  const handleRemove = () => {
    removeUploadItem(id);
  };

  return (
    <div className="w-full flex items-center justify-between p-2 bg-white/5 border border-white/10 rounded">
      <div className="flex flex-col gap-1 text-sm  ">
        {uploadItems[index]?.name ? (
          <div className="flex  gap-8">
            <div className="flex flex-col gap-1">
              <span className="font- text-xs text-white">
                {uploadItems[index]?.name}
              </span>
              <span className="text-white/60 text-xs">
                {(uploadItems[index]?.size / 1024).toFixed(2) + " KB"} —{" "}
                {uploadItems[index]?.type}
              </span>
            </div>
            <div className="flex flex-col gap-1  text-xs">
              <span className="font- text-xs text-white">Select File Type</span>
              <CdropDownNoBg
                options={["is_preview", "is_export", "is_resource"]}
                init="is_preview"
                select={(e) => setFileType(e)}
              />
            </div>
          </div>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              fileInputRef.current.click();
            }}
            className="text-white/70 text-xs hover:underline"
          >
            Click to choose a file
          </button>
        )}
      </div>

      <div className="flex gap-2 items-center">
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileSelect}
        />
        <button
          onClick={handleRemove}
          className="p-1 text-red-400 hover:text-red-600 transition"
          title="Remove"
        >
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
};

export default UploadFileItem;
