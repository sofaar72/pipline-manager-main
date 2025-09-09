import { useEffect, useMemo, useState } from "react";

export const useTableData = ({ tableItems = [] }) => {
  /**
   * Helper to map status -> Tailwind classes
   */
  const statusClasses = (status) => {
    switch (status) {
      case "Todo":
        return "bg-sky-500 text-white";
      case "In Progress":
        return "bg-amber-500 text-white";
      case "Blocked":
        return "bg-red-500 text-white";
      case "Done":
        return "bg-emerald-400 text-black";
      default:
        return "bg-gray-600 text-white";
    }
  };

  // Departments (Tasks) (demo)
  const DEPARTMENTS = ["Modeling", "Texturing", "Rigging", "Shading"];

  // Demo sample data
  const SAMPLE_DATA = Array.from({ length: 12 }).map((_, i) => ({
    id: `task-${i + 1}`,
    thumbnail: `https://picsum.photos/seed/${i + 1}/40/40`,
    name: `Entity Name ${i + 1}`,
    episode: `Episode ${Math.ceil((i + 1) / 3)}`,
    duration: `Duration ${i + 1}`,
    deadline: `Deadline ${i + 1}`,
    other: `Other ${i + 1}`,
    group: i < 6 ? "Group A" : "Group B",
    departments: DEPARTMENTS.reduce((acc, d, idx) => {
      const statuses = ["Todo", "In Progress", "Blocked", "Done"];
      // console.log(acc);
      acc[d] = {
        status: statuses[(i + idx) % statuses.length],
        assignees: [
          {
            id: `user-${(i + idx) % 5}`,
            name: `User ${(i + idx) % 5}`,
            avatar: `https://i.pravatar.cc/40?img=${(i + idx) % 70}`,
          },
          {
            id: `user-${(i + idx) % 5}`,
            name: `User ${(i + idx) % 5}`,
            avatar: `https://i.pravatar.cc/40?img=${(i + idx) % 70}`,
          },
          {
            id: `user-${(i + idx) % 5}`,
            name: `User ${(i + idx) % 5}`,
            avatar: `https://i.pravatar.cc/40?img=${(i + idx) % 70}`,
          },
        ],
      };
      return acc;
    }, {}),
  }));

  // REAL DATA
  const [dynamicDepartments, setDynamicDepartments] = useState([]);

  useEffect(() => {
    if (!tableItems || !tableItems.length) return;

    // 1. Collect all unique task types
    const depts = [];
    tableItems.forEach((item) => {
      (item.tasks || []).forEach((task) => {
        if (task.type && !depts.includes(task.type)) {
          depts.push(task.type);
        }
      });
    });

    setDynamicDepartments(depts);
  }, [tableItems]);

  const REAL_DATA = useMemo(() => {
    return tableItems.map((item) => {
      const departmentsObj = {};

      (item.tasks || []).forEach((task) => {
        // console.log(task);
        departmentsObj[task.type] = {
          taskId: task.id,
          status: task.status?.name || "Todo",
          assignees: (task.assignee || []).map((id) => ({
            id,
            name: `User ${id}`,
            avatar: `https://i.pravatar.cc/40?img=${id % 70}`,
          })),
        };
      });

      // Make sure all dynamicDepartments exist
      dynamicDepartments.forEach((dept) => {
        if (!departmentsObj[dept]) {
          departmentsObj[dept] = { status: "", assignees: [] };
        }
      });

      return {
        id: item.id,
        name: item.name,
        thumbnail: item.thumbnail || "",
        episode: item.parent || "",
        group: item.parent || "Ungrouped",
        departments: departmentsObj,
        duration: item.duration || "",
        location: item.location || "",
        other: "",
      };
    });
  }, [tableItems, dynamicDepartments]);

  // useEffect(() => {
  //   console.log(REAL_DATA);
  // }, [REAL_DATA]);
  // useEffect(() => {
  //   console.log(SAMPLE_DATA);
  // }, [REAL_DATA]);

  // Default widths
  const DEFAULT_WIDTHS = {
    entity: 200,
    episode: 100,
    duration: 100,
    deadline: 100,
    other: 100,
  };

  DEPARTMENTS.forEach((d) => (DEFAULT_WIDTHS[d] = 200));
  dynamicDepartments.forEach((d) => (DEFAULT_WIDTHS[d] = 200));

  return {
    statusClasses,
    DEPARTMENTS,
    SAMPLE_DATA,
    dynamicDepartments,
    REAL_DATA,
    DEFAULT_WIDTHS,
  };
};
