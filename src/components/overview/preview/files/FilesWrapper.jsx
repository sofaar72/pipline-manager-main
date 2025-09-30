import React, { useState } from "react";

import FilesHeader from "./FilesHeader";
import FilesList from "./FilesList";
import GlobalPureModal from "../../../golbals/GlobalPureModal";
import UploadFileForm from "./UploadFileForm";

const FilesWrapper = ({
  files,
  versionId,
  taskId,
  fetchAllVersions,
  fetchVersionPreview,
}) => {
  const [open, setOpen] = useState(false);
  const [checkedFiles, setCheckedFiles] = useState({
    isExport: true,
    isRecource: true,
    isAll: true,
  });

  return (
    <>
      <div className="w-full h-full flex-1 flex flex-col gap-[10px]">
        <FilesHeader
          setOpen={setOpen}
          checkedFiles={checkedFiles}
          setCheckedFiles={setCheckedFiles}
        />
        {files && files.length > 0 && (
          <FilesList
            files={files}
            checkedFiles={checkedFiles}
            fetchVersionPreview={fetchVersionPreview}
            versionId={versionId}
          />
        )}
      </div>
      {/* add the upload file modal  */}
      <GlobalPureModal open={open} setOpen={setOpen}>
        <UploadFileForm
          versionId={versionId}
          setOpenModal={setOpen}
          openModal={open}
          fetchAllVersions={fetchAllVersions}
          fetchVersionPreview={fetchVersionPreview}
          // taskId={taskId}
        />
      </GlobalPureModal>
    </>
  );
};

export default FilesWrapper;
