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
import AssignedUsersSearch from "./UpdateTaskModal/AssignedUsersSearch";

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
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [assignee, setAssignee] = useState("");

  const submitForm = (values) => {
    // console.log(id);
    const assineesArray = selectedUsers.map((assignee) => assignee.id);
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

  // initialize selected users from prop so they always show at bottom
  useEffect(() => {
    if (Array.isArray(users) && users.length > 0) {
      const normalized = users.map((u) => ({
        id: u.id,
        first_name: u.first_name || u.name || "",
        avatar: u.avatar,
      }));
      setSelectedUsers(normalized);
    }
  }, [users]);

  // filter users by query
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

  const selectUser = (user) => {
    setSelectedUsers((prev) => {
      const filtered = prev.filter((u) => u.id !== user.id);
      return [
        ...filtered,
        { id: user.id, first_name: user.first_name, avatar: user.avatar },
      ];
    });
  };

  const removeSelectedUser = (user) => {
    setSelectedUsers((prev) => prev.filter((u) => u.id !== user.id));
  };

  useEffect(() => {
    if (success) {
      fetchData();
    }
  }, [success]);

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

            const handleAssigneeChange = () => {};

            return (
              <>
                <form
                  className="w-full  flex-1 flex flex-col gap-[10px] px-0 overflow-hidden h-lg text-white"
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                >
                  {/* inputs  */}
                  <div className="w-full  flex flex-col gap-4 ">
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
                    {/* {selectedUsers?.length > 0 && (
                      <div className="w-full flex flex-col gap-2">
                        <div className="h-lg">Confirm Selection</div>
                        <div className="w-full grid grid-cols-2 gap-2 border border-[var(--overview-color-four)]/50 radius p-2">
                          {selectedUsers.map((u) => (
                            <label
                              key={u.id}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                className="accent-[var(--overview-color-done)]"
                                checked={true}
                                onChange={(e) => {
                                  if (!e.target.checked) removeSelectedUser(u);
                                }}
                              />
                              <img
                                className="w-[28px] h-[28px] rounded-full border"
                                src={
                                  u.avatar ||
                                  "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
                                }
                              />
                              <span className="text-sm">{u.first_name}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )} */}
                  </div>

                  {/* actions  */}
                  <div className="w-full flex justify-end gap-2">
                    <TheButton
                      cClass="w-fit !flex !items-center !justify-between gap-2 h-regular !bg-[var(--overview-color-done)]"
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
