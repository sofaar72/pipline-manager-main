import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import FormInputC from "../golbals/FormInputC";
import CbuttonOne from "../golbals/Buttons/CbuttonOne";
import { useTasks } from "../../hooks/useTasks";

import { useVersions } from "../../hooks/useVersions";
import SelectFromTask from "../golbals/SelectFromTask";
import SelectFromFiles from "../golbals/SelectFromFiles";
import CDropDown from "../golbals/CDropDown";
import CdropDownNoBg from "../golbals/CdropDownNoBg";
import UploadFileForm from "./UploadFileForm";
import { useEpisodeManagerContext } from "../../assets/context/EpisodeManagerContext";
import { useLocation } from "react-router-dom";

const CreateOnlyFile = ({
  bgColor = "form-bg",
  title = "Add File",
  titleSize = "text-[14px]",
  submit,
  setOpen = () => {},
  version,
}) => {
  const { dataType } = useEpisodeManagerContext();
  const [selectedTask, setSelectedTask] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);

  const {
    addTask,
    createTaskLoading,
    createTaskError,
    taskSuccess,
    taskResults,
  } = useTasks({
    dataType: dataType === "production" ? "production" : "assets",
  });

  const initialValues = {
    taskId: selectedTask?.id || "", // default empty or pre-filled
    // files: selectedFile ? [selectedFile] : [],
  };

  useEffect(() => {
    setSelectedTask({ id: "23131" }); // example task
    // setSelectedFile({ name: "file1.pdf" }); // example file object
  }, []);

  return (
    <div className="w-full h-full  form-bg radius px-[10px] py-[40px] flex flex-col items-center justify-between gap-4">
      <h2 className={` text-center ${titleSize} uppercase font-[600]`}>
        {title}
      </h2>

      <UploadFileForm versionId={version?.id} />
    </div>
  );
};

export default CreateOnlyFile;
