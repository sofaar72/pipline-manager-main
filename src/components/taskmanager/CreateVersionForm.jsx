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
import { useDispatch, useSelector } from "react-redux";
import { fetchFiles } from "../../store/Slices/FileSlice";
import VersionsFileTogglerBox from "./VersionsFileTogglerBox";
import { toast, ToastContainer } from "react-toastify";

const CreateVersionForm = ({
  bgColor = "form-bg",
  title = "Create Version",
  titleSize = "text-[14px]",
  submit,
  setOpen = () => {},
  taskId = "",
}) => {
  const { createNewVersion, createVersionLoading, createVersionError } =
    useVersions();
  const {
    addTask,
    createTaskLoading,
    createTaskError,
    taskSuccess,
    taskResults,
  } = useTasks();

  const [versionFiles, setVersionFiles] = useState([]);
  const initialValues = {
    taskId: taskId || "", // default empty or pre-filled
    // files: selectedFile ? [selectedFile] : [],
  };

  const submitForm = (taskData) => {
    const data = {
      task: taskId,
      files: versionFiles,
    };

    if (versionFiles.length > 0) {
      createNewVersion(data);
      // setOpen(false);
    } else {
      toast.error("Please upload files");
    }
  };
  const dispatch = useDispatch();
  const { files, loading: filesLoading } = useSelector((state) => state.file);

  useEffect(() => {
    dispatch(fetchFiles());
  }, []);

  useEffect(() => {
    console.log(createVersionLoading);
  }, [createVersionLoading]);

  // const notify = (message) => toast(message);

  // if (createTaskError) {
  //   notify("test");
  //   return <ToastContainer />;
  // }

  // useEffect(() => {
  //   console.log(createTaskError);
  // }, [createTaskError]);

  return (
    <div className="w-full h-full  form-bg radius px-[10px] py-[40px] flex flex-col items-center justify-between gap-4">
      <h2 className={` text-center ${titleSize} uppercase font-[600]`}>
        {title}
      </h2>

      <Formik initialValues={{ ...initialValues }} onSubmit={submitForm}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <>
            <form
              className="w-full flex-1 flex flex-col gap-[20px] px-4 overflow-hidden "
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              {/* task Id  */}
              <div className="w-full h-[42px] bg-transparent relative text-white border border-white/20 rounded-[5px] flex items-center justify-between px-[10px]">
                <span>Task ID :</span>
                <span>{values.taskId}</span>
              </div>

              <VersionsFileTogglerBox
                versionFiles={versionFiles}
                setVersionFiles={setVersionFiles}
                files={files}
                filesLoading={filesLoading}
              />
              <CbuttonOne
                height="h-[40px]"
                color="var(--primary-color-lowest)"
                type="submit"
                loading={createVersionLoading}
                disabled={createVersionLoading || versionFiles.length === 0}
              >
                <span className="text-sm">
                  {createVersionLoading ? "Creating..." : "Create Version"}
                </span>
                <img
                  className="w-[20px] h-[20px] object-contain"
                  src="/icons/Add.svg"
                  alt=""
                />
              </CbuttonOne>
              {/* <button className="" type="submit">
                Create
              </button> */}
            </form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default CreateVersionForm;
