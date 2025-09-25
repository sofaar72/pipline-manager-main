import React, { useEffect, useState } from "react";
import CustomInput from "./CustomInput";
import { FaCloudUploadAlt } from "react-icons/fa";
import UploadedItem from "./preview/files/UploadedItem";
import TheButton from "./TheButton";
import TheIcon from "./TheIcon";
import UploadFileForm from "./preview/files/UploadFileForm";

const CreateVersionForm = ({
  open,
  setOpen,
  taskId,
  fetchAllVersions,
  getAllComments,
  versionId,
}) => {
  const [success, setSuccess] = useState(false);
  console.log(taskId);

  useEffect(() => {
    if (success) {
      if (taskId) {
        fetchAllVersions(taskId);
      }
      setSuccess(false);
    }
  }, [success]);

  return (
    <UploadFileForm
      createVersion
      header="Create Version"
      openModal={open}
      setOpenModal={setOpen}
      taskId={taskId}
      setSuccess={setSuccess}
    />
  );
};

export default CreateVersionForm;
