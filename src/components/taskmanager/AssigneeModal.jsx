import React, { useEffect } from "react";
import AssigneeUser from "./AssigneeUser";

const AssigneeModal = ({
  openAssign,
  setOpenAssign,
  assignees,
  setAssignees,
}) => {
  return (
    <div
      className={`w-full overflow-hidden h-fit bg-[#28263E]/60 backdrop-blur-lg radius absolute left-0 top-[100%] transition px-4 py-4  ${
        openAssign ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="w-full flex gap-4 flex-col h-[200px] ">
        <div className="w-full h-full grid grid-cols-[repeat(6,1fr)] grid-rows-4   gap-2 gap-y-4 overflow-y-auto py-2">
          {assignees.map((assignee, index) => {
            return (
              <AssigneeUser
                key={index}
                setAssignees={setAssignees}
                assignee={assignee}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AssigneeModal;
