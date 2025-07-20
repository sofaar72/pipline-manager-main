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

const CreateVersionForm = ({
  bgColor = "form-bg",
  title = "Create Version",
  titleSize = "text-[14px]",
  submit,
  setOpen = () => {},
}) => {
  const [selectedTask, setSelectedTask] = useState({});
  const [selectedFile, setSelectedFile] = useState({});
  const { createNewVersion } = useVersions();
  const {
    addTask,
    createTaskLoading,
    createTaskError,
    taskSuccess,
    taskResults,
  } = useTasks();

  const initialValues = {
    taskId: "23131",
    files: [],
  };

  const submitForm = (taskData) => {
    // console.log(taskData);
    const data = {
      taskId: 31213,
      files: [],
    };
    createNewVersion(data);
    setOpen(false);
  };

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
            >
              {/* task Id  */}
              <div className="w-full h-[42px] bg-transparent relative text-white border border-white/20 rounded-[5px] flex items-center justify-between px-[10px]">
                <span>Task ID :</span>
                <span>{values.taskId}</span>
              </div>

              {/* Upload file area here  */}
              <div className="w-full flex-1 h-full bg-[var(--primary-color-light)]/20 radius overflow-y-scroll px-4 py-4">
                {/* file item  */}
                <div className="w-full h-[40px] flex justify-between gap-2 p-2 bg-[var(--primary-form-bg)] radius text-[10px] relative">
                  <input
                    className="absolute top-0 left-0 placeholder:text-white p-2 flex items-center h-full "
                    type="text"
                    placeholder="File Name ..."
                  />

                  <div className="flex gap-4 items-cente flex-1 w-full flex-1 justify-end">
                    {/* select part  */}
                    <CdropDownNoBg
                      options={["Preview", "Export", "Resource"]}
                      init="Select file Type"
                      select={() => {}}
                    ></CdropDownNoBg>

                    {/* add file part  */}
                    <button className="text-white text-[10px] flex items-center gap-1">
                      <span className="">Add</span>
                      <img
                        className="w-[20px] h-[20px] object-contain"
                        src="/icons/Add.svg"
                        alt=""
                      />
                    </button>
                  </div>
                </div>
              </div>

              <CbuttonOne
                height="h-[30px]"
                color="var(--primary-color-lowest)"
                type="submit"
                loading={createTaskLoading}
              >
                <span className="text-sm">Create Version</span>
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
