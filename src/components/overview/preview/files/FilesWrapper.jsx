import React, { useState } from "react";

import FilesHeader from "./FilesHeader";
import FilesList from "./FilesList";
import GlobalPureModal from "../../../golbals/GlobalPureModal";
import UploadFileForm from "./UploadFileForm";

const FilesWrapper = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full h-full flex-1 flex flex-col gap-[10px]">
        <FilesHeader setOpen={setOpen} />
        <FilesList />
      </div>
      {/* add the upload file modal  */}
      <GlobalPureModal open={open} setOpen={setOpen}>
        <UploadFileForm />
      </GlobalPureModal>
    </>
  );
};

export default FilesWrapper;
