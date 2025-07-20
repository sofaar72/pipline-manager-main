import React, { useState } from "react";
import UploadFileItem from "./UploadFileItem";

const UploadFileArea = () => {
  const [uploadItems, setUploadItems] = useState([]);

  const addUploadItem = (item) => {
    setUploadItems([...uploadItems, item]);
  };

  const removeUploadItem = (index) => {
    setUploadItems(uploadItems.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full flex-1 h-full bg-[var(--primary-color-light)]/20 radius overflow-y-scroll px-4 py-4 flex flex-col gap-2">
      {/* add file item  */}
      <button
        onClick={() =>
          addUploadItem({
            id: Date.now(),
            name: "",
            type: "",
          })
        }
        className="w-full flex items-center justify-center h-[40px] flex justify-between gap-2 p-2 bg-black radius text-[10px] relative border transition hover:bg-black/50 border-white/40 cursor-pointer"
      >
        <span>Add File Item</span>
        <img
          className="w-[20px] h-[20px] object-contain"
          src="/icons/Add.svg"
          alt=""
        />
      </button>
      {/* file item  */}
      {uploadItems.map((item, index) => (
        <UploadFileItem
          key={index}
          index={index}
          removeUploadItem={removeUploadItem}
        />
      ))}
    </div>
  );
};

export default UploadFileArea;
