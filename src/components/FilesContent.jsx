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
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import NoFileContent from "./golbals/PlaceHolders.jsx/NoFileContent";

const FilesContent = () => {
  const { taskResults, taskLoading, taskError, activeTask, fetchTaskVersion } =
    useTasks();
  const {
    entityResults,
    entityLoading,
    entityError,

    fetchEntityTasks,
  } = useEntities();
  const { versionResults, versionLoading, versionError } = useVersions();
  const { setActiveEntity } = useEpisodeManagerContext();

  const { id } = useParams();

  useEffect(() => {
    fetchEntityTasks(id);
    setActiveEntity(id);
  }, [id]);

  useEffect(() => {
    if (taskResults.length > 0) {
      fetchTaskVersion(taskResults[0]?.id);
    }
  }, [taskResults]);

  // if (entityResults?.length === 0 || assetResults?.length === 0) {
  //   return <NoFileContent />;
  // }
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
};

export default FilesContent;
