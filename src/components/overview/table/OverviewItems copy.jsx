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
  selectSingleTask,
  addToSelection,
  handleTaskSelection,
  typeId,
  setTypeId,
  selectedTasks,
  setEntityValidTaskTypes,
}) => {
  return (
    <div className="w-full h-[700px] flex-1">
      <div
        className="w-full h-full flex flex-col gap-0 pr-[10px] pb-[20px]"
        style={{
          // Ensure consistent width with header
          width: "100%",
          minWidth: "fit-content",
        }}
      >
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
              <div className="w-full flex flex-col gap-[5px]">
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
                      selectSingleTask={selectSingleTask}
                      addToSelection={addToSelection}
                      handleTaskSelection={handleTaskSelection}
                      allRows={g?.items}
                      typeId={typeId}
                      setTypeId={setTypeId}
                      selectedTasks={selectedTasks}
                      setEntityValidTaskTypes={setEntityValidTaskTypes}
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
