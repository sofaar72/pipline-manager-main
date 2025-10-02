import React, { useCallback, useEffect, useState } from "react";
import { Formik } from "formik";
import CbuttonOne from "../golbals/Buttons/CbuttonOne";
import { useEpisodeManagerContext } from "../../assets/context/EpisodeManagerContext";
import FormInputC from "../golbals/FormInputC";
import TheGlobalDropDown from "../golbals/TheGlobalDropDown";
import { useProject } from "../../hooks/useProject";
import { useTypes } from "../../hooks/useTypes";
import Loading from "../golbals/Loading";
import { useEntityFormSchema } from "../../hooks/useFormSchema";

import CustomInput from "./CustomInput";
import TheButton from "./TheButton";
import TheDropDown from "./TheDropDown";
import { entities as EntTypes } from "../../fakeContents/Entities";
import { useEntities } from "../../hooks/useEntities";
import { useVariations } from "../../hooks/useVariations";
import { useTasks } from "../../hooks/useTasks";
import { useUser } from "../../hooks/useUser";
import { useOverview } from "../../hooks/overview/useOverView";

const CreateTaskForm = ({
  header = "Create Task",
  setCreateModal = () => {},
  selectedProject = { id: null, name: "" },
  id = null,
  fetchData = () => {},
  selectedEntType,
}) => {
  const { typeResults, typeLoading, typeError, fetchAllTypes } = useTypes();
  const { getUsers, userResults, userLoading } = useUser();
  const {
    filmLoading,
    films,
    getTheEntities,
    assetResults,
    assetLoading,
    allVariationsResults,
    allVariationsLoading,
    allVariationsError,
  } = useOverview();
  // const {
  //   variationResults,
  //   variationLoading,
  //   variationError,
  //   fetchAllVariation,
  // } = useVariations();
  const { addTask, createTaskLoading, taskSuccess } = useTasks();
  const [checked, setChecked] = useState(false);
  const [taskTypes, setTaskTypes] = useState([]);
  const [selectedType, setSelectedType] = useState({
    name: null,
    id: null,
  });
  const [assignees, setAssignees] = useState([]);

  const submitForm = (values) => {
    // console.log(id);
    const assineesArray = values.assignees.map((assignee) => assignee.id);
    const newData = {
      assignee: assineesArray,
      type: values.type.id,
      parent_type: selectedEntType === "Assets" ? "BLD" : "PRD",
      status: 540,
      parent: values.entity.id,
    };

    // Remove empty, null, or undefined values
    const cleanedData = Object.fromEntries(
      Object.entries(newData).filter(
        ([_, value]) =>
          value !== undefined &&
          value !== null &&
          value !== "" &&
          !(typeof value === "object" && Object.keys(value).length === 0)
      )
    );

    addTask(cleanedData, setCreateModal);
  };

  // fetch Types
  useEffect(() => {
    fetchAllTypes();
    getUsers();
    getTheEntities(selectedProject, selectedEntType);
  }, []);
  // set types
  useEffect(() => {
    if (typeResults?.results?.length > 0) {
      const mapped = typeResults.results.map((result) => ({
        id: result.id,
        name: result.name,
      }));

      setTaskTypes(mapped);
    }
  }, [typeResults]);

  // set users
  useEffect(() => {
    if (userResults?.length > 0) {
      const mapped = userResults.map((user) => ({
        id: user.id,
        name: user.first_name + user.last_name,
        avatar: user.avatar,
      }));

      setAssignees(mapped);
    }
  }, [userResults]);

  useEffect(() => {
    fetchData();
  }, [taskSuccess]);

  return (
    <>
      <div
        className="w-[700px] h-fit px-[10px] py-[20px] radius bg-[var(--overview-color-one)] flex flex-col gap-[20px] justify-between transition"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full border-b-1 border-[var(--overview-color-three)]/80 h-lg text-bold text-white flex py-2">
          {header}
        </div>
        <Formik
          initialValues={{
            type: taskTypes[0]?.name || { id: null, name: "Select Type" },
            entity:
              selectedEntType === "Assets"
                ? allVariationsResults[0].name || {
                    id: null,
                    name: "Select Entity",
                  }
                : films?.results[0]?.name || {
                    id: null,
                    name: "Select Entity",
                  },
            assignees: [],
          }}
          enableReinitialize
          onSubmit={submitForm}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => {
            // Handler function that updates Formik's values
            const handleTypeChange = (selectedType) => {
              setFieldValue("type", {
                id: selectedType.id,
                name: selectedType.name,
              });
              setSelectedType({
                id: selectedType.id,
                name: selectedType.name,
              });
            };
            const handleEntityChange = (selected) => {
              setFieldValue("entity", {
                id: selected.id,
                name: selected.name,
              });
            };

            const handleAssigneeChange = (selectedAssignees) => {
              setFieldValue(
                "assignees",
                selectedAssignees.map((a) => ({
                  id: a.id,
                  name: a.name,
                }))
              );
            };

            return (
              <>
                <form
                  className="w-full flex-1 flex flex-col gap-[10px] px-0 overflow-hidden h-lg text-white"
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                >
                  {/* inputs  */}
                  <div className="w-full flex flex-1  gap-4 mb-40">
                    {/* SELECT TYPE  */}
                    <div className="w-fit">
                      <TheDropDown
                        init={values.type.name}
                        items={
                          taskTypes?.map((type, i) => {
                            return {
                              id: type.id,
                              name: type.name,
                            };
                          }) || []
                        }
                        width={"w-[200px]"}
                        funcAfter={handleTypeChange}
                      />
                    </div>
                    {/* SELECT ENTITY  */}
                    <div className="w-fit">
                      <TheDropDown
                        init={values.entity.name}
                        items={
                          selectedEntType === "Assets"
                            ? allVariationsResults?.map((variation) => ({
                                id: variation.id,
                                name: variation.name,
                              })) || []
                            : films?.results?.map((film, i) => {
                                return {
                                  id: film.id,
                                  name: film.name,
                                };
                              }) || []
                        }
                        width={"w-[200px]"}
                        funcAfter={handleEntityChange}
                      />
                    </div>
                    <div className="w-fit">
                      <TheDropDown
                        init={"Assigne to"}
                        items={
                          assignees?.map((assignee, i) => {
                            return {
                              id: assignee.id,
                              name: assignee.name,
                              avatar: assignee.avatar,
                            };
                          }) || []
                        }
                        width={"w-[200px]"}
                        funcAfter={handleAssigneeChange}
                        type="visual"
                      />
                    </div>
                  </div>

                  {/* actions  */}
                  <div className="w-full flex justify-end gap-2">
                    <TheButton
                      cClass="w-fit !flex !items-center !justify-between gap-2 h-regular !bg-[var(--overview-color-done)]"
                      // onClick={() => {}}
                      loading={createTaskLoading}
                      type="submit"
                    >
                      <span>Create</span>
                    </TheButton>
                    <TheButton
                      cClass="flex items-center justify-between gap-2 h-regular "
                      onClick={(e) => {
                        e.preventDefault();
                        setCreateModal(false);
                      }}
                      type=""
                    >
                      <span>Cancel</span>
                    </TheButton>
                  </div>
                </form>
              </>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default CreateTaskForm;
