import React, { useEffect } from "react";
import Dvider from "./golbals/Dvider";
import CustomTabs from "./golbals/CustomTabs";
import CbuttonOne from "./golbals/Buttons/CbuttonOne";
import { useTasks } from "../hooks/useTasks";
import { useEpisodeManagerContext } from "../assets/context/EpisodeManagerContext";
import { useVersions } from "../hooks/useVersions";
import Loading from "./golbals/Loading";
import NoTask from "./taskmanager/NoTask";
import FileContentVisibleData from "./taskmanager/fileContentVisibleData";
import { useEntities } from "../hooks/useEntities";
import FileContentPlace from "./golbals/PlaceHolders.jsx/FileContentPlace";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import NoFileContent from "./golbals/PlaceHolders.jsx/NoFileContent";
import { useAssets } from "../hooks/useAssets";

const FilesContent = () => {
  const location = useLocation();
  const { item } = location.state || {};
  const { dataType } = useEpisodeManagerContext();
  const { taskResults, taskLoading, taskError, activeTask, fetchTaskVersion } =
    useTasks({ dataType: dataType === "production" ? "production" : "assets" });
  const {
    entityResults,
    entityLoading,
    entityError,

    fetchEntityTasks,
  } = useEntities({ dataType: "production" });

  const { assetResults, fetchAssetTasks } = useAssets();
  const { versionResults, versionLoading, versionError } = useVersions();
  const { setActiveEntity } = useEpisodeManagerContext();

  const { id } = useParams();

  useEffect(() => {
    if (dataType === "production") {
      fetchEntityTasks(id);
      setActiveEntity(id);
    } else {
      fetchAssetTasks(item?.variations[0]?.id);
    }
  }, [id, dataType]);

  useEffect(() => {
    if (taskResults.length > 0) {
      fetchTaskVersion(taskResults[0]?.id);
    }
  }, [taskResults]);

  // if (entityResults?.length === 0 || assetResults?.length === 0) {
  //   return <NoFileContent />;
  // }

  useEffect(() => {
    console.log(item);
    fetchAssetTasks(item?.variations[0]?.id);
  }, [item]);

  if (entityResults && entityResults.length > 0) {
    return (
      <div className="w-full max-w-files h-full main-bg radius">
        {taskLoading || entityLoading ? (
          <FileContentPlace />
        ) : taskResults.length > 0 ? (
          <FileContentVisibleData
            taskResults={taskResults}
            fetchVersion={fetchTaskVersion}
            taskLoading={taskLoading}
            activeTask={activeTask}
            versionResults={versionResults}
            versionLoading={versionLoading}
            versionError={versionError}
          />
        ) : (
          <NoTask />
        )}
      </div>
    );
  }
};

export default FilesContent;
