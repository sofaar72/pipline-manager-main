import React, { useEffect, useState } from "react";
import TheDropDown from "./TheDropDown";
import { entities as EntTypes } from "../../fakeContents/Entities";
import TheButton from "./TheButton";
import { IoIosCheckboxOutline } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { FaFilter } from "react-icons/fa6";
import { HiFilter } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { TbResize } from "react-icons/tb";

import TheIcon from "./TheIcon";
import TheSearch from "./TheSearch";
import TheSavedFiltersDropDown from "./TheSavedFiltersDropDown";
import { BsThreeDotsVertical } from "react-icons/bs";

const OverviewHeader = ({
  children,
  projects,
  selectProject,
  selectedProject,
  entities,
  openCreateEntity,
  resizeTableItems,
  tableItemsSize,
  showMeta,
  setShowMeta,
  showAssignees,
  setShowAssignees,
  setSelectedEntType,
  selectedEntType,
}) => {
  const [entType, setEntType] = useState({ id: 3, name: "All" });

  console.log(selectedEntType);

  const setType = (type) => {
    setSelectedEntType(type.name);
    setEntType(type);
  };

  return (
    <div className="w-full h-[50px] radius px-[10px] py-[5px] bg-[var(--overview-color-one)] flex items-center gap-2 justify-between">
      {/* TODO PROJECTS ENTITIES EPISODE SELECT  */}
      <div className="w-[155px] shrink-0 h-full flex items-center gap-[5px] p-[5px] text-white radius">
        <TheDropDown
          init={selectedProject.name ? selectedProject.name : "projects"}
          items={projects.map((project) => {
            return { id: project?.id, name: project?.name };
          })}
          funcAfter={selectProject}
        />
        <TheDropDown
          init={"All"}
          items={
            EntTypes.map((ent, i) => {
              return {
                id: i,
                name: ent,
              };
            }) || []
          }
          width={"w-[120px]"}
          funcAfter={setType}
        />
        {entType?.name !== "Episodes" && (
          <TheDropDown
            init={"Episodes"}
            items={entities.map((entity) => {
              return { id: entity?.id, name: entity?.name };
            })}
            width={"w-[100px]"}
          />
        )}
      </div>

      {/* TODO CREATE Entity  */}
      <div className="w-fit shrink-0 h-full flex items-center gap-[5px] p-[5px] text-white radius">
        <TheButton
          cClass="flex items-center justify-between gap-2 h-regular"
          onClick={openCreateEntity}
        >
          <span>Create Entity</span>
          <span>+</span>
        </TheButton>
      </div>

      {/* TODO SERCH AND FILTERS  */}
      <div className="w-fit shrink-0 h-full flex items-center gap-[5px] p-[5px] text-white radius">
        {/* Assign to me  */}
        <TheIcon onClick={() => {}}>
          <IoIosCheckboxOutline />
        </TheIcon>
        {/* Search  */}
        <TheSearch placeHolder="Search.." />
        {/* advance filter  */}
        <TheIcon onClick={() => {}}>
          <FaFilter />
        </TheIcon>
        {/* small filter  */}
        <TheIcon onClick={() => {}}>
          <HiFilter />
        </TheIcon>
        <TheSavedFiltersDropDown width={"w-[160px]"} />
      </div>
      {/* TODO WIDGETS AND CREATE   ENTITY  */}
      <div className="w-fit shrink-0 h-full flex items-center gap-[5px] p-[5px] text-white radius">
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
          cClass="!w-[25px] !h-[25px] !rounded-full"
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
  );
};

export default OverviewHeader;
