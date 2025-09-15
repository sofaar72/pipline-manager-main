import React, { useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { IoIosRefresh } from "react-icons/io";
import CustomInput from "../../CustomInput";
import TheButton from "../../TheButton";

const UploadedItem = ({
  name,
  size,
  type = null,
  del = () => {},
  choose = () => {},
  id = null,
  index = null,
  addSuffix = () => {},
  uploadProgress,
  pauseUpload,
  resumeUpload,
  retryUpload,
}) => {
  const uploadInputRef = useRef();

  const [suffix, setSuffix] = useState(false);
  const [suffixValue, setSuffixVaule] = useState("");

  const toggleSuffix = () => {
    setSuffix(!suffix);
  };

  const addTheSuffix = (e) => {
    addSuffix(e, index, type, suffix);
    toggleSuffix();
  };
  return (
    <div className="w-full flex flex-col gap-2 cursor-pointer">
      {/* file itself  */}
      {name && size ? (
        <>
          <div
            onClick={toggleSuffix}
            className="w-full h-[40px] radius bg-[var(--overview-color-three)] transition hover:bg-[var(--overview-color-four)] px-2 py-1 flex gap-2 justify-between h-small items-center"
          >
            <div className="flex flex-col h-full gap-1 justify-between items-start">
              <div className="w-fit h-full flex items-center gap-4">
                {suffix && (
                  <div
                    onClick={(e) => e.stopPropagation()} // ⛔ stop bubbling to toggleSuffix
                    className="flex items-center"
                  >
                    <CustomInput
                      label="Suffix"
                      onChange={(e) => {
                        setSuffixVaule(e.target.value); // no need for stopPropagation here anymore
                      }}
                      noLabel
                      type="text"
                      placeholder="suffix"
                      value={suffixValue}
                      inputClass="!w-full !h-full !flex-1 !border-none "
                      cClass="!w-[50px] h-full "
                    />
                  </div>
                )}
                <span>
                  {name.length > 15 ? name.slice(0, 15) + "..." : name}
                </span>
              </div>
              {!suffix && <span>{size}</span>}
            </div>
            {suffix ? (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  addTheSuffix(e);
                }}
              >
                <FaPlus className="h-lg" />
              </span>
            ) : (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  del(id, type);
                }}
              >
                <MdDelete className="h-lg" />
              </span>
            )}
          </div>
        </>
      ) : (
        <div
          onClick={() => {
            // e.preventDefault();
            uploadInputRef.current.click();
          }}
          className="w-full h-[40px] radius bg-[var(--overview-color-three)]/20 transition hover:bg-[var(--overview-color-four)] px-2 py-1 flex gap-2 justify-between h-small items-center"
        >
          <div className="flex h-full justify-between items-center">
            <span>choose file</span>
            <input
              ref={uploadInputRef}
              type="file"
              className="hidden"
              onChange={(e) => choose(e, index, type)}
            />
          </div>
          <span
            onClick={(e) => {
              e.stopPropagation();
              del(id, type);
            }}
          >
            <MdDelete className="h-lg" />
          </span>
        </div>
      )}
      {/* preview part  */}
      {name && size && uploadProgress[name] && (
        <div className="w-full flex flex-col gap-1">
          <div className="w-full flex items-center gap-2 ">
            <div className="relative w-full h-[3px] rounded-full bg-[var(--overview-color-three)] overflow-hidden">
              <div
                className="absolute left-0  h-full bg-[var(--overview-color-done)]"
                style={{ width: `${uploadProgress[name] || 0}%` }}
              ></div>
            </div>
            <span className="h-small">
              {uploadProgress[name] ? `${uploadProgress[name]}` : "Waiting..."}%
            </span>
          </div>
          <div className="w-full justify-between flex items-center gap-2 h-small">
            <span className="h-regular" onClick={() => retryUpload(name)}>
              <IoIosRefresh />
            </span>
            <span>
              {/* {uploadProgress[name] === "100%" ? "done" : "in Progress"}} */}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadedItem;
