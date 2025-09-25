import React, { useEffect, useRef } from "react";
import TheDropDown from "../TheDropDown";
import { IoMdClose } from "react-icons/io";
import TheIcon from "../TheIcon";
import TheButton from "../TheButton";

const MobileEntSelectBox = ({
  selectedProject,
  selectProject,
  selectedEntType,
  setType,
  entType,
  entities,
  projects,
  EntTypes,
  closeModal,
  openCreateEntity,
  openCreateAsset,
}) => {
  const boxRef = useRef(null);
  // 🔑 Detect clicks outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        closeModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeModal]);

  return (
    <div
      ref={boxRef}
      className="w-[610px] h-[60px] bg-[var(--overview-color-one)] p-2 flex items-center justify-between radius  gap-2 relative border-2 border-white/20"
      onClick={(e) => e.stopPropagation()}
    >
      {/* projects  */}
      <TheDropDown
        init={selectedProject.name ? selectedProject.name : "projects"}
        items={projects.map((project) => {
          return { id: project?.id, name: project?.name };
        })}
        funcAfter={selectProject}
      />
      {/* ent types  */}
      <TheDropDown
        init={selectedEntType}
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
      {entType?.name !== "Episodes" && entType?.name !== "Assets" && (
        <TheDropDown
          init="Episodes"
          items={entities.map((entity) => ({
            id: entity?.id,
            name: entity?.name,
          }))}
          width="w-[120px]"
        />
      )}

      {/* create entity  */}
      {selectedEntType !== "Assets" ? (
        <div className="w-fit shrink-0 h-full flex items-center gap-[5px] p-[5px] text-white radius">
          <TheButton
            cClass="flex items-center justify-between gap-2 h-regular"
            onClick={openCreateEntity}
          >
            <span>Create Entity</span>
            <span>+</span>
          </TheButton>
        </div>
      ) : (
        <div className="w-fit shrink-0 h-full flex items-center gap-[5px] p-[5px] text-white radius">
          <TheButton
            cClass="flex items-center justify-between gap-2 h-regular"
            onClick={openCreateAsset}
          >
            <span>Create Asset</span>
            <span>+</span>
          </TheButton>
        </div>
      )}

      {/* close icon  */}
      <TheIcon
        onClick={() => closeModal(false)}
        cClass="border-none text-white"
      >
        <IoMdClose />
      </TheIcon>
    </div>
  );
};

export default MobileEntSelectBox;
