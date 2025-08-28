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

  // Default widths
  const DEFAULT_WIDTHS = {
    entity: 200,
    episode: 100,
    duration: 100,
    deadline: 100,
    other: 100,
  };

  DEPARTMENTS.forEach((d) => (DEFAULT_WIDTHS[d] = 200));

  return {
    statusClasses,
    DEPARTMENTS,
    SAMPLE_DATA,
    DEFAULT_WIDTHS,
  };
};
