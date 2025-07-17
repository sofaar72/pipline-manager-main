import React, { useEffect } from "react";
import TabItem from "./TabItem";

import TaskTabs from "./TaskTabs";
import GlobalModal from "./GlobalModal";
import AddTaskForm from "../taskmanager/AddTaskForm";
import { VideoAnnotator } from "../taskmanager/VideoAnnotator";
import Loading from "./Loading";
import { useVersions } from "../../hooks/useVersions";
import { useEpisodeManagerContext } from "../../assets/context/EpisodeManagerContext";
import VersionsList from "../taskmanager/VersionsList";
import VersionPreview from "../taskmanager/VersionPreview";

const CustomTabs = ({ tasks, loading, activeTask, selectTask }) => {
  const { activeVersion, setActiveVersion } = useEpisodeManagerContext();

  // const handleVersionClick = (versionId) => {
  //   setActiveVersion(versionId);
  // };

  // useEffect(() => {
  //   fetchAllVersions(activeTask);
  // }, [tasks]);

  const { fetchAllVersions, versionResults, versionLoading, versionError } =
    useVersions();

  useEffect(() => {
    if (activeTask) {
      fetchAllVersions(activeTask);
    }
  }, [activeTask]);

  const selectVersion = (verId) => {
    setActiveVersion(verId);
  };

  useEffect(() => {
    if (versionResults && versionResults?.versions?.length > 0) {
      selectVersion(versionResults?.versions[0]?.id);
    }
  }, [versionResults]);

  return (
    <div className="w-full h-full  overflow-hidden flex flex-col gap-4  mx-auto">
      {/* Tab Headers */}
      <div className="flex h-[60px]  px-4  justify-between items-center border-b border-white/20 ">
        {loading ? (
          <div className="flex items-center h-full">
            <Loading />
          </div>
        ) : tasks ? (
          <div className="flex h-full  gap-1 ">
            {tasks?.map((task, i) => {
              return (
                <button
                  key={i}
                  className={`w-fit tab-btn px-4 py-2 text-sm font-medium transition capitalize relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-transparent  ${
                    activeTask === task?.id
                      ? "after:!bg-[var(--primary-color-light)] "
                      : "text-white/90 hover:text-white cursor-pointer "
                  }`}
                  onClick={() => selectTask(task?.id)}
                >
                  {task?.type}
                </button>
              );
            })}
          </div>
        ) : (
          ""
        )}

        <GlobalModal>
          <AddTaskForm />
        </GlobalModal>
      </div>

      {/* Tab Content */}
      {tasks?.length > 0 && (
        <div className=" flex-1 h-full  max-h-[661px] w-full overflow-y-hidden">
          <>
            <TabItem>
              {/* versions  */}
              <VersionsList
                activeVersion={activeVersion}
                selectVersion={selectVersion}
              />

              {/* preview  */}
              <VersionPreview activeVersion={activeVersion} />
            </TabItem>
          </>
        </div>
      )}
    </div>
  );
};

export default CustomTabs;
