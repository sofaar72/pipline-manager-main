// hooks/useTasks.js
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createTask, fetchTasks } from "../store/Slices/TaskSlice";
import { useVersions } from "./useVersions";

export const useTasks = () => {
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

  const fetchAllTasks = (entityId) => {
    dispatch(fetchTasks({ id: entityId }));
  };

  const selectTask = (id) => {
    setActiveTask(id);
  };

  const fetchTaskVersion = (taskId) => {
    selectTask(taskId);
    fetchAllVersions(taskId);
  };

  const addTask = (taskData) => {
    dispatch(createTask({ ...taskData }));
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
    fetchAllTasks,
    addTask,
  };
};
