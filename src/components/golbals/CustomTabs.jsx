import React, { useEffect, useRef } from "react";
import TabItem from "./TabItem";

import TaskTabs from "./TaskTabs";
import GlobalModal from "./GlobalModal";
import AddTaskForm from "../taskmanager/AddTaskForm";
import Loading from "./Loading";
import { useVersions } from "../../hooks/useVersions";
import { useEpisodeManagerContext } from "../../assets/context/EpisodeManagerContext";
import VersionsList from "../taskmanager/VersionsList";
import VersionPreview from "../taskmanager/VersionPreview";

import CreateTaskForm from "../taskmanager/CreateTaskForm";
import CbuttonOne from "./Buttons/CbuttonOne";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
// import "swiper/css/scrollbar";
// import required modules
import { FreeMode, Scrollbar, Mousewheel, Navigation } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import CdropDown from "./CDropDown";
import { useLocation } from "react-router-dom";
import { useAssets } from "../../hooks/useAssets";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

const CustomTabs = ({
  tasks,
  loading,
  activeTask,
  selectTask,
  versionResults,
  versionLoading,
}) => {
  const { dataType } = useEpisodeManagerContext();
  const {
    activeVersion,
    fetchSingleVersionPreview,
    versionPreviewData,
    versionPreviewLoading,
  } = useVersions();

  const location = useLocation();
  const { item, versionId } = location?.state || {};

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const { fetchAssetTasks } = useAssets();

  useEffect(() => {
    if (versionResults?.versions?.length > 0) {
      if (!versionId) {
        fetchSingleVersionPreview(versionResults?.versions[0]?.id);
      }
    }
  }, [versionResults]);

  useEffect(() => {
    fetchSingleVersionPreview(versionId);
  }, [versionId]);

  const selectVariants = (variant) => {
    fetchAssetTasks(variant);
  };

  return (
    <div className="w-full h-full  overflow-hidden flex flex-col gap-4  mx-auto">
      {/* Tab Headers */}
      <div className="w-full flex items-center justify-between gap-4 shrink-0  ">
        {/* TABS  */}
        <div className="w-full flex flex-1 h-[60px]    justify-between items-center   overflow-x-auto border-b border-white/50">
          <div
            className=" w-full max-w-[500px] flex h-full flex-1 gap-1
            overflow-x-auto flex "
          >
            {/* custom Navigation  */}
            <div className="w-full  h-full flex items-center justify-between ">
              <span
                className=" text-white cursor-pointer p-1 text-xs radius hover:bg-[var(--primary-modal-box)] transition"
                ref={prevRef}
              >
                <FaArrowLeft />
              </span>

              {tasks ? (
                <Swiper
                  modules={[Navigation]}
                  direction={"horizontal"}
                  slidesPerView={5}
                  spaceBetween={0}
                  freeMode={true}
                  // draggable={true}
                  scrollbar={true}
                  mousewheel={true}
                  navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                  }}
                  onSlideChange={(swiper) => {
                    console.log("Current slide index:", swiper);
                  }}
                  // modules={[FreeMode, Mousewheel, Scrollbar]}
                  className="swiper flex h-full  flex-1 gap-1 items-center  p-0 "
                >
                  {tasks?.map((task, i) => {
                    return (
                      <SwiperSlide key={i} className="">
                        <button
                          key={i}
                          className={`w-full h-full tab-btn px-4 py-2 text-sm font-medium transition capitalize relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-transparent  ${
                            activeTask === task?.id
                              ? "after:!bg-[var(--primary-color-light)] "
                              : "text-white/90 hover:text-white cursor-pointer "
                          }`}
                          onClick={() => selectTask(task?.id)}
                        >
                          {task?.type}
                        </button>
                      </SwiperSlide>
                    );
                  })}
                  {/* <span className="text-white/90 text-sm">...</span> */}
                </Swiper>
              ) : (
                ""
              )}
              <span
                className=" text-white cursor-pointer p-1 text-xs radius hover:bg-[var(--primary-modal-box)] transition "
                ref={nextRef}
              >
                <FaArrowRight />
              </span>
            </div>
          </div>

          <div className="">
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
        </div>
        {dataType === "assets" && (
          <div className="w-fit ">
            <CdropDown
              options={item?.variations?.map((variation) => {
                return {
                  name: variation.name,
                  id: variation.id,
                };
              })}
              select={selectVariants}
              init="Variants"
            />
          </div>
        )}
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
                <VersionsList
                  activeVersion={activeVersion}
                  selectVersion={fetchSingleVersionPreview}
                />
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
