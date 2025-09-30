// hooks/useVersions.js
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  fetchTaskVersions,
  fetchVersionPreview,
  resetVersionPreview,
  updateVersion,
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

  const fetchAllVersions = (taskId, setVersionId = () => {}) => {
    return dispatch(fetchTaskVersions({ id: taskId }));
    // .unwrap() // optional: unwraps the thunk to throw real errors
    // .then((res) => {
    //   if (res.payload.versions) {
    //     setVersionId({
    //       id: res.payload.versions[0].id,
    //       name: res.payload.versions[0].name,
    //     });
    //   }
    //   console.log("✅ Versions fetched:", res);
    //   return res;
    // })
    // .catch((err) => {
    //   console.error("❌ Failed to fetch versions:", err);
    //   throw err;
    // })
  };

  const clearVersionPreview = () => {
    dispatch(resetVersionPreview());
  };

  const fetchSingleVersionPreview = (versionId) => {
    if (versionId) {
      // console.log(versionId);
      dispatch(fetchVersionPreview({ id: versionId }));
    }
    setActiveVersion(versionId);
  };

  const createNewVersion = async (
    data,
    closeModal = () => {},
    setSuccess = () => {}
  ) => {
    dispatch(createVersion(data)).then((res) => {
      if (res.payload) {
        // setTimeout(() => {
        closeModal();
        setSuccess(true);
        //   fetchSingleVersionPreview(res.payload.id);
        // }, 1000);
      }
    });
  };
  const patchVersion = async (
    id,
    data,
    closeModal = () => {},
    setSuccess = () => {}
  ) => {
    // console.log(data);
    const files = { files: data };

    dispatch(updateVersion({ id: id, data: files })).then((res) => {
      if (res.payload) {
        closeModal();
        setSuccess(true);
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
    fetchVersionPreview,
    activeVersion,
    createNewVersion,
    createVersionLoading,
    createVersionError,
    clearVersionPreview,
    patchVersion,
  };
};
