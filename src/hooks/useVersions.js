// hooks/useVersions.js
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  fetchTaskVersions,
  fetchVersionPreview,
} from "../store/Slices/VersionsSlice";
import { createVersion } from "../store/Slices/VersionsSlice";
import { useTasks } from "./useTasks";

export const useVersions = () => {
  const dispatch = useDispatch();
  const [activeVersion, setActiveVersion] = useState(null);
  const { versions, versionPreview, createVersionData } = useSelector(
    (state) => state.version
  );
  const {
    results: versionResults = [],
    loading: versionLoading,
    error: versionError,
  } = versions || {};
  const {
    data: versionPreviewData,
    loading: versionPreviewLoading,
    error: versionPreviewError,
  } = versionPreview || {};
  const {
    data: createVersionResult,
    loading: createVersionLoading,
    error: createVersionError,
  } = createVersionData || {};

  const fetchAllVersions = (taskId) => {
    dispatch(fetchTaskVersions({ id: taskId }));
  };

  const fetchSingleVersionPreview = (versionId) => {
    if (versionId) {
      // console.log(versionId);
      dispatch(fetchVersionPreview({ id: versionId }));
    }
    setActiveVersion(versionId);
  };

  const createNewVersion = async (data, closeModal = () => {}) => {
    dispatch(createVersion(data)).then((res) => {
      if (res.payload) {
        // setTimeout(() => {
        //   // closeModal();
        //   fetchSingleVersionPreview(res.payload.id);
        // }, 1000);
      }
    });
  };

  return {
    versionResults,
    versionLoading,
    versionError,
    versionPreviewData,
    versionPreviewLoading,
    versionPreviewError,
    fetchAllVersions,
    fetchSingleVersionPreview,
    activeVersion,
    createNewVersion,
    createVersionLoading,
    createVersionError,
  };
};
