import React, { useEffect, useState } from "react";
import { useStage } from "../../../hooks/annotationHooks/useStage";

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
  activeTask,
  setActiveTask,
  editMode,
  taskHandleMouseDown,
  taskHandleMouseEnter,
  taskHandleMouseUp,
  isTaskSelected,
  setAddressbar,
}) => {
  // const [activeTask, setActiveTask] = useState("");

  const showPreview = (e, cellId = "", rowId = "", entName) => {
    if (!cellId || !rowId || editMode) return;

    if (["Texturing", "Rigging", "Modeling", "Shading"].includes(cellId)) {
      setAddressbar(entName + "/" + (cellId + "-" + rowId));
      setActiveTask({ collId: cellId, rowId: rowId }); // mark this task active
      handleShowPrev(e, id, groupId);
    }
  };

  useEffect(() => {
    console.log("Active task:", activeTask);
  }, [activeTask]);

  return (
    <div
      key={item.id}
      className={`grid items-center gap-0 px-0 hover:bg-[var(--overview-color-progress)]/20 h-lg  ${
        !tableItemsSize ? "h-[40px]" : "h-[120px]"
      } shrink-0 radius overflow-hidden cursor-pointer
        ${
          isSelected
            ? "bg-[var(--overview-color-select)]"
            : "bg-[var(--overview-color-two)]"
        }   ${editMode && "!bg-[var(--overview-color-four)]"}`}
      style={{ gridTemplateColumns, userSelect: editMode ? "none" : "auto" }}
      onMouseUp={taskHandleMouseUp}
    >
      {row.getVisibleCells().map((cell) => {
        const hoverEffect =
          ["Texturing", "Rigging", "Modeling", "Shading"].includes(
            cell?.column.id
          ) && !editMode
            ? "hover:bg-[var(--overview-color-progress)]"
            : "";

        const selected = isTaskSelected(cell.column.id, cell.row.id);
        const isActive =
          selected ||
          (activeTask.collId === cell.column.id &&
            activeTask.rowId === cell.row.id)
            ? "bg-[var(--overview-color-progress)]" // highlight active
            : "";

        return (
          <div
            key={cell.id}
            className={`px-0 ${hoverEffect} ${isActive} ${
              cell.column.id !== "entity" &&
              "h-full flex items-center justify-center border-l border-r border-[var(--overview-color-three)]/50 px-2 "
            }`}
            onClick={(e) =>
              showPreview(
                e,
                cell?.column.id,
                cell?.row.id,
                cell?.row?.original?.name
              )
            }
            onMouseDown={() =>
              taskHandleMouseDown(cell?.column.id, cell?.row.id)
            }
            onMouseEnter={() =>
              taskHandleMouseEnter(cell?.column.id, cell?.row.id)
            }
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </div>
        );
      })}
    </div>
  );
};

export default OverviewItem;
