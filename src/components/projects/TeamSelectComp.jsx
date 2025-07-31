import React from "react";
import { Members } from "../../fakeContents/Members";
import TeamItem from "./TeamItem";

const TeamSelectComp = ({ members, setMembers }) => {
  return (
    <div className="w-full h-full grid grid-cols-4 grid-rows-auto gap-4">
      {Members.map((member) => (
        <TeamItem
          key={member.id}
          member={member}
          members={members}
          setMembers={setMembers}
        />
      ))}
    </div>
  );
};

export default TeamSelectComp;
