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
  setTaskType,
  setTaskId,
  setTypeId,
  typeId,
  loading,
  handleAddUserTaskModal,
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
    selectSingleTask, // Get the new function
    toggleSingleTask, // Get the new function for Ctrl+Click
    selectRangeTask, // Get the new function for Shift+Click
    extendSelectionRange, // Get the new function for Shift+Ctrl+Click
    handleTaskSelection, // Get the main handler function
    addToSelection, // Get the legacy function
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
    loading,
    handleAddUserTaskModal,
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
        // Get all items from all groups for select all
        const allItems = grouped.flatMap((g) => g.items || []);
        selectAllTasks(allItems);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [clearSelection, selectAllTasks, grouped]);

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
                setTaskId={setTaskId}
                setTaskType={setTaskType}
                setSelectedTasks={setSelectedTasks}
                selectedMultipleTasks={selectedMultipleTasks}
                selectSingleTask={selectSingleTask} // Pass the new function
                toggleSingleTask={toggleSingleTask} // Pass the new function for Ctrl+Click
                selectRangeTask={selectRangeTask} // Pass the new function for Shift+Click
                extendSelectionRange={extendSelectionRange} // Pass the new function for Shift+Ctrl+Click
                handleTaskSelection={handleTaskSelection} // Pass the main handler function
                addToSelection={addToSelection} // Pass the legacy function
                typeId={typeId}
                setTypeId={setTypeId}
              />
            </div>

            {/* Enhanced Selection status indicator with more detailed info */}
            {selectedTasks.length > 0 && (
              <div className="px-4 py-2 bg-[var(--overview-color-two)] border-t border-[var(--overview-color-three)]/30">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-300">
                      {selectedTasks.length} task
                      {selectedTasks.length > 1 ? "s" : ""} selected
                      {selectedTasks.length === 1 && (
                        <span className="text-blue-400 ml-1">
                          (preview shown)
                        </span>
                      )}
                      {selectedTasks.length > 1 && (
                        <span className="text-orange-400 ml-1">
                          (multiple selection)
                        </span>
                      )}
                    </span>
                    {selectedTasks.length > 0 && (
                      <div className="text-xs text-gray-400">
                        <span className="text-gray-500">Tips:</span>
                        <span className="ml-1">
                          Click = Select • Ctrl+Click = Toggle • Shift+Click =
                          Range • Shift+Ctrl+Click = Extend Range
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const allItems = grouped.flatMap((g) => g.items || []);
                        selectAllTasks(allItems);
                      }}
                      className="text-xs px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                      title="Select All Tasks (Ctrl+A)"
                    >
                      Select All
                    </button>
                    <button
                      onClick={clearSelection}
                      className="text-xs px-2 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
                      title="Clear Selection (Escape)"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
