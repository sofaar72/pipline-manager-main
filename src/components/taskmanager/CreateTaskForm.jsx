import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import FormInputC from "../golbals/FormInputC";
import CbuttonOne from "../golbals/Buttons/CbuttonOne";
import { useTasks } from "../../hooks/useTasks";

import { useSelector } from "react-redux";
import { useTypes } from "../../hooks/useTypes";
import FormPLaceHolder from "../golbals/PlaceHolders.jsx/FormPlaceHolder";
import { useEpisodeManagerContext } from "../../assets/context/EpisodeManagerContext";
import { toast, ToastContainer } from "react-toastify";
import { useEntities } from "../../hooks/useEntities";
import { useParams } from "react-router-dom";
import { useVariations } from "../../hooks/useVariations";
import { useUser } from "../../hooks/useUser";
import { useAssets } from "../../hooks/useAssets";

const CreateTaskForm = ({
  title = "Create Task",
  titleSize = "text-[14px]",
  fromOverView = false,
  noTaskResult = false,

  setOpen = () => {},
}) => {
  const { typeResults, typeLoading, typeError, fetchAllTypes } = useTypes();
  const {
    variationResults,
    variationLoading,
    variationError,
    fetchAllVariation,
  } = useVariations();
  // const { typeResults, typeLoading, typeError, fetchAllTypes } = useE();
  const { dataType } = useEpisodeManagerContext();

  const {
    addTask,
    createTaskLoading,
    createTaskError,
    taskSuccess,
    taskResults,
  } = useTasks({
    dataType: dataType === "production" ? "production" : "assets",
  });
  const [checked, setChecked] = useState(false);
  const initialValues = {
    type: 2,
  };

  const [assignees, setAssignees] = useState([]);
  const [selectedAssigniees, setSelectedAssignees] = useState([]);
  const [selectedType, setSelectedType] = useState({});
  const [selectedVariation, setSelectedVariation] = useState({});

  const { entityResults, entityLoading, entityError, fetchAllEntities } =
    useEntities();

  const { assetResults } = useAssets();

  const { id } = useParams();

  const submitForm = (taskData) => {
    // console.log(taskData);
    const data = {
      type: selectedType?.id,

      // assignee: assignees.map((assine) => assine.id),
      // assignee: [975, 1309],
      assignee: selectedAssigniees.map((selected) => selected.id),
      status: 540,
      parent_type: dataType === "production" ? "PRD" : "BLD",
      parent: dataType === "production" ? id : selectedVariation?.id,

      // film:
    };
    addTask(data, setOpen, noTaskResult);
    // setOpen(false);
  };

  const { getUsers, userResults, userLoading, userErrors } = useUser();
  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    setAssignees(userResults);
  }, [userResults]);

  useEffect(() => {
    if (entityResults.length > 0 || assetResults.length > 0) {
      fetchAllTypes();
      if (dataType === "assets") {
        fetchAllVariation(id);
      }
    }
    // if (dataType === "assets") {

    // }
  }, []);

  const selectType = (type) => {
    setSelectedType(type);
  };

  const selectVariation = (variation) => {
    setSelectedVariation(variation);
  };

  // if (createTaskError) {
  //   notify("test");
  //   return <ToastContainer />
  // }

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
    <div className="w-full h-full  form-bg radius px-[10px] py-[40px] flex flex-col items-center justify-between text-white">
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

              <div className="w-full relative z-[99999]">
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
              </div>

              {/* SELECT ENTITY IF IN OVERVIEW  */}
              {fromOverView && (
                <span>from over view goes here</span>
                // <div className="w-full relative z-[99999]">
                //   <FormInputC
                //     type="select2"
                //     name="task_type"
                //     placeholder="Select Type"
                //     formValue={values.assignee}
                //     checked={checked}
                //     types={typeResults}
                //     getTypes={selectType}
                //     selectedType={selectedType}
                //   ></FormInputC>
                // </div>
              )}

              {dataType === "assets" && (
                <FormInputC
                  type="select_variation"
                  name="task_type"
                  placeholder="Select Variation"
                  variations={variationResults}
                  selectedVariation={selectedVariation}
                  selectVariation={selectVariation}
                ></FormInputC>
              )}

              {/* Assignee checkbox  */}
              <div className="mb-auto">
                <FormInputC
                  type="select"
                  name="assigne_to"
                  placeholder="Assign to"
                  formValue={values.assignee}
                  checked={checked}
                  assignees={assignees}
                  setAssignees={setSelectedAssignees}
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
      <ToastContainer />
    </div>
  );
};

export default CreateTaskForm;
