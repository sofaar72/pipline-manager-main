// hooks/useTasks.js
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  createTask,
  fetchAssetsTasks,
  fetchTasks,
  updateTask,
} from "../store/Slices/TaskSlice";
import { useVersions } from "./useVersions";

export const useTasks = ({ dataType = "production" } = {}) => {
  const [activeTask, setActiveTask] = useState(null);
  const { fetchAllVersions } = useVersions();
  const dispatch = useDispatch();

  const { tasks, createStatus, updateStatus } = useSelector(
    (state) => state.task
  );
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

  const {
    success: taskUpdateSuccess,
    loading: updateTaskLoading,
    error: updateTaskError,
  } = updateStatus || {};

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
          closeModal(false);
        } else {
        }
      }
    });
  };
  const updateTheTask = async (id, taskData, closeModal = () => {}) => {
    console.log(taskData);
    dispatch(updateTask({ id: id, data: { ...taskData } })).then((res) => {
      if (res.payload) {
        if (dataType === "production") {
          closeModal(false);
        } else {
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
    taskUpdateSuccess,
    updateTaskLoading,
    updateTaskError,
    fetchTaskVersion,
    fetchAllVersions,
    fetchAllTasks,
    updateTheTask,
    addTask,
    fetchAllAssetsTasks,
  };
};
