import React, { useCallback, useEffect, useState } from "react";
import { Formik } from "formik";
import CbuttonOne from "../../golbals/Buttons/CbuttonOne";
import { useEpisodeManagerContext } from "../../../assets/context/EpisodeManagerContext";
import FormInputC from "../../golbals/FormInputC";
import TheGlobalDropDown from "../../golbals/TheGlobalDropDown";
import { useProject } from "../../../hooks/useProject";
import { useTypes } from "../../../hooks/useTypes";
import Loading from "../../golbals/Loading";
import { useEntityFormSchema } from "../../../hooks/useFormSchema";

import { ToastContainer } from "react-toastify";
import CustomInput from "../CustomInput";
import TheButton from "../TheButton";
import TheDropDown from "../TheDropDown";
import { entities as EntTypes } from "../../../fakeContents/Entities";
import { useEntities } from "../../../hooks/useEntities";
import { useVariations } from "../../../hooks/useVariations";
import { useTasks } from "../../../hooks/useTasks";
import { useUser } from "../../../hooks/useUser";
import { useOverview } from "../../../hooks/overview/useOverView";
import { Statuses } from "../../../fakeContents/SampleStatuses";
import AssignedUsersSearch from "./AssignedUsersSearch";

const UpdateTaskForm = ({
  setCreateModal = () => {},
  taskIdies,
  selectedProject = { id: null, name: "" },
  id = null,
  fetchData = () => {},
}) => {
  const { getUsers, userResults, userLoading } = useUser();

  const {
    fetchAllTaskStatuses,
    statusesLoading,
    statusesResults,
    updateTheTask,
    updateResults,
  } = useTasks();

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [success, setSuccess] = useState(false);

  const [taskStatuses, setTaskStatuses] = useState([]);

  const [assignee, setAssignee] = useState("");

  const submitForm = (values) => {
    // console.log(id);
    const assineesArray = selectedUsers.map((assignee) => assignee.id);
    const newData = {
      assignee: assineesArray,
      status: values.status.id,
      note: values.note,
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
    taskIdies.forEach((task) => {
      updateTheTask(task, cleanedData, setCreateModal, setSuccess);
    });
  };

  // GET USERS
  useEffect(() => {
    getUsers();

    fetchAllTaskStatuses();
  }, []);

  useEffect(() => {
    if (assignee && userResults) {
      const users = userResults.filter((user) =>
        user.first_name.toLowerCase().includes(assignee.toLowerCase())
      );

      setFilteredUsers(users);
    } else {
      setFilteredUsers([]);
    }
  }, [userResults, assignee]);

  // const selectUser = (user) => {
  //   setSelectedUsers((prev) => {
  //     // check if user already exists
  //     const exists = prev?.some((u) => u.id === user.id);
  //     if (exists) return prev; // no change if already selected

  //     return [
  //       ...prev,
  //       {
  //         id: user.id,
  //         first_name: user.first_name,
  //         avatar: user.avatar,
  //       },
  //     ];
  //   });
  // };
  // or
  const selectUser = (user) => {
    setSelectedUsers((prev) => {
      // remove any existing instance, then add the new one
      const filtered = prev.filter((u) => u.id !== user.id);
      return [
        ...filtered,
        { id: user.id, first_name: user.first_name, avatar: user.avatar },
      ];
    });
  };

  const removeSelectedUser = (user) => {
    console.log(user);
    setSelectedUsers((prev) => {
      // check if user already exists

      return prev.filter((u) => u.id !== user.id);
    });
  };

  useEffect(() => {
    if (success) {
      fetchData();
    }
  }, [success]);

  return (
    <>
      <ToastContainer />
      {/* show the toasts  */}
      <div
        className="w-full h-fit flex flex-col gap-[20px] justify-between transition"
        onClick={(e) => e.stopPropagation()}
      >
        <Formik
          initialValues={{
            status: { id: null, name: "Select new Status (optional)" },
            note: "",
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

            const handleStatusChange = (status) => {
              setFieldValue("status", { id: status.id, name: status.name });
            };

            return (
              <>
                <form
                  className="w-full flex-1 flex flex-col gap-[10px] px-0 overflow-hidden h-lg text-white"
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                >
                  {/* inputs  */}
                  <div className="w-full flex flex-col  gap-4 mb-40">
                    {/* SELECT Status  */}
                    <div className="w-fit">
                      <TheDropDown
                        init={values.status.name}
                        items={
                          statusesResults?.map((status, i) => {
                            return {
                              id: status.id,
                              name: status.name,
                            };
                          }) || []
                        }
                        width={"w-[200px]"}
                        funcAfter={handleStatusChange}
                      />
                    </div>

                    <div className="w-full">
                      <CustomInput
                        name="note"
                        label="Comment"
                        onChange={handleChange}
                        type="description"
                        inputClass="w-full"
                        placeholder="Description ..."
                        value={values.note}
                      />
                    </div>
                    <div className="w-full">
                      <AssignedUsersSearch
                        setAssignee={setAssignee}
                        assignee={assignee}
                        filteredUsers={filteredUsers}
                        selectedUsers={selectedUsers}
                        removeUser={removeSelectedUser}
                        selectUser={selectUser}
                      />
                    </div>
                  </div>

                  {/* actions  */}
                  <div className="w-full flex justify-end gap-2">
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

                    <TheButton
                      cClass="w-fit !flex !items-center !justify-between gap-2 h-regular !bg-[var(--overview-color-done)]"
                      // onClick={() => {}}
                      loading={statusesLoading}
                      type="submit"
                    >
                      <span>Update All</span>
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

export default UpdateTaskForm;
