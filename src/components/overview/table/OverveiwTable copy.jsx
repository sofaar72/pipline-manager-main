/*
  TaskOverviewTable_TanStack_Tailwind.jsx

  React + Tailwind example (JavaScript, no TypeScript) showing a custom task manager table
  using @tanstack/react-table as the logic layer and completely custom UI renderers.

  Features implemented:
  - columns definition + dynamic department columns
  - sorting (via TanStack)
  - manual grouping (group header rows with collapse)
  - custom status cell with status chip + avatar
  - draggable-style column resizing (custom implementation, persisted to localStorage)
  - responsive grid-based column layout so headers and body align
  - sample data to match your design (thumbnails, group rows, multiple dept columns)

  Notes:
  - This is a demo starter. Next steps (drag&drop ordering, virtualization, inline edit,
    server-side pagination / filters, context menus) are described below.
*/

import React, { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import TableHeader from "./TableHeader";
import OverviewItems from "./OverviewItems";
import { useTableFunctions } from "../../../hooks/overview/useTableFunctions";
import { useTableTaskSettings } from "../../../hooks/overview/useTableTaskSettings,js";

export default function OverviewTable({
  tableItemsSize,
  handleShowPrev,
  activeTask,
  setActiveTask,
  selectedId,
  groupId,
  showMeta,
  showAssignees,
  tableItems,
  collapseWidth,
  setAddressbar,
  showPreview,
  previewWidth,
  selectedProject,
  setEntityId,
}) {
  // TASK SETTINGS HOOK
  const {
    editMode,
    setEditMode,
    isDragging,
    taskHandleMouseDown,
    taskHandleMouseEnter,
    taskHandleMouseUp,
    isTaskSelected,
    setSelectedTasks,
    selectedTasks,
    selectedMultipleTasks,
    clearSelection,
    selectAllTasks,
  } = useTableTaskSettings();

  const {
    data,
    columnWidths,
    setColumnWidths,
    sorting,
    setSorting,
    columns,
    table,
    rowById,
    grouped,
    collapsedGroups,
    setCollapsedGroups,
    gridTemplateColumns,
    startResize,
    getColumnMinWidth,
  } = useTableFunctions({
    selectedProject,
    tableItemsSize,
    showMeta,
    showAssignees,
    tableItems,
    editMode,
    setEditMode,
  });

  useEffect(() => {
    // localStorage.setItem("task_table_col_widths", JSON.stringify(columnWidths));
  }, [columnWidths]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        clearSelection();
      } else if (e.ctrlKey && e.key === "a") {
        e.preventDefault();
        selectAllTasks(tableItems);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [clearSelection, selectAllTasks, tableItems]);

  return (
    <div
      className={`${collapseWidth} h-full p-0 bg-[var(--overview-color-bg)] text-white `}
    >
      <div className="w-full h-full flex flex-1 gap-0">
        <div className="w-full h-full flex-1 rounded-md bg-[#14131a] py-8">
          <div className="w-full h-full rounded-md bg-[#0f0f14] p-0 flex flex-col gap-[10px] ">
            <TableHeader
              gridTemplateColumns={gridTemplateColumns}
              columns={columns}
              table={table}
              startResize={startResize}
              flexRender={flexRender}
              showMeta={showMeta}
              editMode={editMode}
              showPreview={showPreview}
              previewWidth={previewWidth}
            />
            <div className="w-full h-full flex-1  shrink-0 overflow-hidden">
              <OverviewItems
                handleShowPrev={handleShowPrev}
                activeTask={activeTask}
                setActiveTask={setActiveTask}
                selectedId={selectedId}
                groupId={groupId}
                grouped={grouped}
                setCollapsedGroups={setCollapsedGroups}
                collapsedGroups={collapsedGroups}
                rowById={rowById}
                gridTemplateColumns={gridTemplateColumns}
                flexRender={flexRender}
                tableItemsSize={tableItemsSize}
                tableItems={tableItems}
                editMode={editMode}
                taskHandleMouseDown={taskHandleMouseDown}
                taskHandleMouseEnter={taskHandleMouseEnter}
                taskHandleMouseUp={taskHandleMouseUp}
                isTaskSelected={isTaskSelected}
                setAddressbar={setAddressbar}
                showPreview={showPreview}
                previewWidth={previewWidth}
                setEntityId={setEntityId}
                setSelectedTasks={setSelectedTasks}
                selectedMultipleTasks={selectedMultipleTasks}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
