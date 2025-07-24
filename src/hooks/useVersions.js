// hooks/useVersions.js
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  fetchTaskVersions,
  fetchVersionPreview,
} from "../store/Slices/VersionsSlice";
import { createVersion } from "../store/Slices/VersionsSlice";

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
    // console.log(versionId);
    dispatch(fetchVersionPreview({ id: versionId }));
    setActiveVersion(versionId);
  };

  const createNewVersion = (data) => {
    dispatch(createVersion(data));
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
