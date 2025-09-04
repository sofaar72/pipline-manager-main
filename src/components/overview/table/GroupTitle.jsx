import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const GroupTitle = (props) => {
  const {
    setCollapsedGroups,
    collapsedGroups,
    group,
    previewWidth,
    showPreview,
  } = props;

  const toggleTable = (e) => {
    e.stopPropagation();
    setCollapsedGroups((prev) => ({
      ...prev,
      [group.groupName]: !prev[group.groupName],
    }));
  };
  return (
    <div
      className="shrink-0 w-full h-[60px] radius   flex items-center gap-2 justify-between "
      style={{
        width: showPreview ? "100%" : `calc(100% - ${previewWidth}px) `,
      }}
    >
      {/* icon  */}
      <div
        className={`shrink-0 w-[25px] h-[25px] bg-[var(--overview-color-todo)]/80 transition hover:bg-[var(--overview-color-todo)] flex items-center justify-center radius cursor-pointer text-xl `}
        onClick={toggleTable}
      >
        {collapsedGroups[group.groupName] ? "+" : "-"}
      </div>

      <div className="flex shrink-0 items-center gap-2 ">
        <div className="font-[400] h-lg shrink-0">{group.groupName}</div>
        <div className="h-regular text-gray-200">
          {group.items.length} items
        </div>
      </div>
      {/* dvider  */}
      <div className="w-full bg-white/20 h-[0.5px]"></div>
    </div>
  );
};

export default GroupTitle;
