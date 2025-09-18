import React, { useEffect } from "react";
import OverviewItem from "./OverviewItem";
import GroupTitle from "./GroupTitle";

const OverviewItems = ({
  handleShowPrev,
  activeTask,
  setActiveTask,
  selectedId,
  groupId,
  grouped,
  setCollapsedGroups,
  collapsedGroups,
  rowById,
  gridTemplateColumns,
  flexRender,
  tableItemsSize,
  tableItems,
  editMode,
  taskHandleMouseDown,
  taskHandleMouseEnter,
  taskHandleMouseUp,
  isTaskSelected,
  setAddressbar,
  previewWidth,
  showPreview,
  setEntityId,
  setTaskId,
  setTaskType,
  setSelectedTasks,
  selectedMultipleTasks,
  selectSingleTask, // Add this prop
  addToSelection, // Add this prop (legacy)
  handleTaskSelection, // Add this new prop from the hook
  typeId,
  setTypeId,
  selectedTasks,
}) => {
  return (
    <div className="w-full h-full flex-1 ">
      <div className="w-full h-full flex flex-col gap-0  overflow-auto pr-[10px] pb-[20px]">
        {grouped.map((g, gIndex) => (
          <div key={g.groupName}>
            <GroupTitle
              group={g}
              collapsedGroups={collapsedGroups}
              setCollapsedGroups={setCollapsedGroups}
              previewWidth={previewWidth}
              showPreview={showPreview}
            />

            {!collapsedGroups[g.groupName] && (
              <div className="flex flex-col gap-[5px]">
                {g?.items?.map((item, i) => {
                  const row = rowById.get(item.id);
                  if (!row) return null;
                  return (
                    <OverviewItem
                      key={i}
                      handleShowPrev={handleShowPrev}
                      activeTask={activeTask}
                      setActiveTask={setActiveTask}
                      id={i}
                      groupId={gIndex}
                      isSelected={selectedId == i && groupId == gIndex}
                      item={item}
                      row={row}
                      flexRender={flexRender}
                      gridTemplateColumns={gridTemplateColumns}
                      tableItemsSize={tableItemsSize}
                      editMode={editMode}
                      taskHandleMouseDown={taskHandleMouseDown}
                      taskHandleMouseEnter={taskHandleMouseEnter}
                      taskHandleMouseUp={taskHandleMouseUp}
                      isTaskSelected={isTaskSelected}
                      setAddressbar={setAddressbar}
                      previewWidth={previewWidth}
                      theShowPreview={showPreview}
                      setEntityId={setEntityId}
                      setTaskId={setTaskId}
                      setTaskType={setTaskType}
                      setSelectedTasks={setSelectedTasks}
                      selectedMultipleTasks={selectedMultipleTasks}
                      selectSingleTask={selectSingleTask} // Pass the function
                      addToSelection={addToSelection} // Pass the function (legacy)
                      handleTaskSelection={handleTaskSelection} // Pass the new main handler
                      allRows={g?.items} // This allows range selection within the group
                      typeId={typeId}
                      setTypeId={setTypeId}
                      selectedTasks={selectedTasks}
                    />
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewItems;
