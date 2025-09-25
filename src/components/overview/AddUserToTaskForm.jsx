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

import { ToastContainer } from "react-toastify";
import CustomInput from "./CustomInput";
import TheButton from "./TheButton";
import TheDropDown from "./TheDropDown";
import { entities as EntTypes } from "../../fakeContents/Entities";
import { useEntities } from "../../hooks/useEntities";
import { useVariations } from "../../hooks/useVariations";
import { useTasks } from "../../hooks/useTasks";
import { useUser } from "../../hooks/useUser";

const AddUserToTaskForm = ({
  header = "Assign To User",
  setCreateModal = () => {},
  selectedProject = { id: null, name: "" },
  fetchData = () => {},
  taskId,
  users = [],
}) => {
  const { typeResults, typeLoading, typeError, fetchAllTypes } = useTypes();
  const { getUsers, userResults, userLoading } = useUser();
  // const {
  //   variationResults,
  //   variationLoading,
  //   variationError,
  //   fetchAllVariation,
  // } = useVariations();
  const {
    updateTheTask,
    createTaskLoading,
    taskUpdateSuccess,
    updateTaskLoading,
    updateTaskError,
  } = useTasks();
  const [checked, setChecked] = useState(false);
  const [taskTypes, setTaskTypes] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const [success, setSuccess] = useState(false);

  const submitForm = (values) => {
    // console.log(id);
    const assineesArray = values.assignees.map((assignee) => assignee.id);
    const newData = {
      assignee: assineesArray,
      type: values.type.id,
      parent_type: "PRD",
      status: 540,
    };

    updateTheTask(taskId, newData, setCreateModal, setSuccess);
  };

  // fetch Types
  useEffect(() => {
    fetchAllTypes();
    getUsers();
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
    if (success) {
      fetchData();
    }
  }, [success]);

  return (
    <>
      {/* show the toasts  */}
      <ToastContainer />
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

            const handleAssigneeChange = (selectedAssignees) => {
              console.log(selectedAssignees);
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
                  className="w-full  flex-1 flex flex-col gap-[10px] px-0 overflow-hidden h-lg text-white"
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                >
                  {/* inputs  */}
                  <div className="w-full  flex flex-1  gap-4 ">
                    <div className="w-fit h-full">
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
                        users={users}
                      />
                    </div>
                    <div className="h-lg w-full h-[300px] flex-1  flex flex-col border-2 border-[var(--overview-color-four)] radius p-2 gap-4">
                      <div className="w-fit shrink-0">Assigned Users</div>
                      <div className="w-full h-[0.5px] bg-[var(--overview-color-four)]/50 radius"></div>
                      <div className="w-full flex items-center gap-2">
                        {users?.map((user) => {
                          return (
                            <img
                              className="rounded-full w-[40px] h-[4s0px] transition cursor-pointer"
                              src={user.avatar}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* actions  */}
                  <div className="w-full flex justify-end gap-2">
                    <TheButton
                      cClass="w-fit !flex !items-center !justify-between gap-2 h-regular !bg-[var(--overview-color-done)]"
                      // onClick={() => {}}
                      loading={updateTaskLoading}
                      type="submit"
                    >
                      <span>Add User</span>
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

export default AddUserToTaskForm;
