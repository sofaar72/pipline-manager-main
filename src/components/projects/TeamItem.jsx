import React, { useEffect, useState } from "react";
import { ImCheckboxUnchecked } from "react-icons/im";
import { FaCheckSquare } from "react-icons/fa";

const TeamItem = ({ member, setMembers, members }) => {
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    setChecked(!checked);
    // if (checked) {
    //   console.log(member.id);
    //   setMembers(member.id);
    // } else {
    //   const newMembers = members.filter((m) => m.id !== member.id);
    //   setMembers(newMembers);
    // }
  };

  useEffect(() => {
    setMembers(member.id, checked);
  }, [checked]);

  return (
    <div
      className={`w-full transition h-full min-h-[60px] flex items-center justify-between gap-2 radius border border-white/10 p-2 cursor-pointer  backdrop-blur-lg ${
        checked ? "bg-[#575789]" : "bg-[#38385E]"
      }`}
      onClick={handleCheck}
    >
      {/* avatar part  */}
      <div className="w-[46px] h-[46px] rounded-full overflow-hidden bg-white">
        <img src={member.avatar} alt="" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-medium text-white">
          {member.name}
        </span>
        <span className="text-[9px] font-medium text-white/80">
          {member.email}
        </span>
      </div>
      {/* custom checkbox input  */}

      <div onClick={handleCheck} className="cursor-pointer">
        {!checked ? (
          <ImCheckboxUnchecked className="text-white text-2xl" />
        ) : (
          <FaCheckSquare className="text-white text-2xl" />
        )}
      </div>
    </div>
  );
};

export default TeamItem;
