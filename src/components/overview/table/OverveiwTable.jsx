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

export default function OverviewTable({
  tableItemsSize,
  handleShowPrev,
  selectedId,
  groupId,
  showMeta,
  showAssignees,
  tableItems,
}) {
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
    tableItemsSize,
    showMeta,
    showAssignees,
    tableItems,
  });

  useEffect(() => {
    // localStorage.setItem("task_table_col_widths", JSON.stringify(columnWidths));
  }, [columnWidths]);

  return (
    <div className="w-full min-h-screen p-6 bg-[#0f0f14] text-white">
      <div className="flex gap-6">
        <div className="flex-1 rounded-md bg-[#14131a] p-3">
          <div className="overflow-auto rounded-md bg-[#0f0f14] p-2">
            <TableHeader
              gridTemplateColumns={gridTemplateColumns}
              columns={columns}
              table={table}
              startResize={startResize}
              flexRender={flexRender}
              showMeta={showMeta}
            />

            <OverviewItems
              handleShowPrev={handleShowPrev}
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
            />
          </div>
        </div>
      </div>
    </div>
  );
}
