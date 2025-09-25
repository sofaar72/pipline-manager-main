import React, { useEffect, useState } from "react";
import TheDropDown from "./TheDropDown";
import { entities as EntTypes } from "../../fakeContents/Entities";
import TheButton from "./TheButton";
import { IoIosCheckboxOutline } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { FaFilter } from "react-icons/fa6";
import { HiFilter } from "react-icons/hi";
import { FaSearch, FaUser } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { TbResize } from "react-icons/tb";

import TheIcon from "./TheIcon";
import TheSearch from "./TheSearch";
import TheSavedFiltersDropDown from "./TheSavedFiltersDropDown";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";
import GlobalPureModal from "../golbals/GlobalPureModal";
import MobileEntSelectBox from "./overviewHeader/MobileEntSelectBox";
import MobileSearchBox from "./overviewHeader/MobileSearchBox";

const OverviewHeaderMobile = ({
  children,
  projects,
  selectProject,
  selectedProject,
  entities,
  openCreateEntity,
  openCreateAsset,
  resizeTableItems,
  tableItemsSize,
  showMeta,
  setShowMeta,
  showAssignees,
  setShowAssignees,
  setSelectedEntType,
  selectedEntType,
  showPreview,
  previewWidth,
  searchEntity,
  searchItem,
  filterByUser,
}) => {
  const [entType, setEntType] = useState({ id: 3, name: "All" });
  const [searchModal, setSearchModal] = useState(false);
  const [entSelectModal, setEntSelectModal] = useState(false);

  const openSearchModal = () => {
    setSearchModal(true);
  };

  const setType = (type) => {
    setSelectedEntType(type.name);
    setEntType(type);
  };

  return (
    <>
      <div
        className={`w-full h-[50px] radius px-[10px] py-[5px] bg-[var(--overview-color-one)] flex items-center gap-2 justify-between`}
        style={{
          width: showPreview ? "100%" : `calc(100% - ${previewWidth}px)`,
        }}
      >
        {/* TODO PROJECTS ENTITIES EPISODE SELECT  */}
        <div className="w-[155px] shrink-0 h-full flex items-center gap-[5px] p-[5px] text-white radius ">
          {/* Ent filtersIcon  */}
          <TheIcon
            onClick={() => setEntSelectModal(!entSelectModal)}
            cClass="relative"
            title="Entity Fiters"
          >
            {entSelectModal && (
              <div className="w-fit absolute top-[100%] mt-[10px] left-0 z-[999999999999]">
                <MobileEntSelectBox
                  selectedProject={selectedProject}
                  selectProject={selectProject}
                  selectedEntType={selectedEntType}
                  setType={setType}
                  entType={entType}
                  entities={entities}
                  EntTypes={EntTypes}
                  projects={projects}
                  closeModal={setEntSelectModal}
                  openCreateEntity={openCreateEntity}
                  openCreateAsset={openCreateAsset}
                />
              </div>
            )}
            <IoEyeSharp />
          </TheIcon>
          {/* Assign to me  */}
          <TheIcon onClick={() => filterByUser()} title="Assign to me">
            <IoIosCheckboxOutline />
          </TheIcon>
          {/* Search Icon  */}
          <TheIcon
            onClick={() => setSearchModal(!searchModal)}
            title="search"
            cClass="relative"
          >
            {searchModal && (
              <div className="absolute top-[100%] mt-[10px] left-0 z-[999999999999]">
                <MobileSearchBox
                  searchItem={searchItem}
                  searchEntity={searchEntity}
                  closeModal={setSearchModal}
                />
              </div>
            )}
            <FaSearch />
          </TheIcon>
        </div>

        {/* OTHER WIDGETs  */}
        <div className="w-fit shrink-0 h-full flex items-center gap-[5px] p-[5px] text-white radius ml-auto">
          <TheIcon
            onClick={() => {
              setShowAssignees(!showAssignees);
            }}
            cClass="!w-[25px] !h-[25px] !rounded-full"
          >
            <FaUser />
          </TheIcon>
          <TheIcon
            onClick={() => {
              setShowMeta(!showMeta);
            }}
            cClass={`!w-[25px] !h-[25px] !rounded-full ${
              showMeta && "!bg-[var(--overview-color-four)]"
            }`}
          >
            <FaInfoCircle />
          </TheIcon>
          <TheIcon
            onClick={() => {
              resizeTableItems();
            }}
            cClass={`!w-[25px] !h-[25px] !rounded-full ${
              tableItemsSize && "!bg-[var(--overview-color-four)]"
            }`}
          >
            <TbResize />
          </TheIcon>
          <TheIcon cClass="!w-[25px] !h-[25px] !border-none">
            <BsThreeDotsVertical />
          </TheIcon>
        </div>
      </div>
    </>
  );
};

export default OverviewHeaderMobile;
