// hooks/useEntities.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProject, getProjects } from "../store/Slices/ProjectsSlice";

export const useProject = () => {
  const dispatch = useDispatch();
  const { createdProject, projects, selectedProject } = useSelector(
    (state) => state.project
  );
  const {
    data: createdProjectData,
    success: createdProjectSuccess,
    message: createdProjectMessage,
    loading: createdProjectLoading,
    error: createdProjectError,
  } = createdProject;

  const {
    results: projectsData,
    success: projectsSuccess,
    message: projectsMessage,
    loading: projectsLoading,
    error: projectsError,
  } = projects;

  const createTheProject = (data) => {
    dispatch(createProject(data));
  };

  const getAllProjects = (queryParams) => {
    dispatch(getProjects(queryParams));
  };

  return {
    createTheProject,
    createdProjectData,
    createdProjectSuccess,
    createdProjectMessage,
    createdProjectLoading,
    createdProjectError,
    getAllProjects,
    projectsData,
    projectsSuccess,
    projectsMessage,
    projectsLoading,
    projectsError,
    selectedProject,
  };
};
