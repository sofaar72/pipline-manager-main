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
}) => {
  return (
    <div className="divide-y divide-gray-800 flex flex-col gap-2">
      {grouped.map((g, gIndex) => (
        <>
          {/* {console.log(g)} */}
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
                    />
                  );
                })}
                {/* {tableItems?.map((item, i) => {
                  // const row = rowById.get(item.id);
                  // if (!row) return null;
                  return (
                    
                    <OverviewItem
                      key={i}
                      handleShowPrev={handleShowPrev}
                      id={i}
                      groupId={gIndex}
                      isSelected={selectedId == i && groupId == gIndex}
                      item={item}
                      row={row}
                      flexRender={flexRender}
                      gridTemplateColumns={gridTemplateColumns}
                      tableItemsSize={tableItemsSize}
                    />
                  );
                })} */}
              </div>
            )}
          </div>
        </>
      ))}
    </div>
  );
};

export default OverviewItems;
