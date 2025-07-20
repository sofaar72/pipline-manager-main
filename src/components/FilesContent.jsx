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

const FilesContent = () => {
  const { taskResults, taskLoading, taskError, activeTask, fetchTaskVersion } =
    useTasks();
  const { entityResults, entityLoading, entityError, activeEntity } =
    useEntities();
  const { versionResults, versionLoading, versionError } = useVersions();

  useEffect(() => {
    if (taskResults.length > 0) {
      fetchTaskVersion(taskResults[0]?.id);
    }
  }, [taskResults]);

  useEffect(() => {
    console.log(activeEntity);
  }, [activeEntity]);

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
        <NoTask activeEntity={activeEntity} />
      )}
    </div>
  );
};

export default FilesContent;
