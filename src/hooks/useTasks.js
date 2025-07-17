// hooks/useTasks.js
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createTask, fetchTasks } from "../store/Slices/TaskSlice";

export const useTasks = () => {
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

    fetchAllTasks,
    addTask,
  };
};
