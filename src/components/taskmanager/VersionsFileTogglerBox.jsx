import React, { useEffect, useState } from "react";
import FetchFilesList from "./FetchFilesList";
import UploadFileForm from "./UploadFileForm";

const VersionsFileTogglerBox = ({
  versionFiles,
  setVersionFiles,
  files,
  filesLoading,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    setVersionFiles([]);
  }, [isChecked]);

  return (
    <>
      <div className="w-full h-[400px] flex flex-col gap-4 items-end overflow-hidden">
        <label className="flex cursor-pointer select-none items-center gap-2 px-4 py-2">
          {isChecked ? (
            <span className="text-sm">Select Files</span>
          ) : (
            <span className="text-sm">Upload Files</span>
          )}
          <div className="relative">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="sr-only"
            />
            <div
              className={`dot absolute  top-1 h-4 w-4 rounded-full  transition ${
                isChecked ? "bg-white right-1" : "bg-white left-1"
              }`}
            ></div>
            <div className="block h-6 w-10 rounded-full bg-black"></div>
          </div>
        </label>
        <div className="w-full h-full overflow-hidden bg-[var(--primary-form-bg)] radius p-4">
          {isChecked ? (
            <FetchFilesList
              files={files}
              filesLoading={filesLoading}
              setVersionFiles={setVersionFiles}
            />
          ) : (
            <>
              {/* Upload file area here  */}
              <UploadFileForm
                setVersionFiles={setVersionFiles}
                versionFiles={versionFiles}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default VersionsFileTogglerBox;
