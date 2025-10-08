import { useEffect, useMemo, useState } from "react";
import { useTableData } from "./useTableData";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { FaRegEdit } from "react-icons/fa";
import TheIcon from "../../components/overview/TheIcon";
import { FaPlus } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { IoIosAdd } from "react-icons/io";

export const useTableFunctions = ({
  selectedProject = "",
  tableItemsSize = false,
  showMeta = true,
  showAssignees = true,
  tableItems = [],
  editMode,
  setEditMode,
  loading,
  handleAddUserTaskModal = () => {},
  handleCreateGlobalTaskModal = () => {},
  selectedEntType,
}) => {
  const {
    DEPARTMENTS,
    SAMPLE_DATA,
    DEFAULT_WIDTHS,
    dynamicDepartments,
    REAL_DATA,
  } = useTableData({ tableItems, selectedEntType });

  // Initialize with REAL_DATA instead of SAMPLE_DATA
  const [data, setData] = useState(REAL_DATA);

  // Update data when REAL_DATA changes
  useEffect(() => {
    setData(REAL_DATA);
  }, [REAL_DATA]);

  const [columnWidths, setColumnWidths] = useState(() => {
    // Fixed localStorage implementation (removed since localStorage isn't supported in Claude artifacts)
    return DEFAULT_WIDTHS;
  });

  const [sorting, setSorting] = useState([]);

  const columns = useMemo(() => {
    if (!data.length && !REAL_DATA.length) return [];

    // 1️⃣ Base static columns
    const base = [
      {
        id: "entity",
        header: () => (
          <div className="flex items-center gap-2 w-full">
            <div className="w-[40px] h-[40px]"></div>
            {/* <TheIcon
              cClass="!border-none !bg-[var(--overview-color-three)] hover:!bg-[var(--overview-color-four)] w-[40px] h-[40px] !rounded-none"
              onClick={() => setEditMode((prev) => !prev)}
            >
              <FaRegEdit className="w-4 h-4 text-white" />
            </TheIcon> */}
            <span>Entity Name</span>
          </div>
        ),
        cell: ({ row }) => {
          const r = row.original;
          return (
            <div className={`w-full flex items-center gap-3`}>
              <img
                src={
                  r.thumbnail ||
                  "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
                }
                className={`${
                  !tableItemsSize ? "h-[40px]" : "h-[120px]"
                } bg-[var(--overview-color-three)]/20 object-contain aspect-[16/9] object-left`}
                alt="thumb"
              />
              <div className="flex flex-col overflow-hidden">
                <div className="font-[500] h-lg">
                  {r.name.length > 12 ? r.name.slice(0, 12) + "..." : r.name}
                </div>
              </div>
            </div>
          );
        },
        type: "entity",
      },
      {
        id: "episode",
        accessorFn: (row) => row.episode,
        header: "Parent",
        cell: (info) => info.getValue(),
        type: "entity",
      },
      {
        id: "duration",
        accessorFn: (row) => row.duration,
        header: "Duration",
        cell: (info) => info.getValue(),
        type: "meta",
      },
      {
        id: "deadline",
        accessorFn: (row) => row.deadline,
        header: "Deadline",
        cell: (info) => info.getValue(),
        type: "meta",
      },
      {
        id: "other",
        accessorFn: (row) => row.other,
        header: "Other",
        cell: (info) => info.getValue(),
        type: "meta",
      },
    ];

    // 2️⃣ Dynamic department columns from real data
    const deptCols = dynamicDepartments.map((dept) => ({
      id: dept.name,
      type_id: dept.id,
      short_name: dept.short_name,
      header: dept.name,
      cell: ({ row }) => {
        const val = row?.original?.departments?.[dept.name];

        // console.log(val);
        // console.log(row?.original?.departments);
        // console.log(val);
        if (!val || !val.status.name || !row.original.tasks) {
          return (
            <div className="flex items-center justify-center text-gray-400">
              No data
            </div>
          );
        }

        return (
          <div
            className={`flex transition ${
              !tableItemsSize
                ? "flex-row items-center justify-between"
                : "flex-col"
            } gap-2 px-0 py-[5px] w-full h-full relative ${
              editMode && "pointer-none"
            }`}
          >
            <div
              className={`${editMode && "pointer-none"} px-3 py-1 radius ${
                showAssignees ? "w-[100px]" : "flex-1 shrink-0 w-full"
              } h-regular font-[500] flex items-center justify-center text-center text-white `}
              style={{ backgroundColor: val?.status?.color }}
            >
              {val?.status?.shortName || "No Status"}
            </div>

            {showAssignees && val?.assignees?.length > 0 && (
              <div
                className={`${editMode && "pointer-none"} flex transition ${
                  !tableItemsSize ? "w-1/2" : "w-full"
                } gap-1 relative`}
              >
                <div className={`flex items-center relative`}>
                  {val.assignees.slice(0, 2).map((assignee, i) => (
                    <div key={i}>
                      <img
                        src={assignee.avatar}
                        className="w-7 h-7 rounded-full"
                        alt={assignee.name}
                        data-tooltip-id={`assignee-${assignee.id}_${i}`} // unique per avatar
                      />
                      <ReactTooltip
                        id={`assignee-${assignee.id}_${i}`}
                        place="top"
                      >
                        {assignee.name}
                      </ReactTooltip>
                    </div>
                  ))}
                  {val.assignees.length > 2 && (
                    <span className="ml-1">...</span>
                  )}
                </div>
              </div>
            )}
            <div
              onClick={(e) => {
                e.stopPropagation();

                handleAddUserTaskModal(val.assignees, val.taskId);
              }}
              className="w-7 h-7 rounded-full bg-[var(--overview-color-three)] absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center transition hover:bg-[var(--overview-color-four)]"
            >
              {/* <BsThreeDots className="text-xs" />  */}
              <IoIosAdd className="text-xs" />
            </div>
          </div>
        );
      },
      type: "tasks",
    }));

    const addTask = {
      id: "add_task",
      header: () => {
        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCreateGlobalTaskModal();
            }}
            className="flex items-center w-full  h-full h-regular gap-2 cursor-pointer"
          >
            <span>Add Task</span>
            <FaPlus />
          </button>
        );
      },
      cell: () => {
        return null;
      },
      type: "tasks",
    };

    // 3️⃣ Combine base + dynamic department columns
    const allCols = [...base, ...deptCols, addTask];

    return showMeta ? allCols : allCols.filter((col) => col.type !== "meta");
  }, [
    // Fixed dependency array - removed nested arrays
    REAL_DATA,
    dynamicDepartments,
    tableItemsSize,
    showMeta,
    showAssignees,
    editMode,
    data,

    loading,
  ]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const rowById = useMemo(() => {
    const map = new Map();
    table.getRowModel().rows.forEach((r) => map.set(r.original.id, r));
    return map;
  }, [table, loading]);

  const grouped = useMemo(() => {
    const m = new Map();
    data.forEach((t) => {
      const g = t.group || "Ungrouped";
      const arr = m.get(g) || [];
      arr.push(t);
      m.set(g, arr);
    });
    return Array.from(m.entries()).map(([groupName, items]) => ({
      groupName,
      items,
    }));
  }, [data]);

  const [collapsedGroups, setCollapsedGroups] = useState({});

  const gridTemplateColumns = useMemo(() => {
    const sizes = columns.map((c) => {
      if (c.id === "entity" && tableItemsSize) {
        // when tableItemSize is true → make entity column flexible
        return "400px";
      }
      if (
        (c.id === "modeling" ||
          c.id === "texturing" ||
          c.id === "light" ||
          c.id === "animate" ||
          c.id === "rigging" ||
          c.id === "shading") &&
        !showAssignees
      ) {
        return " 100px";
      }
      return `${columnWidths[c.id] ?? DEFAULT_WIDTHS[c.id] ?? 150}px`;
    });
    return sizes.join(" ");
  }, [columns, columnWidths, tableItemsSize, showAssignees]);

  const startResize = (e, colId) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = columnWidths[colId] ?? DEFAULT_WIDTHS[colId] ?? 150;
    const minWidth = getColumnMinWidth(columns.find((c) => c.id === colId));

    const onMove = (ev) => {
      const dx = ev.clientX - startX;
      setColumnWidths((prev) => {
        const newWidth = Math.max(startWidth + dx, minWidth);
        return { ...prev, [colId]: newWidth };
      });
    };

    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  const getColumnMinWidth = (col) => {
    // Entity column → dynamic measurement, clamped 150–250
    if (col?.id === "entity") {
      return 180;
    }

    // Meta data columns → fixed between 100–150
    if (
      ["episode", "duration", "deadline", "other", "add_task"].includes(col?.id)
    ) {
      return 100; // will be clamped in resize between 100–150
    }

    // Department task columns → fixed between 180–250
    if (
      DEPARTMENTS.includes(col?.id) ||
      dynamicDepartments.some((dept) => dept.name === col?.id)
    ) {
      return 200; // will be clamped in resize between 180–250
    }

    return 200; // fallback if some unknown col appears
  };

  return {
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
  };
};
