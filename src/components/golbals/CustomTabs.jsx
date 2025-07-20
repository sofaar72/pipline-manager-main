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
import { useEntities } from "../../hooks/useEntities";
import { useTasks } from "../../hooks/useTasks";
import CreateTaskForm from "../taskmanager/CreateTaskForm";

const CustomTabs = ({
  tasks,
  loading,
  activeTask,
  selectTask,
  versionResults,
  versionLoading,
}) => {
  const {
    activeVersion,
    fetchSingleVersionPreview,
    versionPreviewData,
    versionPreviewLoading,
  } = useVersions();

  useEffect(() => {
    if (versionResults?.versions?.length > 0) {
      fetchSingleVersionPreview(versionResults?.versions[0]?.id);
    }
  }, [versionResults]);

  return (
    <div className="w-full h-full  overflow-hidden flex flex-col gap-4  mx-auto">
      {/* Tab Headers */}

      <div className="flex h-[60px]  px-4  justify-between items-center border-b border-white/20 ">
        {tasks ? (
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

        <GlobalModal
          modalContent={(setOpen) => {
            return (
              <div
                className="w-full h-[600px] flex items-center justify-center   text-white max-w-[400px] "
                onClick={(e) => e.stopPropagation()}
              >
                <CreateTaskForm setOpen={setOpen} />
              </div>
            );
          }}
        ></GlobalModal>
      </div>

      {/* Tab Content */}

      <div className=" flex-1 h-full  max-h-[661px] w-full overflow-y-hidden">
        <>
          <TabItem>
            {/* versions  */}
            {versionLoading ? (
              <div className="w-[250px] h-full bg-gray-500/50 radius px-[10px] py-[10px] flex flex-col gap-[20px]"></div>
            ) : (
              <>
                {versionResults?.versions?.length > 0 && (
                  <VersionsList
                    activeVersion={activeVersion}
                    selectVersion={fetchSingleVersionPreview}
                  />
                )}
              </>
            )}

            {/* preview  */}
            {versionPreviewLoading ? (
              <div className="w-full flex-1  h-full bg-gray-500/50 radius px-[20px] py-[20px] flex flex-col gap-[20px] animate-pulse"></div>
            ) : versionResults?.versions?.length > 0 &&
              versionPreviewData?.previews?.length > 0 ? (
              <VersionPreview
                versionData={versionPreviewData}
                versionLoading={versionPreviewLoading}
              />
            ) : (
              ""
            )}
          </TabItem>
        </>
      </div>
    </div>
  );
};

export default CustomTabs;
