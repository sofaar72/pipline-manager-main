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
    selectedTasks,
    isDragging,
    taskHandleMouseDown,
    taskHandleMouseEnter,
    taskHandleMouseUp,
    isTaskSelected,
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

  return (
    <div
      className={`${collapseWidth} h-fit p-0 bg-[var(--overview-color-bg)] text-white`}
    >
      <div className="flex gap-6">
        <div className="flex-1 rounded-md bg-[#14131a] py-8">
          <div className="overflow-auto rounded-md bg-[#0f0f14] p-0">
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
            />
          </div>
        </div>
      </div>
    </div>
  );
}
