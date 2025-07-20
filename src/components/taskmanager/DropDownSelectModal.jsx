import React from "react";
import AssigneeUser from "./AssigneeUser";
import { Assignees } from "../../fakeContents/Assignees";
import TasksIcon from "../golbals/CustomIcons.jsx/TasksIcon";

const DropDownSelectModal = ({
  openDropDown,
  closeDropDown,
  items,
  setItems,
  selected,
}) => {
  const selectAction = (item) => {
    setItems({ id: item.id, type: item.type });
    closeDropDown(!openDropDown);
  };
  return (
    <div
      className={`w-full overflow-hidden h-fit bg-[#28263E] backdrop-blur-lg radius absolute left-0 top-[100%] transition px-4 py-4 z-[5000]  ${
        openDropDown ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="w-full flex gap-0 flex-col h-fit">
        <div className="w-full h-full flex flex-col text-center  gap-2 overflow-y-auto py-4">
          {items?.map((item, i) => {
            return (
              <div
                className={`capitalize w-full flex text-center items-center justify-center gap-2 cursor-pointer trantion hover:bg-[var(--primary-color-light)] ${
                  selected.id === item.id
                    ? "bg-[var(--primary-color-light)]"
                    : ""
                } radius p-2`}
                key={i}
                onClick={() => selectAction(item)}
              >
                <span>{item?.type}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DropDownSelectModal;
