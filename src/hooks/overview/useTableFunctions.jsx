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

export const useTableFunctions = ({
  tableItemsSize = false,
  showMeta = true,
  showAssignees = true,
  tableItems = [],
  editMode,
  setEditMode,
}) => {
  const { statusClasses, DEPARTMENTS, SAMPLE_DATA, DEFAULT_WIDTHS } =
    useTableData({ tableItems });

  // Build REAL_DATA directly from incoming tableItems
  const REAL_DATA = useMemo(() => {
    return tableItems.map((item, i) => ({
      id: item.id || `task-${i + 1}`,
      thumbnail: item.thumbnail || "",
      name: item.name || "",
      episode: item.episode || `Episode ${Math.ceil((i + 1) / 3)}`,
      duration: item.duration || "",
      deadline: item.deadline || item.metadata || "",
      other: item.other || item.metadata || "",
      group: item.parent || "Ungrouped",
      departments: (item.tasks || []).reduce((acc, task) => {
        acc[task.name] = {
          status: task.status,
          assignees: task.assignees || [],
        };
        return acc;
      }, {}),
    }));
  }, [tableItems]);

  const [data, setData] = useState(SAMPLE_DATA);

  // useEffect(() => {
  //   setData(REAL_DATA);
  // }, [REAL_DATA]);

  const [columnWidths, setColumnWidths] = useState(() => {
    try {
      //   const raw = localStorage.getItem("task_table_col_widths");
      return raw ? JSON.parse(raw) : DEFAULT_WIDTHS;
    } catch (e) {
      return DEFAULT_WIDTHS;
    }
  });

  const [sorting, setSorting] = useState([]);

  // const episodeNumbers = Array.from(
  //   new Set(tableItems.flatMap((item) => item.episodes.map((e) => e.ep)))
  // );
  const columns = useMemo(() => {
    // 1. Base static columns
    const base = [
      {
        id: "entity",
        header: () => (
          <div className="flex items-center gap-2 w-full">
            <TheIcon
              cClass="!border-none !bg-[var(--overview-color-three)] hover:!bg-[var(--overview-color-four)] w-[40px] h-[40px] !rounded-none"
              onClick={() => setEditMode((prev) => !prev)}
            >
              <FaRegEdit className="w-4 h-4 text-white" />
            </TheIcon>
            <span>Entity Name</span>
          </div>
        ),
        cell: ({ row }) => {
          const r = row.original;
          return (
            <div
              className={`w-full ${
                !tableItemsSize ? "h-[40px]" : "h-[100px]"
              } flex items-center gap-3`}
            >
              <img
                src={
                  r.thumbnail ||
                  "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
                }
                className={`${
                  !tableItemsSize ? "w-[40px] h-[40px]" : "w-[100px] h-[100px]"
                }`}
                alt="thumb"
              />
              <div className="flex flex-col">
                <div className="font-[500] h-lg">{r.name}</div>
              </div>
            </div>
          );
        },
        type: "entity",
      },
      {
        id: "episode",
        accessorFn: (row) => row.episode,
        header: "EP.",
        cell: (info) => info.getValue(),
        type: "meta",
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

    // 2. Dynamic department columns
    const deptCols = DEPARTMENTS.map((d) => ({
      id: d,
      header: d,
      cell: ({ row }) => {
        const val = row.original.departments[d];
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
            {/* <div className="absolute top-0 left-0 w-full h-full bg- z-[99999]"></div> */}
            <div
              className={`${
                editMode && "pointer-none"
              } px-3 py-1 radius w-[100px] h-regular font-[500] flex items-center justify-center text-center text-white ${statusClasses(
                val.status
              )}`}
            >
              {val.status}
            </div>
            <div
              className={`${editMode && "pointer-none"} flex transition ${
                !tableItemsSize ? "w-1/2" : "w-full"
              } gap-1 relative`}
            >
              {showAssignees && (
                <>
                  {val.assignees && (
                    <div
                      className={`${
                        editMode && "pointer-none"
                      } flex items-center relative`}
                    >
                      {val.assignees.slice(0, 2).map((assignee, i) => (
                        <img
                          key={i}
                          src={assignee.avatar}
                          className={`w-7 h-7 rounded-full ${
                            editMode && "pointer-none"
                          }`}
                          alt={assignee.name}
                        />
                      ))}
                      {val.assignees.length > 1 && (
                        <span className="ml-1">...</span>
                      )}
                    </div>
                  )}
                  <div className="w-7 h-7 rounded-full bg-[var(--overview-color-three)] absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center transition hover:bg-[var(--overview-color-four)]">
                    <BsThreeDots className="text-xs" />
                  </div>
                </>
              )}
            </div>
          </div>
        );
      },
      type: "tasks",
    }));

    // 3. Combine with conditional meta
    const allCols = [...base, ...deptCols];
    return showMeta ? allCols : allCols.filter((col) => col.type !== "meta");
  }, [tableItemsSize, showMeta, showAssignees, tableItems, editMode]);

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
  }, [table]);

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
    const sizes = columns.map(
      (c) => `${columnWidths[c.id] ?? DEFAULT_WIDTHS[c.id] ?? 150}px`
    );
    return sizes.join(" ");
  }, [columns, columnWidths]);

  const startResize = (e, colId) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = columnWidths[colId] ?? DEFAULT_WIDTHS[colId] ?? 150;
    const minWidth = getColumnMinWidth(columns.find((c) => c.id === colId));

    const onMove = (ev) => {
      const dx = ev.clientX - startX;
      setColumnWidths((prev) => {
        const newWidth = Math.min(
          Math.max(startWidth + dx, minWidth),

          colId === "Modeling" ||
            colId === "Texturing" ||
            colId === "Rigging" ||
            colId === "Shading"
            ? 250
            : colId === "entity"
            ? 250
            : 150
        );
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
    if (col.id === "entity") {
      return 180;
      // const values = data.map((row) => row.name || "");

      // const span = document.createElement("span");
      // span.style.visibility = "hidden";
      // span.style.position = "absolute";
      // span.style.fontSize = "12px"; // match your table font
      // span.style.fontFamily = "sans-serif";
      // document.body.appendChild(span);

      // let maxWidth = 0;
      // values.forEach((v) => {
      //   span.innerText = v;
      //   maxWidth = Math.max(maxWidth, span.offsetWidth);
      // });

      // document.body.removeChild(span);

      // const measured = maxWidth + 60; // padding + thumb allowance
      // return Math.min(Math.max(measured, 150), 250);
    }

    // Meta data columns → fixed between 100–150
    if (["episode", "duration", "deadline", "other"].includes(col.id)) {
      return 100; // will be clamped in resize between 100–150
    }

    // Department task columns → fixed between 180–250
    if (DEPARTMENTS.includes(col.id)) {
      return 200; // will be clamped in resize between 180–250
    }

    return 120; // fallback if some unknown col appears
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
