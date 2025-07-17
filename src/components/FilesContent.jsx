import React, { useEffect } from "react";
import Dvider from "./golbals/Dvider";
import CustomTabs from "./golbals/CustomTabs";
import CbuttonOne from "./golbals/Buttons/CbuttonOne";
import { useTasks } from "../hooks/useTasks";
import { useEpisodeManagerContext } from "../assets/context/EpisodeManagerContext";
import { useVersions } from "../hooks/useVersions";
import Loading from "./golbals/Loading";
import NoTask from "./taskmanager/NoTask";

const FilesContent = () => {
  const { activeEntity, setActiveEntity, activeTask, setActiveTask } =
    useEpisodeManagerContext();
  const { taskResults, taskLoading, taskError, fetchAllTasks } = useTasks();

  const handleTaskClick = (taskId) => {
    fetchAllTasks(taskId);
  };

  useEffect(() => {
    if (activeEntity) {
      handleTaskClick(activeEntity);
    }
  }, [activeEntity]);

  const selectTask = (id) => {
    setActiveTask(id);
  };
  useEffect(() => {
    selectTask(taskResults[0]?.id);
  }, [taskResults]);

  const { versionResults, versionLoading, versionError } = useVersions();

  console.log(versionResults);

  return (
    <div className="w-full max-w-files h-full main-bg radius">
      {taskResults.length ? (
        <div className="w-full h-full flex flex-col gap-[25px] sec-padd">
          {/* top part  */}
          {versionLoading ? (
            <div className="w-full h-[210px] sec-grad radius sec-padd flex flex-col  justify-between gap-2">
              <Loading />
            </div>
          ) : (
            <>
              {versionResults && !versionError ? (
                <div className="w-full h-[210px] flex-col justify-between   overflow-hidden  sec-grad radius sec-padd flex flex-col  justify-between gap-2">
                  <div className="flex gap-2 h-fit items-center">
                    <img
                      className="w-[18px] h-[full"
                      src="/icons/Bookmark.svg"
                      alt=""
                    />
                    <h3 className="text-sm capitalize">
                      {versionResults?.type?.name}
                    </h3>
                  </div>
                  <Dvider />
                  <div className="flex gap-[18px] w-full h-[90px] justify-between py-2 items-center">
                    <div className="w-[100px] h-full radius overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src="/images/entity-image.png"
                        alt=""
                      />
                    </div>
                    <div className="w-full h-full flex-1 flex justify-between radius ">
                      <div className="w-fit h-full flex gap-0">
                        <div className="flex flex-col gap-2 justify-between">
                          <span className="text-[11px] px-2 py-[1px] ">
                            Status
                          </span>
                          <span className="text-[11px] px-2 py-[1px] ">
                            Duration
                          </span>
                          <span className="text-[11px] px-2 py-[1px]">
                            Assignes
                          </span>
                        </div>
                        <div className="flex flex-col gap-2 justify-between">
                          <div className="w-fit px-2">
                            <CbuttonOne
                              color={versionResults?.status?.color}
                              size="11px"
                            >
                              {versionResults?.status?.short_name}
                            </CbuttonOne>
                          </div>
                          <span className="text-xs px-2 py-[1px]">
                            {versionResults?.duration}{" "}
                            <span className="text-[10px]">hours</span>
                          </span>
                          <div className="w-full flex items-center">
                            {versionResults?.assignees?.map((assign) => {
                              return (
                                <span className="text-xs px-2 py-[1px]">
                                  {" "}
                                  {assign?.full_name},
                                </span>
                              );
                            })}
                            <button className="text-xs cursor-pointer text-[var(--primary-color-light)]">
                              more ...
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="w-fit h-full flex gap-2">
                        <div className="flex flex-col gap-2 justify-between">
                          <span className="text-[11px]">Start Date</span>
                          <span className="text-[11px]">End Date</span>
                          {/* <span className="text-[10px]">Start Date</span> */}
                        </div>
                        <div className="flex h-full flex-col gap-2 justify-between">
                          <span className="text-[11px] px-2 py-[1px] ">
                            {versionResults?.start_date}
                          </span>
                          <span className="text-[11px] px-2 py-[1px] ">
                            {versionResults?.end_date || "__"}
                          </span>
                          {/* <CbuttonOne
                            size="11px"
                            color={versionResults?.status?.color}
                            disabled
                          >
                            <span>Refrences</span>
                            <img src="/icons/File.svg" alt="" />
                          </CbuttonOne> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {versionError && (
                    <div className="w-full text-sm h-[203px] sec-grad radius sec-padd flex flex-col  justify-between gap-2">
                      Please select A task First
                    </div>
                  )}
                </>
              )}
            </>
          )}
          {/* tabs part  */}
          {taskResults && (
            <CustomTabs
              tasks={taskResults}
              loading={taskLoading}
              activeTask={activeTask}
              selectTask={selectTask}
            />
          )}
        </div>
      ) : (
        <NoTask />
      )}
    </div>
  );
};

export default FilesContent;
