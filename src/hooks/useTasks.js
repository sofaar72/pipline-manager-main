// hooks/useTasks.js
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  createTask,
  fetchAssetsTasks,
  fetchTasks,
} from "../store/Slices/TaskSlice";
import { useVersions } from "./useVersions";

export const useTasks = ({ dataType = "production" } = {}) => {
  const [activeTask, setActiveTask] = useState(null);
  const { fetchAllVersions } = useVersions();
  const dispatch = useDispatch();

  const { tasks, createStatus } = useSelector((state) => state.task);
  const {
    results: taskResults,
    loading: taskLoading,
    error: taskError,
  } = tasks || {};
  const {
    success: taskSuccess,
    loading: createTaskLoading,
    error: createTaskError,
  } = createStatus || {};

  const fetchAllTasks = (entityId, taskType) => {
    if (dataType === "production") {
      dispatch(
        fetchTasks({ id: entityId, queryParams: { task_type: taskType } })
      );
    } else {
      dispatch(fetchAssetsTasks({ id: entityId, queryParams: {} }));
    }
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

  const addTask = async (taskData, closeModal = () => {}, noTask) => {
    dispatch(createTask({ ...taskData })).then((res) => {
      if (res.payload) {
        if (dataType === "production") {
          // console.log(res.payload);
          setTimeout(() => fetchAllTasks(res.payload.film), 1000);
          // closeModal(false);
          // fetchAllTasks(res?.payload?.film);
        } else {
          // fetchAllAssetsTasks(res?.payload?.asset_variation);
        }
      }
    });
  };

  return {
    taskResults,
    taskLoading,
    taskError,
    taskSuccess,
    createTaskLoading,
    createTaskError,
    activeTask,
    fetchTaskVersion,
    fetchAllVersions,
    fetchAllTasks,
    addTask,
    fetchAllAssetsTasks,
  };
};
