// hooks/useVersions.js
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { fetchTaskVersions } from "../store/Slices/VersionsSlice";

export const useVersions = () => {
  const dispatch = useDispatch();

  const { versions } = useSelector((state) => state.version);
  const {
    results: versionResults = [],
    loading: versionLoading,
    error: versionError,
  } = versions || {};

  const fetchAllVersions = (taskId) => {
    dispatch(fetchTaskVersions({ id: taskId }));
  };

  // const handleVersionClick = (versionId) => {
  //   setActiveVersionId(versionId);
  // };

  return {
    versionResults,
    versionLoading,
    versionError,
    fetchAllVersions,
  };
};
