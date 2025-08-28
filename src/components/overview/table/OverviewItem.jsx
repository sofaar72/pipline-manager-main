import React, { useEffect } from "react";

const OverviewItem = ({
  handleShowPrev,
  id,
  groupId,
  isSelected,
  item,
  row,
  flexRender,
  gridTemplateColumns,
  tableItemsSize,
}) => {
  const showPreview = (e) => {
    handleShowPrev(e, id, groupId);
  };
  console.log(item);
  return (
    <div
      key={item.id}
      className={`grid items-center gap-0 px-0  hover:bg-[var(--overview-color-progress)]/20 h-lg transition ${
        !tableItemsSize ? "h-[40px]" : "h-[120px]"
      } shrink-0 radius overflow-hidden cursor-pointer
        
         ${
           isSelected
             ? "bg-[var(--overview-color-select)]"
             : "bg-[var(--overview-color-two)]"
         }
        `}
      style={{ gridTemplateColumns }}
      onClick={showPreview}
    >
      {row.getVisibleCells().map((cell) => {
        return (
          <div
            key={cell.id}
            className={`px-0 ${
              cell.column.id !== "entity" &&
              " h-full flex items-center justify-center border-l border-r border-[var(--overview-color-three)]/50 px-2 "
            }`}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </div>
        );
      })}
    </div>
  );
};

export default OverviewItem;
