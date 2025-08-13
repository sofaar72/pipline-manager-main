import React, { useEffect, useRef, useState } from "react";
import { Navigation, Controller } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { IoLogoModelS } from "react-icons/io";
import { GoArrowLeft } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";
import OverviewItemList from "./OverviewItemList";

const OverviewDataTable = ({
  headerCols,
  createTask,
  deleteEntity,
  editEntity,
}) => {
  const [resize, setResize] = useState(true);
  const [resizeTasks, setResizeTasks] = useState(true);
  const [taskHeaders, setTaskHeaders] = useState([]);
  const [metaDataHeaders, setMetaDataHeaders] = useState([]);

  // replacing tasks
  useEffect(() => {
    if (headerCols) {
      if (headerCols.tasks) {
        setTaskHeaders(headerCols.tasks[1].taskItems);
      }
      if (headerCols.metadatas) {
        setMetaDataHeaders(headerCols.metadatas[1].metadataItems);
      }
    }
  }, []);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  // for metadata
  const metaPrevRef = useRef(null);
  const metaNextRef = useRef(null);

  const editTheEntity = (entData) => {
    editEntity(entData);
  };
  const deleteTheEntity = (entId) => {
    // editEntity()
    deleteEntity(entId);
  };

  return (
    <div className="w-full h-full flex-1 bg-[var(--section-bg-color)] radius p-4">
      {/* table header */}
      <div className="flex w-full h-[40px] border-b border-gray-600 mb-2 bg-[var(--primary-color-lower)]/80 radius px-[10px] justify-between">
        {/* metadatas */}
        <div className="w-fit h-full font-semibold text-[10px] flex items-center gap-0 ">
          {headerCols &&
            headerCols.metadatas.map((col) => (
              <div
                key={col.id}
                className="relative h-full font-semibold text-[10px] flex items-center transition-all duration-300 ease-in-out"
                style={{
                  width:
                    col.label === "resizer"
                      ? "auto"
                      : resize
                      ? col.label === "Metadata"
                        ? "120px"
                        : col.label === "metadataItems"
                        ? "250px"
                        : "60px"
                      : "0px",
                  opacity: col.label === "resizer" ? 1 : resize ? 1 : 0,
                  transform: resize ? "scale(1)" : "scale(0.95)",
                  overflow: "hidden",
                }}
              >
                {col.label === "resizer" ? (
                  col.render(() => setResize((prev) => !prev))
                ) : col.label === "metadataItems" ? (
                  // swiper part
                  <>
                    <div className="w-full h-full flex items-center justify-between overflow-hidden ">
                      {/* custom navigations  */}
                      <span
                        className="text-white p-2 shrink-0 flex items-center justify-center text-sm transition hover:bg-[var(--icons-color)] h-full  cursor-pointer"
                        ref={metaPrevRef}
                      >
                        <GoArrowLeft />
                      </span>
                      <Swiper
                        modules={[Navigation, Controller]}
                        slidesPerView={2}
                        navigation={{
                          prevEl: metaPrevRef.current,
                          nextEl: metaNextRef.current,
                        }}
                        draggable={false}
                        allowTouchMove={false}
                        onSwiper={(swiper) => {
                          // Delay the assignment until refs are available
                          setTimeout(() => {
                            if (
                              swiper.params &&
                              swiper.params.navigation &&
                              metaPrevRef.current &&
                              metaNextRef.current
                            ) {
                              swiper.params.navigation.prevEl =
                                metaPrevRef.current;
                              swiper.params.navigation.nextEl =
                                metaNextRef.current;
                              swiper.navigation.destroy(); // destroy old nav
                              swiper.navigation.init(); // init with new refs
                              swiper.navigation.update(); // update Swiper
                            }
                          });
                        }}
                        spaceBetween={0}
                        className="!w-[188px] shrink-0 h-full border-l border-r"
                      >
                        {metaDataHeaders.map((metadata) => {
                          return (
                            <SwiperSlide
                              className={`text-white cursor-pointer !flex !items-center !gap-2  h-full justify-between border-r  border-white/50 p-2 transition`}
                            >
                              <span>{metadata.name}</span>
                              <IoLogoModelS />
                            </SwiperSlide>
                          );
                        })}
                      </Swiper>
                      {/* custom navigations  */}
                      <span
                        className="text-white p-2 shrink-0 flex items-center justify-center text-sm transition hover:bg-[var(--icons-color)] h-full  cursor-pointer"
                        ref={metaNextRef}
                      >
                        <GoArrowRight />
                      </span>
                    </div>
                  </>
                ) : (
                  col.render()
                )}
              </div>
            ))}
        </div>
        {/* tasks */}
        <div className="w-fit h-full font-semibold text-[10px] flex items-center gap-0">
          {headerCols &&
            headerCols.tasks.map((col) => (
              <div
                key={col.id}
                className="relative h-full font-semibold text-[10px] flex items-center transition-all duration-300 ease-in-out"
                style={{
                  width:
                    col.label === "resizer"
                      ? "auto"
                      : resizeTasks
                      ? col.label === "moreTasks"
                        ? "120px"
                        : col.label === "TaskItems"
                        ? "450px"
                        : "90px"
                      : "0px",
                  opacity: col.label === "resizer" ? 1 : resizeTasks ? 1 : 0,
                  transform: resizeTasks ? "scale(1)" : "scale(0.95)",
                  overflow: "hidden",
                }}
              >
                {col.label === "resizer" ? (
                  col.render(() => setResizeTasks((prev) => !prev))
                ) : col.label === "TaskItems" ? (
                  // swiper part
                  <>
                    <div className="w-full h-full flex items-center justify-between overflow-hidden ">
                      {/* custom navigations  */}
                      <span
                        className="text-white p-2 shrink-0 flex items-center justify-center text-sm transition hover:bg-[var(--icons-color)] h-full  cursor-pointer"
                        ref={prevRef}
                      >
                        <GoArrowLeft />
                      </span>
                      <Swiper
                        modules={[Navigation, Controller]}
                        slidesPerView={4}
                        navigation={{
                          prevEl: prevRef.current,
                          nextEl: nextRef.current,
                        }}
                        draggable={false}
                        allowTouchMove={false}
                        onSwiper={(swiper) => {
                          // Delay the assignment until refs are available
                          setTimeout(() => {
                            if (
                              swiper.params &&
                              swiper.params.navigation &&
                              prevRef.current &&
                              nextRef.current
                            ) {
                              swiper.params.navigation.prevEl = prevRef.current;
                              swiper.params.navigation.nextEl = nextRef.current;
                              swiper.navigation.destroy(); // destroy old nav
                              swiper.navigation.init(); // init with new refs
                              swiper.navigation.update(); // update Swiper
                            }
                          });
                        }}
                        spaceBetween={0}
                        className="!w-full h-full border-l border-r"
                      >
                        {taskHeaders.map((taskItem) => {
                          return (
                            <SwiperSlide
                              className={`text-white !flex items-center justify-between !p-2 ${taskItem.color} h-full `}
                            >
                              <span>{taskItem.name}</span>
                              <IoLogoModelS />
                            </SwiperSlide>
                          );
                        })}
                      </Swiper>
                      {/* custom navigations  */}
                      <span
                        className="text-white p-2 shrink-0 flex items-center justify-center text-sm transition hover:bg-[var(--icons-color)] h-full  cursor-pointer"
                        ref={nextRef}
                      >
                        <GoArrowRight />
                      </span>
                    </div>
                  </>
                ) : (
                  col.render(createTask)
                )}
              </div>
            ))}
        </div>
      </div>
      {/* table items list */}
      <OverviewItemList
        resize={resize}
        resizeTasks={resizeTasks}
        prevRef={prevRef}
        nextRef={nextRef}
        metaPrevRef={metaPrevRef}
        metaNextRef={metaNextRef}
        deleteTheEntity={deleteTheEntity}
        editTheEntity={editTheEntity}
      />
    </div>
  );
};

export default OverviewDataTable;
