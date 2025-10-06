import React, { useEffect, useState } from "react";
import PreviewAddress from "./PreviewAddress";
import PreviewTopBar from "./PreviewTopBar";
import PreviewVideoWrapper from "./PreviewVideoWrapper";
import PreviewFilesAndComments from "./PreviewFilesAndComments";
import { useTasks } from "../../../hooks/useTasks";
import PreviewNoTask from "./PreviewNoTask";
import PreviewLoading from "./PreviewLoading";
import { useComments } from "../../../hooks/useComments";
import GlobalPureModal from "../../golbals/GlobalPureModal";
import DeleteTaskModal from "../DeleteTaskModal";
import UpdateMultipleTasksModal from "../UpdateTaskModal/UpdateMultipleTasksModal";

const PreviewMain = ({
  addressbar,
  previewWidth,
  stopResizing,
  isResizing,
  hidePrev,
  taskResults,
  loading,
  fetchAllVersions,
  versionLoading,

  fetchVersionPreview,

  versionPreviewData,
  versionPreviewLoading,
  versionId,
  setVersionId,
  handleCreateTaskModal,
  clearVersionPreview,
  taskId,
  typeId,
  setFullScreenOverview,
  entityValidTaskTypes,
  fetchEntities,
}) => {
  const [switcher, setSwitcher] = useState("comment");
  const [deleteTaskModal, setDeleteTaskModal] = useState(false);
  const [updateTaskModal, setUpdateTaskModal] = useState(false);
  const [tasksToRemove, setTasksToRemove] = useState([]);

  const {
    getAllComments,
    getAllCommentReplies,
    comments,
    loading: commentsLoading,
    sendTheComment,
    createLoading,
    createComment: createResult,
    createError,
    deleteCommentData,
    deleteTheComment,
    deleteLoading,
    deleteError,
    updateTheComment,
    updateLoading,
    updateError,
    updateRes,
  } = useComments();

  // FETCH SINGLE VERSION
  useEffect(() => {
    if (versionId && versionId.id) {
      fetchVersionPreview(versionId.id);
    } else {
      clearVersionPreview();
    }
    getAllComments(versionId?.id, taskId);
  }, [versionId]); // Added versionResults to dependencies

  // useEffect(() => {
  //   console.log(previewWidth);
  // }, [previewWidth]);

  // Handler functions for task operations
  const handleUpdateTask = () => {
    setUpdateTaskModal(true);
  };

  const handleDeleteTask = () => {
    if (taskId) {
      setTasksToRemove([taskId]);
      setDeleteTaskModal(true);
    }
  };

  // Enhanced refresh function that updates both entities and tasks
  const handleRefreshAfterTaskUpdate = () => {
    // Refresh entity data to get updated task information
    if (fetchEntities) {
      fetchEntities();
    }
  };

  // Check if current task has data
  const hasTaskData = taskId && Object.keys(taskResults).length > 0;

  return (
    <div
      className="w-full h-full flex flex-col gap-[10px] p-[10px] shrink-0"
      onClick={(e) => {
        e.stopPropagation();

        // stopResizing();
      }}
    >
      {Object.keys(taskResults).length > 0 ? (
        <>
          <PreviewTopBar
            hidePrev={hidePrev}
            taskId={taskId}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            hasTaskData={hasTaskData}
          />
          <PreviewAddress addressbar={addressbar} />

          <PreviewVideoWrapper
            switcher={switcher}
            setSwitcher={setSwitcher}
            previewWidth={previewWidth}
            isResizing={isResizing}
            versionId={versionId}
            setVersionId={setVersionId}
            versionLoading={versionLoading}
            versionResults={taskResults}
            versionPreviewData={versionPreviewData}
            versionPreviewLoading={versionPreviewLoading}
            fetchAllVersions={fetchAllVersions}
            getAllComments={getAllComments}
            taskId={taskId}
            setFullScreenOverview={setFullScreenOverview}
            entityValidTaskTypes={entityValidTaskTypes}
          />

          {Object.keys(versionPreviewData).length !== 0 && (
            <PreviewFilesAndComments
              switcher={switcher}
              setSwitcher={setSwitcher}
              versionPreviewData={versionPreviewData}
              comments={comments}
              sendComment={sendTheComment}
              createCommentLoading={createLoading}
              versionId={versionId}
              createResult={createResult}
              getAllComments={getAllComments}
              getAllCommentReplies={getAllCommentReplies}
              taskId={taskId}
              deleteCommentData={deleteCommentData}
              deleteComment={deleteTheComment}
              deleteLoading={deleteLoading}
              deleteError={deleteError}
              updateComment={updateTheComment}
              updateLoading={updateLoading}
              updateError={updateError}
              fetchAllVersions={fetchAllVersions}
              fetchVersionPreview={fetchVersionPreview}
            />
          )}
        </>
      ) : (
        <PreviewNoTask openCreateTask={handleCreateTaskModal} />
      )}

      {/* Modals for task operations */}
      <GlobalPureModal open={deleteTaskModal} setOpen={setDeleteTaskModal}>
        <DeleteTaskModal
          tasksToRemove={tasksToRemove}
          fetchData={handleRefreshAfterTaskUpdate}
          closeModal={setDeleteTaskModal}
        />
      </GlobalPureModal>

      <GlobalPureModal open={updateTaskModal} setOpen={setUpdateTaskModal}>
        <UpdateMultipleTasksModal
          selectedTasksNumbers={1}
          taskIdies={[taskId]}
          status={540}
          setModal={setUpdateTaskModal}
          fetchData={handleRefreshAfterTaskUpdate}
        />
      </GlobalPureModal>
    </div>
  );
};

export default PreviewMain;
