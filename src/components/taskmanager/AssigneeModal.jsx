import React from "react";
import AssigneeUser from "./AssigneeUser";
import { Assignees } from "../../fakeContents/Assignees";

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
        <div className="w-full h-full grid grid-cols-[repeat(6,1fr)]  justify-between gap-2 overflow-y-auto py-4">
          {Assignees.map((assignee, index) => {
            return (
              <AssigneeUser
                key={index}
                assignees={assignees}
                setOpenAssign={setOpenAssign}
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
