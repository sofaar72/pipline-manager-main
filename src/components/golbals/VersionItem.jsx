import React, { useEffect } from "react";

const VersionItem = ({ version, activeVersion, selectVersion }) => {
  console.log(version);
  return (
    <div
      className={`w-full h-[60px] radius  flex gap-[15px] version-bg items-center px-[5px] py-[4px] cursor-pointer transition hover:!bg-[var(--primary-color-light)] ${
        activeVersion ? "!bg-[var(--primary-color-light)]" : ""
      } relative border border-white/20`}
      onClick={() => selectVersion(version.id)}
    >
      <div className="w-[50px] h-full radius overflow-hidden">
        <img
          className="w-full h-full object-cover border border-white/50 radius"
          src={version?.thumbnail || "/images/place-holder.svg"}
          alt=""
        />
      </div>
      {/* line  */}
      <div className="w-[1px] h-full bg-white/10"></div>
      {/* text part  */}
      <div className="w-fit h-full flex flex-col gap-[3px] justify-center ">
        <span className="text-[11px] font-[300]">
          Version {version?.version}
        </span>
        <span className="text-[9px] font-[300]">
          Assign to {version?.person?.first_name}
        </span>
        <span className="text-[9px] font-[300]">
          total files {version?.files?.length}
        </span>
      </div>
    </div>
  );
};

export default VersionItem;
