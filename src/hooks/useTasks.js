// hooks/useTasks.js
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  createTask,
  deleteTask,
  fetchAssetsTasks,
  fetchTask,
  fetchTaskCompareVersions,
  fetchTaskStatuses,
  updateTask,
} from "../store/Slices/TaskSlice";
import { useVersions } from "./useVersions";
import { fetchAllUsers } from "../store/Slices/userSlice";
import { toast } from "react-toastify";

export const useTasks = ({ dataType = "production" } = {}) => {
  const [activeTask, setActiveTask] = useState(null);
  const { fetchAllVersions } = useVersions();
  const dispatch = useDispatch();

  const {
    tasks,
    createStatus,
    updateStatus,
    deleteStatus,
    taskStatuses,
    tasksCompareVersions,
  } = useSelector((state) => state.task);
  const {
    results: taskResults,
    loading: taskLoading,
    error: taskError,
  } = tasks || {};
  const {
    results: taskCompareVersionsResults,
    loading: taskCompareVersionsLoading,
    error: taskCompareVersionsError,
  } = tasksCompareVersions || {};
  const {
    success: taskSuccess,
    loading: createTaskLoading,
    error: createTaskError,
  } = createStatus || {};

  const {
    success: taskUpdateSuccess,
    loading: updateTaskLoading,
    error: updateTaskError,
    updateResults,
  } = updateStatus || {};
  const {
    success: taskDeleteSuccess,
    loading: deleteTaskLoading,
    error: deleteTaskError,
  } = deleteStatus || {};
  const { statusesLoading, statusesError, statusesResults } =
    taskStatuses || {};

  const fetchTheTask = (taskId) => {
    dispatch(fetchTask({ id: taskId }));
  };
  const fetchTheTaskVersions = (taskId) => {
    dispatch(fetchTaskCompareVersions({ id: taskId }));
  };

  const fetchAllAssetsTasks = (id) => {
    dispatch(fetchAssetsTasks({ id, queryParams: {} }));
  };

  const selectTask = (id) => {
    setActiveTask(id);
  };

  const fetchTaskVersion = (taskId) => {
    selectTask(taskId);
    fetchAllVersions(taskId);
  };

  const addTask = async (
    taskData,
    closeModal = () => {},
    setSuccess = () => {}
  ) => {
    dispatch(createTask({ ...taskData })).then((res) => {
      if (res.payload) {
        if (dataType === "production") {
          closeModal(false);
          setSuccess(true);
        } else {
        }
      }
    });
  };
  const updateTheTask = async (
    id,
    taskData,
    closeModal = () => {},
    setSuccess = () => {}
  ) => {
    dispatch(updateTask({ id: id, data: { ...taskData } }))
      .then((res) => {
        if (res.payload) {
          setSuccess(true);
          closeModal(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteTheTask = async (id) => {
    return dispatch(deleteTask({ id })).then((res) => {
      if (res.payload) {
        return true; // success
      }
      return false; // failed
    });
  };

  // task statuses
  const fetchAllTaskStatuses = () => {
    dispatch(fetchTaskStatuses());
  };

  return {
    taskResults,
    taskLoading,
    taskError,
    taskSuccess,
    createTaskLoading,
    createTaskError,
    activeTask,
    taskUpdateSuccess,
    updateTaskLoading,
    updateTaskError,
    updateResults,
    taskDeleteSuccess,
    deleteTaskLoading,
    deleteTaskError,
    fetchTaskVersion,
    fetchAllVersions,
    fetchTheTask,
    updateTheTask,
    deleteTheTask,
    fetchAllTaskStatuses,
    statusesLoading,
    statusesError,
    statusesResults,
    addTask,
    fetchAllAssetsTasks,
    fetchTheTaskVersions,
    taskCompareVersionsResults,
    taskCompareVersionsLoading,
    taskCompareVersionsError,
  };
};
