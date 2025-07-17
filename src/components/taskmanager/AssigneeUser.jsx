import React, { useEffect, useState } from "react";

const AssigneeUser = ({ assignee, assignees, setAssignees, setOpenAssign }) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (checked) {
      // ✅ Add if not already in list
      setAssignees((prev) => {
        if (!prev.find((a) => a.id === assignee.id)) {
          return [...prev, assignee];
        }
        return prev;
      });
    } else {
      // ❌ Remove from list
      setAssignees((prev) => prev.filter((a) => a.id !== assignee.id));
    }
  }, [checked, assignee, setAssignees]);

  const handleCheck = () => {
    // setOpenAssign()
    setChecked((prev) => !prev);
  };

  return (
    <div className="w-[40px] h-[40px] relative " onClick={() => handleCheck()}>
      {/* checkbox  */}
      <div
        className={`absolute -top-1  w-[20px] h-[20px] transition ${
          checked ? "bg-[var(--primary-color-light)]" : "bg-white"
        } rounded-full overflow-hidden`}
      >
        {/* check image  */}
        <img
          className={`absolute cursor-pointer border w-full h-full object-cover rounded-full transition ${
            checked ? "opacity-100" : "opacity-0"
          }`}
          src="/icons/Check Mark.svg"
          alt=""
        />
      </div>
      <img
        className="cursor-pointer border w-full h-full  border-white/80 rounded-full "
        src="/images/sidebar-avatar.png"
        alt=""
      />
    </div>
  );
};

export default AssigneeUser;
