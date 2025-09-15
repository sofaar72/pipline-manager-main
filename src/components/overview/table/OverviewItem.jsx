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
  setEditMode,
  taskHandleMouseDown,
  taskHandleMouseEnter,
  taskHandleMouseUp,
  isTaskSelected,
  setAddressbar,
  previewWidth,
  theShowPreview,
  setEntityId,
  setSelectedTasks,
  selectedMultipleTasks,
  allRows = [], // Add this prop to pass all rows data for range selection
  setTaskType,
  typeId,
  setTypeId,
}) => {
  const validCells = [
    "texturing",
    "rigging",
    "modeling",
    "shading",
    "animate",
    "light",
  ];

  const showPreview = (
    e,
    cellId = "",
    rowId = "",
    entName,
    taskId,
    entId,
    taskType
  ) => {
    // console.log(taskId);
    e.stopPropagation();
    setSelectedTasks([]);
    if (!cellId || !rowId || editMode) return;

    setEntityId(entId);
    setTaskType(taskType);

    if (validCells.includes(cellId)) {
      setAddressbar(entName + "/" + (cellId + "-" + rowId));
      setActiveTask({ collId: cellId, rowId: rowId });
      handleShowPrev(e, id, groupId, taskId);
    }
  };

  const handleCellClick = (e, cell) => {
    const {
      column: { id: cellId, type_id },
      row: { id: rowId, original },
    } = cell;

    setTypeId(cell.column.columnDef.type_id);

    if (!validCells.includes(cellId) || editMode) return;
    // console.log(original);

    setEntityId(original?.id);

    if (e.shiftKey) {
      // Shift+Click for range selection
      e.preventDefault();
      e.stopPropagation();

      selectedMultipleTasks(
        cellId,
        rowId,
        original?.departments || [],
        allRows,
        true // isShiftClick flag
      );
    } else if (e.ctrlKey || e.metaKey) {
      // Ctrl+Click for individual toggle (optional feature)
      e.preventDefault();
      e.stopPropagation();

      selectedMultipleTasks(
        cellId,
        rowId,
        original?.departments || [],
        allRows,
        false
      );
    } else {
      // Normal click - show preview
      showPreview(
        e,
        cellId,
        rowId,
        original?.name,
        cell.id,
        original?.id,
        cell?.column?.columnDef.header
      );
    }
  };

  return (
    <div
      key={item.id}
      className={`grid items-center gap-0 px-0 hover:bg-[var(--overview-color-progress)]/20 h-lg ${
        !tableItemsSize ? "h-[40px]" : "h-[120px]"
      } shrink-0 radius overflow-hidden cursor-pointer ${
        isSelected
          ? "bg-[var(--overview-color-select)]"
          : "bg-[var(--overview-color-two)]"
      } ${editMode && "!bg-[var(--overview-color-four)]"}`}
      style={{
        gridTemplateColumns,
        userSelect: editMode ? "none" : "auto",
        width: theShowPreview ? "100%" : `calc(100% - ${previewWidth}px)`,
      }}
      onMouseUp={taskHandleMouseUp}
    >
      {row.getVisibleCells().map((cell) => {
        const isValidTaskCell = validCells.includes(cell?.column.id);

        const hoverEffect =
          isValidTaskCell && !editMode
            ? "hover:bg-[var(--overview-color-progress)]"
            : "";

        const selected = isTaskSelected(cell.column.id, cell.row.id);
        const isActive =
          selected ||
          (activeTask.collId === cell.column.id &&
            activeTask.rowId === cell.row.id)
            ? "bg-[var(--overview-color-progress)]"
            : "";

        return (
          <div
            key={cell.id}
            className={`px-0 ${hoverEffect} ${isActive} ${
              cell.column.id !== "entity" &&
              "h-full flex items-center justify-center border-l border-r border-[var(--overview-color-three)]/50 px-2"
            } ${isValidTaskCell ? "select-none" : ""}`} // Prevent text selection on task cells
            onClick={(e) => handleCellClick(e, cell)}
            onContextMenu={(e) => {
              // Optional: Right-click context menu
              if (isValidTaskCell) {
                e.preventDefault();
                // You can add context menu logic here
              }
            }}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </div>
        );
      })}
    </div>
  );
};

export default OverviewItem;
