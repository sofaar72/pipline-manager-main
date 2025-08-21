import React, { useState, useEffect } from "react";
import LayoutOne from "../layout/LayoutOne";
import OverviewDataTable from "../components/overview/OverviewDataTable";

import { HiArrowsRightLeft } from "react-icons/hi2";
import { IoLogoModelS } from "react-icons/io";
import SearchThree from "../components/golbals/SearchThree";
import { FaFilter } from "react-icons/fa";
import CdropDown from "../components/golbals/CDropDown";
import { FaUser } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import CbuttonOne from "../components/golbals/Buttons/CbuttonOne";
import { FaPlus } from "react-icons/fa";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import CreateButton from "../components/golbals/Buttons/CreateButton";
import GlobalPureModal from "../components/golbals/GlobalPureModal";
import CreateEntityForm from "../components/taskmanager/CreateEntityForm";
import CreateTaskForm from "../components/taskmanager/CreateTaskForm";
import DeleteEntity from "../components/overview/DeleteEntity";
import DeleteEntityModal from "../components/overview/DeleteEntity";
import EditEntityForm from "../components/taskmanager/EditEntityForm";
// import { FaRigging } from "react-icons/fa";
// import { FaShading } from "react-icons/fa";

const defaultHeaderCols = {
  metadatas: [
    {
      id: 1,
      label: "Metadata",
      render: () => (
        <div className="text-white cursor-pointer flex items-center gap-2  w-[150px] h-full justify-between border-r border-l border-white/50 p-2 transition">
          <span className={"w-full"}>Add metadata </span>
          <span>
            <FaPlus className="text-sm bg-[var(--primary-color-light)] radius p-1 " />
          </span>
        </div>
      ),
    },
    // metadata items
    {
      id: 2,
      label: "metadataItems",
      metadataItems: [
        { name: "Episode", id: 1 },
        { name: "Deadline", id: 2 },
        { name: "Duration", id: 3 },
      ],
    },
    // {
    //   id: 2,
    //   label: "Episodes",
    //   render: () => (
    //     <div className="text-white cursor-pointer flex items-center gap-2  w-[60px] h-full justify-between border-r  border-white/50 p-2 transition">
    //       Episodes.
    //     </div>
    //   ),
    // },
    // {
    //   id: 3,
    //   label: "Deadline",
    //   render: () => (
    //     <div className="text-white cursor-pointer flex items-center gap-2  w-[60px] h-full justify-between border-r  border-white/50 p-2 transition">
    //       Deadline
    //     </div>
    //   ),
    // },
    // {
    //   id: 4,
    //   label: "Duration",
    //   render: () => (
    //     <div className="text-white cursor-pointer flex items-center gap-2  w-[60px] h-full justify-between border-r  border-white/50 p-2 transition">
    //       Duration
    //     </div>
    //   ),
    // },
    {
      id: 3,
      label: "resizer",
      render: (onClick) => (
        <div
          className="bg-black h-full p-2 flex items-center justify-center text-xl cursor-pointer"
          onClick={onClick}
        >
          <HiArrowsRightLeft />
        </div>
      ),
    },
  ],
  tasks: [
    {
      id: 1,
      label: "resizer",
      render: (onClick) => (
        <div
          className="bg-black h-full p-2 flex items-center justify-center text-xl cursor-pointer"
          onClick={onClick}
        >
          <HiArrowsRightLeft />
        </div>
      ),
    },

    {
      id: 2,
      label: "TaskItems",
      taskItems: [
        { name: "Light", color: " bg-[var(--light)]" },
        { name: "Animate", color: " bg-[var(--animate)]" },
        { name: "Modeling", color: " bg-[var(--modeling)]" },
        { name: "Texturing", color: " bg-[var(--texturing)]" },
        { name: "Rigging", color: " bg-[var(--rigging)]" },
        { name: "Shading", color: "bg-[var(--shading)]" },
      ],
      //   render: () => (
      //     <div className=" h-full overflow-hidden ">
      //       <Swiper
      //         modules={[Navigation]}
      //         slidesPerView={4}
      //         spaceBetween={0}
      //         className="!w-full h-full"
      //       >
      //         <SwiperSlide className="text-white !flex items-center justify-between !p-2 bg-[var(--modeling)] h-full !w-[90px]">
      //           <span>Modeling</span>
      //           <IoLogoModelS />
      //         </SwiperSlide>
      //         <SwiperSlide className="text-white !flex items-center justify-between !p-2 bg-[var(--texturing)] h-full !w-[90px]">
      //           <span>Texturing</span>
      //           <IoLogoModelS />
      //         </SwiperSlide>
      //         <SwiperSlide className="text-white !flex items-center justify-between !p-2 bg-[var(--rigging)] h-full !w-[90px]">
      //           <span>Rigging</span>
      //           <IoLogoModelS />
      //         </SwiperSlide>
      //         <SwiperSlide className="text-white cursor-pointer !flex items-center justify-between !p-2 gap-2 !w-[90px] h-full bg-[var(--shading)] p-2">
      //           <span>Shading</span>
      //           <span className="text-sm">
      //             <IoLogoModelS />
      //           </span>
      //         </SwiperSlide>
      //       </Swiper>
      //     </div>
      //   ),
    },

    {
      id: 3,
      label: "moreTasks",
      render: (onClick) => (
        <div
          className="text-white cursor-pointer flex items-center gap-2  w-[150px] h-full justify-between border-r border-l border-white/50 p-2"
          onClick={() => onClick()}
        >
          <span className={"w-full"}>Add more tasks </span>
          <span>
            <FaPlus className="text-sm bg-[var(--primary-color-light)] radius p-1 " />
          </span>
        </div>
      ),
    },
  ],
};
const TaskOverviewPage = () => {
  // modal controllers
  const [createEntityModal, setCreateEntityModal] = useState();
  const [delteEntityModal, setDeleteEntityModal] = useState(false);
  const [deleteEntityId, setDeleteEntityId] = useState(null);
  const [editEntityModal, setEditEntityModal] = useState(false);
  const [editEntityData, setEditEntityData] = useState(null);

  const [createTaskModal, setCreateTaskModal] = useState();

  const [headerCols, setHeaderCols] = useState(defaultHeaderCols);
  const [episodes, setEpisodes] = useState([]);
  const [selectEpisode, setSelectEpisode] = useState({
    id: null,
    name: "Episodes",
  });
  const [departments, setDepartments] = useState([]);
  const [selectDepartment, setSelectDepartment] = useState({
    id: null,
    name: "Select Departments",
  });

  // EDIT & DELETE FUNCS
  const deleteFilm = (id) => {
    setDeleteEntityId(id);
    setDeleteEntityModal(!delteEntityModal);
  };
  const editFilm = (data) => {
    setEditEntityData(data);
    setEditEntityModal(!editEntityModal);
  };

  return (
    <LayoutOne>
      <div className="w-full h-full text-white flex gap-[30px] flex-col lg:flex-row">
        <div className="w-full h-full flex flex-col gap-4">
          {/* top part  */}
          <div className="w-full h-[60px] bg-[var(--section-bg-color)] radius p-[10px] flex items-center gap-2 justify-between">
            <div className="h-full flex items-center gap-2">
              {/* search  */}
              <SearchThree />
              {/* filter  */}
              <div className="w-[40px] h-[40px] shrink-0 flex items-center justify-center radius bg-[var(--icons-color)] text-white text-sm hover:bg-[var(--primary-color-light)] transition cursor-pointer">
                <FaFilter />
              </div>
              {/* create group  */}
              <div className="flex items-center justify-center radius bg-[var(--icons-color)] text-white text-sm p-2 hover:bg-[var(--primary-color-light)]  transition cursor-pointer">
                Group
              </div>
            </div>
            <div className="h-full flex items-center gap-2">
              {/* episodes  */}
              <CdropDown
                options={
                  // episodes.map((item) => {
                  //   return { id: item?.id, name: item?.name };
                  // }) ||

                  []
                }
                // select={setSelectEpisode}
                init={selectEpisode.name}
                type="typeSidebar"
                cClass="!h-full w-fit !px-2 !py-2 overflow-hidden !bg-[var(--primary-add-file-bg)]"
                cClassMenu="!h-full !w-fit"
                topClass="!h-full !w-fit"
                // icon={<MdOutlineSort className="text-[20px] text-white" />}
              />
              {/* department  */}
              <CdropDown
                options={
                  // episodes.map((item) => {
                  //   return { id: item?.id, name: item?.name };
                  // }) ||

                  []
                }
                // select={setSelectEpisode}
                init={selectDepartment.name}
                type="typeSidebar"
                cClass="!h-full w-fit !px-2 !py-2 overflow-hidden !bg-[var(--primary-add-file-bg)]"
                cClassMenu="!h-full !w-fit"
                topClass="!h-full !w-fit"
                // icon={<MdOutlineSort className="text-[20px] text-white" />}
              />
              {/* show users or not */}
              <div className="w-[40px] h-[40px] shrink-0 flex items-center justify-center radius bg-[var(--icons-color)] text-white text-sm hover:bg-[var(--primary-color-light)] transition cursor-pointer">
                <FaUser />
              </div>
              {/* show columns or select cols to show */}
              <div className="w-[40px] h-[40px] shrink-0 flex items-center justify-center radius bg-[var(--icons-color)] text-white text-sm hover:bg-[var(--primary-color-light)] transition cursor-pointer">
                <CiCircleInfo />
              </div>
              {/* create Entity  */}
              {/* <CbuttonOne height="h-[40px]" cClasses="bg-[var(--icons-color)]">
                <span>Create Entity</span>{" "}
                <span className="text-sm text-white">
                  <FaPlus />
                </span>
              </CbuttonOne> */}
              <CreateButton
                onClick={() => setCreateEntityModal(!createEntityModal)}
                text="Create Entity"
              ></CreateButton>
            </div>
          </div>
          {/* table part  */}
          <OverviewDataTable
            headerCols={headerCols}
            createTask={() => setCreateTaskModal(!createTaskModal)}
            editEntity={editFilm}
            deleteEntity={deleteFilm}
          />
        </div>
      </div>

      {/* modals  */}
      {/* CREATE ENTITY  */}
      <GlobalPureModal open={createEntityModal} setOpen={setCreateEntityModal}>
        <div
          className="w-full max-w-[500px] h-[600px]"
          onClick={(e) => e.stopPropagation()}
        >
          <CreateEntityForm
            title={"Create Entity"}
            setCreateModal={setCreateEntityModal}
          />
        </div>
      </GlobalPureModal>
      {/* CREATE TASK  */}
      <GlobalPureModal open={createTaskModal} setOpen={setCreateTaskModal}>
        <div
          className="w-full max-w-[500px] h-[600px]"
          onClick={(e) => e.stopPropagation()}
        >
          <CreateTaskForm setOpen={setCreateTaskModal} fromOverView={true} />
        </div>
      </GlobalPureModal>
      {/* DELETE ENTITY  */}
      <GlobalPureModal open={delteEntityModal} setOpen={setDeleteEntityModal}>
        <div
          className="w-full max-w-[500px] h-[300px]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* <div className="text-white">the id for delete {deleteEntityId}</div> */}
          <DeleteEntityModal
            id={deleteEntityId}
            closeModal={() => setDeleteEntityModal(!delteEntityModal)}
          />
        </div>
      </GlobalPureModal>
      {/* EDITE ENTITY  */}
      <GlobalPureModal open={editEntityModal} setOpen={setEditEntityModal}>
        <div
          className="w-full max-w-[500px] h-[600px]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* <div className="text-white">
            data for edit {editEntityData?.name || ""}
          </div> */}
          <EditEntityForm closeModal={setEditEntityModal} />
        </div>
      </GlobalPureModal>
    </LayoutOne>
  );
};

export default TaskOverviewPage;
