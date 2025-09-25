import { useEffect, useMemo, useState } from "react";

export const useTableData = ({ tableItems = [], selectedEntType }) => {
  /**
   * Helper to map status -> Tailwind classes
   */
  const statusClasses = (status, color) => {
    switch (status) {
      case "todo":
        return { className: "!text-white", style: { backgroundColor: color } };
      case "In Progress":
        return { className: "bg-amber-500 text-white" };
      case "Blocked":
        return { className: "bg-red-500 text-white" };
      case "Done":
        return { className: "bg-emerald-400 text-black" };
      default:
        return { className: "bg-gray-600 text-white" };
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
    // console.log(tableItems);
    if (!tableItems || !tableItems.length) return;

    // 1. Collect all unique task types
    const depts = [];
    tableItems.forEach((item) => {
      (item.tasks || []).forEach((task) => {
        console.log(task);
        if (
          task.type.name &&
          !depts.some((dept) => dept.name === task.type.name)
        ) {
          depts.push({
            name: task.type.name,
            id: task.type.id,
            color: task.type.color,
            short_name: task.type.short_name,
          });
        }
      });
    });

    setDynamicDepartments(depts);
  }, [tableItems]);

  const REAL_DATA = useMemo(() => {
    return tableItems.map((item) => {
      const departmentsObj = {};

      const assignees = [];

      (item.tasks || []).forEach((task) => {
        const deptKey = task?.type?.name;

        // Build new assignees for this task
        const newAssignees = (task.assignee || []).map((id) => ({
          id,
          name: `User ${id}`,
          avatar: `https://i.pravatar.cc/40?img=${id % 70}`,
        }));

        if (!departmentsObj[deptKey]) {
          // First time we see this department → create new entry
          departmentsObj[deptKey] = {
            type: {
              name: task.type.name,
              id: task.type.id,
              color: task.type.color,
              short_name: task.type.short_name,
            },
            taskId: task.id,
            status: {
              name: task.status?.name || "todo",
              id: task.status?.id || null,
              color: task.status?.color,
            },
            assignees: [...newAssignees],
          };
        } else {
          // Already exists → push new assignees
          departmentsObj[deptKey].assignees = [
            ...departmentsObj[deptKey].assignees,
            ...newAssignees,
          ];
        }

        // Optionally also keep a global flat list
        assignees.push(...newAssignees);
      });

      // Make sure all dynamicDepartments exist
      dynamicDepartments.forEach((dept) => {
        if (!departmentsObj[dept?.name]) {
          departmentsObj[dept?.name] = { status: "", assignees: [] };
        }
      });

      return {
        id: item.id,
        name: item.name,
        thumbnail: item.thumbnail || "",
        episode:
          selectedEntType === "Assets" ? item.group || "" : item.parent || "",
        group:
          selectedEntType === "Assets"
            ? item.group || ""
            : item.parent || "Ungrouped",
        departments: departmentsObj,
        duration: item.duration || "",
        location: item.location || "",
        other: "",
        tasks: item.tasks,
        user_assignees: assignees,
      };
    });
  }, [tableItems, dynamicDepartments]);

  // useEffect(() => {
  //   const userId = Number(localStorage.getItem("user_id")); // ensure it's a number
  //   const filteredData = REAL_DATA.filter((data) =>
  //     data.user_assignees.some((p) => p.id === userId)
  //   );

  //   console.log(filteredData);
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
  dynamicDepartments.forEach((d) => (DEFAULT_WIDTHS[d.name] = 200));

  return {
    statusClasses,
    DEPARTMENTS,
    SAMPLE_DATA,
    dynamicDepartments,
    REAL_DATA,
    DEFAULT_WIDTHS,
  };
};
