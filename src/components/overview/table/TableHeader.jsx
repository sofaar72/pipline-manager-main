import React from "react";

const TableHeader = ({
  gridTemplateColumns,
  columns,
  table,
  startResize,
  flexRender,
  showMeta,
  editMode,
  showPreview,
  previewWidth,
}) => {
  return (
    <div
      className={`overflow-hidden grid items-center gap-0 px-0 py-0 h-[40px] radius text-xs text-gray-300 border-b ${
        editMode
          ? "bg-[var(--overview-color-four)]"
          : "bg-[var(--overview-color-two)]"
      }  border-gray-800`}
      style={{
        gridTemplateColumns,
        width: showPreview ? "100%" : `calc(100% - ${previewWidth}px) `,
      }}
    >
      {columns.map((col) => {
        return (
          <div
            key={col.id}
            className={`w-full h-full  flex items-center justify-between relative ${
              (col.id === "episode" ||
                col.id === "duration" ||
                col.id === "deadline" ||
                col.id === "other") &&
              "bg-[var(--overview-color-one)] px-2 !justify-center border-l border-r border-white/20"
            }
      
      ${
        (col.id === "Modeling" ||
          col.id === "Rigging" ||
          col.id === "animate" ||
          col.id === "light" ||
          col.id === "Texturing" ||
          col.id === "Shading") &&
        "px-2 !justify-center border-l border-r border-white/20"
      }
      `}
          >
            <div className="flex items-center gap-2">
              <button
                onClick={() => table.getColumn(col.id)?.toggleSorting?.()}
                className="h-lg font-[500] text-white"
              >
                {flexRender(col.header, { column: col })}
              </button>
            </div>
            <div
              onMouseDown={(e) => startResize(e, col.id)}
              className="w-1 absolute right-0 h-full cursor-col-resize hover:bg-gray-400"
            ></div>
          </div>
        );
      })}
    </div>
  );
};

export default TableHeader;
