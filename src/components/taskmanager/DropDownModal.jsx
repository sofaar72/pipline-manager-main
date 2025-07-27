import React, { useEffect } from "react";
import AssigneeUser from "./AssigneeUser";
import { Assignees } from "../../fakeContents/Assignees";
import TasksIcon from "../golbals/CustomIcons.jsx/TasksIcon";

const DropDownModal = ({
  openDropDown,
  closeDropDown,
  items = [],
  setItems,
  selectedType,
}) => {
  const selectAction = (item) => {
    setItems({ id: item.id, name: item.name });
    closeDropDown(!openDropDown);
  };

  useEffect(() => {
    console.log(items);
  }, [items]);
  return (
    <div
      className={`w-full overflow-hidden h-fit bg-[#28263E] backdrop-blur-lg radius absolute left-0 top-[100%] transition px-4 py-4 z-[5000]  ${
        openDropDown ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="w-full flex gap-0 flex-col h-[200px]">
        <div className="w-full h-full flex flex-col   gap-4 overflow-y-auto py-4">
          {items?.map((item, i) => {
            return (
              <div
                className={`capitalize w-full flex items-center justify-between gap-2 cursor-pointer trantion hover:bg-[var(--primary-color-light)] ${
                  selectedType.id === item.id
                    ? "bg-[var(--primary-color-light)]"
                    : ""
                } radius p-2`}
                key={i}
                onClick={() => selectAction(item)}
              >
                <TasksIcon size={{ width: "16px", height: "16px" }} />
                <span>{item?.name}</span>
              </div>
              // <AssigneeUser
              //   assignees={assignees}
              //   setAssignees={setAssignees}
              //   assignee={assignee}
              // />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DropDownModal;
