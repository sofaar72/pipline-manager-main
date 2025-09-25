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
  handleTaskSelection, // New prop for the main handler
  allRows = [], // Add this prop to pass all rows data for range selection
  setTaskType,
  typeId,
  setTypeId,
  selectedTasks,
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

    const typeId = cell.column.columnDef.type_id;
    setTypeId(typeId);

    if (!validCells.includes(cellId) || editMode) return;

    setEntityId(original?.id);

    // Determine which modifiers are pressed
    const isShiftClick = e.shiftKey;
    const isCtrlClick = e.ctrlKey || e.metaKey;

    // Use the new handleTaskSelection function if available, otherwise fall back to selectedMultipleTasks
    const shouldShowPreview = handleTaskSelection
      ? handleTaskSelection(
          cellId,
          rowId,
          original?.departments || [],
          allRows,
          isShiftClick,
          isCtrlClick,
          original?.id, // <- pass entityId
          typeId // Pass typeId here
        )
      : selectedMultipleTasks(
          cellId,
          rowId,
          original?.departments || [],
          allRows,
          isShiftClick,
          isCtrlClick,
          original?.id,
          typeId // Pass typeId here
        );

    // Only show preview for normal clicks (no modifiers)
    if (!isShiftClick && !isCtrlClick && shouldShowPreview) {
      // console.log(cell.column.columnDef.id);
      showPreview(
        e,
        cellId,
        rowId,
        original?.name,
        cell.id,
        original?.id,
        cell?.column?.columnDef.id
      );
    }

    // Prevent default behavior and event bubbling for modifier clicks
    if (isShiftClick || isCtrlClick) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const visibleCells = row.getVisibleCells();
  const nontaskCells = visibleCells.filter(
    (c) => !validCells.includes(c.column.id)
  );
  const taskCells = visibleCells.filter((c) =>
    validCells.includes(c.column.id)
  );

  return (
    <div
      key={item.id}
      className={`w-full grid items-center gap-0 px-0 hover:bg-[var(--overview-color-progress)]/20 h-lg ${
        !tableItemsSize ? "h-[40px]" : "h-[120px]"
      } shrink-0 radius overflow-hidden cursor-pointer ${
        isSelected
          ? "bg-[var(--overview-color-select)]"
          : "bg-[var(--overview-color-two)]"
      } ${editMode && "!bg-[var(--overview-color-four)]"}`}
      style={{
        gridTemplateColumns,
        userSelect: editMode ? "none" : "auto",
        // width: theShowPreview ? "100%" : `calc(100% - ${previewWidth}px)`,
      }}
      onMouseUp={taskHandleMouseUp}
    >
      {visibleCells.map((cell) => {
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
              `h-full flex items-center justify-center ${
                !cell.id.includes("add_task") &&
                "border-l border-r border-[var(--overview-color-three)]/50"
              }  px-2`
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
