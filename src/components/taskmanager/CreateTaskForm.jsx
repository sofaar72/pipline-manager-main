import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import FormInputC from "../golbals/FormInputC";
import CbuttonOne from "../golbals/Buttons/CbuttonOne";
import { useTasks } from "../../hooks/useTasks";
import { fetchTypes } from "../../store/Slices/TypeSlice";
import { useSelector } from "react-redux";
import { useTypes } from "../../hooks/useTypes";
import FormPLaceHolder from "../golbals/PlaceHolders.jsx/FormPlaceHolder";
import { useEpisodeManagerContext } from "../../assets/context/EpisodeManagerContext";
import { toast, ToastContainer } from "react-toastify";

const CreateTaskForm = ({
  bgColor = "form-bg",
  title = "This Entity Have No Task Create One Firsts",
  titleSize = "text-[14px]",
  submit,
}) => {
  const { activeEntity } = useEpisodeManagerContext();
  const { typeResults, typeLoading, typeError, fetchAllTypes } = useTypes();
  // const { typeResults, typeLoading, typeError, fetchAllTypes } = useE();

  const { addTask, createTaskLoading, createTaskError, taskSuccess } =
    useTasks();
  const [checked, setChecked] = useState(false);
  const initialValues = {
    type: 2,
  };

  const [assignees, setAssignees] = useState([]);
  const [selectedType, setSelectedType] = useState({});

  const submitForm = (taskData) => {
    // console.log(taskData);
    const data = {
      type: selectedType.id,
      // assignee: assignees.map((assine) => assine.id),
      assignee: [975, 1309],
      status: "540",
      parent_type: "PRD",
      parent: activeEntity,

      // film:
    };
    addTask(data);
  };

  useEffect(() => {
    console.log(assignees);
  }, [assignees]);

  useEffect(() => {
    fetchAllTypes();
  }, []);

  const selectType = (type) => {
    setSelectedType(type);
  };

  const notify = (message) => toast(message);

  if (createTaskError) {
    notify("test");
    return <ToastContainer />;
  }

  useEffect(() => {
    console.log(createTaskError);
  }, [createTaskError]);

  if (typeLoading) {
    return (
      <FormPLaceHolder
        classes={
          "w-full h-full  form-bg radius px-[20px] py-[40px] flex flex-col items-center justify-between"
        }
      />
    );
  }
  return (
    <div className="w-full h-full  form-bg radius px-[10px] py-[40px] flex flex-col items-center justify-between">
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
              className="w-full flex-1 flex flex-col gap-[20px] px-4 overflow-hidden"
              onSubmit={handleSubmit}
            >
              {/* <FormInputC
                type="select2"
                name="task_type"
                placeholder="Task Type"
                formValue={values.type}
              ></FormInputC> */}

              <FormInputC
                type="select2"
                name="task_type"
                placeholder="Select Type"
                formValue={values.assignee}
                checked={checked}
                types={typeResults}
                getTypes={selectType}
                selectedType={selectedType}
              ></FormInputC>

              {/* Assignee checkbox  */}
              <div className="mb-auto">
                <FormInputC
                  type="select"
                  name="assigne_to"
                  placeholder="Assign to"
                  formValue={values.assignee}
                  checked={checked}
                  assignees={assignees}
                  setAssignees={setAssignees}
                  check={() => setChecked(!checked)}
                ></FormInputC>
              </div>

              <CbuttonOne
                height="h-[30px]"
                color="var(--primary-color-lowest)"
                type="submit"
                loading={createTaskLoading}
              >
                <span className="text-sm">Create Task</span>
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

export default CreateTaskForm;
