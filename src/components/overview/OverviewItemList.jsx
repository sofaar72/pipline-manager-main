import React, { forwardRef, useEffect, useRef, useState } from "react";
import OverviewItem from "./OverviewItem";
import { useEntities } from "../../hooks/useEntities";
import { IoMdCheckbox } from "react-icons/io";
import { ImCheckboxUnchecked } from "react-icons/im";
import Loading from "../golbals/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Controller, Navigation } from "swiper/modules";
import { useTasks } from "../../hooks/useTasks";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { useProject } from "../../hooks/useProject";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const OverviewItemList = forwardRef((props, ref) => {
  const {
    resize,
    resizeTasks,
    prevRef,
    nextRef,
    metaNextRef,
    metaPrevRef,
    editTheEntity,
    deleteTheEntity,
  } = props;

  const { selectedProject } = useProject();
  const { fetchEntities, entityResults, entityLoading } = useEntities();
  const { fetchAllTasks, taskResults } = useTasks({});

  const [data, setData] = useState({
    metadatas: {
      names: [],
      episodes: [],
      deadlines: [],
      durations: [],
    },
    tasks: {
      light: [],
      animate: [],
      modeling: [],
      texturing: [],
      rigging: [],
      shading: [],
      edit: [],
    },
  });

  useEffect(() => {
    fetchEntities();
  }, [selectedProject]);

  // set entities
  useEffect(() => {
    if (!entityResults || entityResults.length === 0) return;

    setData({
      metadatas: {
        names: entityResults.map((ent) => ({
          name: ent.name,
          ischecked: false,
        })),
        episodes: entityResults.map((ent) => ent.episode || "Ep ?"),
        deadlines: entityResults.map((ent) => ent.deadline || "No deadline"),
        durations: entityResults.map((ent) => ent.duration || "0m"),
      },
      tasks: {
        light:
          entityResults.map((ent) =>
            ent.tasks
              .filter((task) => task.type === "light")
              .map((task) => task)
          ) || [],
        animate:
          entityResults.map((ent) =>
            ent.tasks
              .filter((task) => task.type === "animate")
              .map((task) => task)
          ) || [],
        modeling:
          entityResults.map((ent) =>
            ent.tasks
              .filter((task) => task.type === "modeling")
              .map((task) => task)
          ) || [],
        texturing: entityResults.map((ent) =>
          ent.tasks
            .filter((task) => task.type === "texturing")
            .map((task) => task)
        ),
        rigging: entityResults.map((ent) =>
          ent.tasks
            .filter((task) => task.type === "rigging")
            .map((task) => task)
        ),
        shading: entityResults.map((ent) =>
          ent.tasks
            .filter((task) => task.type === "shading")
            .map((task) => task)
        ),
        edit: entityResults.map((item) => item),
      },
    });

    // if (entityResults) {
    //   entityResults.map((ent, i) => fetchAllTasks(ent.id));
    // }
  }, [entityResults]);

  const toggleCheck = (index) => {
    setData((prev) => {
      const updatedNames = [...prev.metadatas.names];
      updatedNames[index] = {
        ...updatedNames[index],
        ischecked: !updatedNames[index].ischecked,
      };
      return {
        ...prev,
        metadatas: {
          ...prev.metadatas,
          names: updatedNames,
        },
      };
    });
  };

  if (entityLoading) return <Loading />;

  const renderMetadataColumn = (key, isNameColumn = false) => {
    const items = data.metadatas[key];
    return (
      <div
        className={`
        ${isNameColumn ? "w-[120px]" : "w-full"}
          h-full 
         ${
           isNameColumn
             ? "border-r border-l border-white/50"
             : "border-r border-white/50"
         }
         `}
      >
        {items.map((item, i) => (
          <OverviewItem key={i} isOdd={i % 2 !== 0} isChecked={item.ischecked}>
            <div className="w-full h-[40px] shrink-0 grow-0 flex items-center gap-2 text-[10px] px-2 ">
              {isNameColumn && (
                <>
                  <span
                    onClick={() => toggleCheck(i)}
                    className="cursor-pointer"
                  >
                    {item.ischecked ? (
                      <IoMdCheckbox />
                    ) : (
                      <ImCheckboxUnchecked />
                    )}
                  </span>
                  <img
                    className="w-[30px] h-[20px] radius"
                    src="https://plus.unsplash.com/premium_photo-1719529320784-62161f2728d2?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                  />
                </>
              )}
              <span className="">{isNameColumn ? item.name : item}</span>
            </div>
          </OverviewItem>
        ))}
      </div>
    );
  };

  const renderTasksColumn = (key, isAddTaskColumn = false, isEdit = false) => {
    const items = data.tasks[key];

    if (isEdit) {
      return (
        <div className="w-full h-full flex flex-col border-l border-r border-white/50">
          {items.map((item, i) => {
            return (
              <OverviewItem key={i}>
                <div className="w-full h-[40px] shrink-0 grow-0 flex items-center gap-2 text-[10px] px-2 border-b border-white/20 justify-between">
                  {/* delete  */}
                  <span
                    className="text-base flex items-center justify-center rounded-md transition hover:bg-red-500/50 cursor-pointer p-1"
                    onClick={() => deleteTheEntity(item.id)}
                  >
                    <MdDelete />
                  </span>
                  {/* edit  */}
                  <span
                    className="text-base flex items-center justify-center rounded-md transition hover:bg-[var(--secondary-normal)]/50 cursor-pointer p-1"
                    onClick={() => editTheEntity(item)}
                  >
                    <FaRegEdit />
                  </span>
                </div>
              </OverviewItem>
            );
          })}
        </div>
      );
    }

    return (
      <div
        className={`w-full shrink-0 grow-0 h-full  ${
          isAddTaskColumn ? "border-r " : "border-l border-r"
        } border-white/50`}
      >
        {!isAddTaskColumn &&
          items.map((item, i) => (
            <OverviewItem key={i} type={key}>
              <div className="w-full h-[40px] shrink-0 grow-0 flex items-center gap-2 text-[10px] px-2 border-b border-white/20 justify-between">
                {/* swiper part  */}
                {/* <div
                  ref={taskStatusPrev}
                  className="cursor-pointer text-[var(--light)] text-sm"
                >
                  <IoIosArrowDropleftCircle />
                </div> */}
                <div
                  // w-[120px]
                  className="
                w-full
                "
                >
                  <Swiper
                    modules={[Navigation]}
                    slidesPerView={1}
                    className="!w-full"
                    spaceBetween={10}
                    // onSwiper={metaItemsSwiperSetter}
                  >
                    {item.map((slideItem, index) => {
                      return (
                        /* swper  */
                        <SwiperSlide key={index}>
                          <div className="w-full h-[40px] p-2 shrink-0 grow-0 flex items-center gap-0 text-[10px] px-2 flex-col justify-center relative">
                            {/*shows assignees  */}
                            {/* <div className="flex gap-2 items-center text-[6px] absolute top-0">
                            assignee
                          </div> */}
                            {/* status  */}
                            <div
                              className={`text-[12px] w-full h-full rounded-full flex items-center justify-center transition hover:!bg-[var(--light)] cursor-pointer  
                              `}
                              style={{ background: slideItem.status.color }}
                            >
                              {slideItem.status.name.slice(0, 6)}
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
                {/* <div
                  ref={taskStatusNext}
                  className="cursor-pointer text-[var(--light)] text-sm"
                >
                  <IoIosArrowDroprightCircle />
                </div> */}
              </div>
            </OverviewItem>
          ))}
      </div>
    );
  };

  return (
    <div className="w-full h-fit radius border border-white/50 flex justify-between gap-0 overflow-hidden px-[10px] bg-[#000]">
      {/* Metadata Section */}
      <div
        className={`flex w-fit h-full gap-0 transition-all duration-300`}
        style={{
          width: resize ? "fit-content" : "0px",
          transform: resize ? "scale(1)" : "scale(0.95)",
          opacity: resize ? 1 : 0,
          overflow: "hidden",
        }}
      >
        {renderMetadataColumn("names", true)}

        <div className="w-[250px] flex gap-0 shrink-0 ">
          {/* empty spot  */}
          <div className="w-[30px] shrink-0 "></div>
          <Swiper
            modules={[Navigation, Controller]}
            // onSwiper={metaItemsSwiperSetter}
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
                  swiper.params.navigation.prevEl = metaPrevRef.current;
                  swiper.params.navigation.nextEl = metaNextRef.current;
                  // swiper.navigation.destroy(); // destroy old nav
                  // swiper.navigation.init(); // init with new refs
                  // swiper.navigation.update(); // update Swiper
                }
              });
            }}
            slidesPerView={2}
            spaceBetween={0}
            className="!w-[188px] h-full shrink-0 !m-0 border-r border-l border-white/50"
          >
            <SwiperSlide>{renderMetadataColumn("episodes")}</SwiperSlide>
            <SwiperSlide>{renderMetadataColumn("durations")}</SwiperSlide>
            <SwiperSlide>{renderMetadataColumn("deadlines")}</SwiperSlide>
          </Swiper>
          {/* empty spot  */}
          <div className="w-[30px] shrink-0"></div>
        </div>
      </div>

      {/* Tasks Section */}
      <div
        className=" h-full gap-0 transition-all duration-300 w-full "
        style={{
          width: resizeTasks ? "fit-content" : "0px",
          transform: resizeTasks ? "scale(1)" : "scale(0.95)",
          opacity: resizeTasks ? 1 : 0,
          overflow: "hidden",
        }}
      >
        <div className="w-[570px] h-full flex gap-0 shrink-0">
          <div className="w-[30px]  shrink-0"></div>
          <Swiper
            modules={[Navigation, Controller]}
            // onSwiper={taskItemsSwiperSetter}
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
                  // swiper.navigation.destroy(); // destroy old nav
                  // swiper.navigation.init(); // init with new refs
                  // swiper.navigation.update(); // update Swiper
                }
              });
            }}
            slidesPerView={4}
            spaceBetween={0}
            className="!w-[388px] shrink-0 h-full"
          >
            <SwiperSlide>{renderTasksColumn("light")}</SwiperSlide>
            <SwiperSlide>{renderTasksColumn("animate")}</SwiperSlide>
            <SwiperSlide>{renderTasksColumn("modeling")}</SwiperSlide>
            <SwiperSlide>{renderTasksColumn("texturing")}</SwiperSlide>
            <SwiperSlide>{renderTasksColumn("rigging")}</SwiperSlide>
            <SwiperSlide>{renderTasksColumn("shading")}</SwiperSlide>
          </Swiper>
          <div className="w-[30px] shrink-0"></div>
          {/* edit part  */}
          <div className="w-[120px] shrink-0">
            {renderTasksColumn("edit", false, true)}
          </div>
        </div>
      </div>
    </div>
  );
});

export default OverviewItemList;
