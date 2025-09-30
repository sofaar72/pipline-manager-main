import React, { useEffect, useState } from "react";
import PreviewAddress from "./PreviewAddress";
import PreviewTopBar from "./PreviewTopBar";
import PreviewVideoWrapper from "./PreviewVideoWrapper";
import PreviewFilesAndComments from "./PreviewFilesAndComments";
import { useTasks } from "../../../hooks/useTasks";
import PreviewNoTask from "./PreviewNoTask";
import PreviewLoading from "./PreviewLoading";
import { useComments } from "../../../hooks/useComments";

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
  versionResults,
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
}) => {
  const [switcher, setSwitcher] = useState("comment");

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

  // FETCH VERSIONS OF THE TASK
  // useEffect(() => {
  //   if (taskResults.length > 0) {
  //     fetchAllVersions(taskResults[0]?.id, setVersionId);
  //   }
  // }, [taskResults]);

  // useEffect(() => {
  //   if (taskResults) {
  //     console.log(taskResults);
  //   }
  // }, [taskResults]);

  // FETCH SINGLE VERSION
  useEffect(() => {
    console.log(versionId);
    if (versionId && versionId.id) {
      fetchVersionPreview(versionId.id);
    } else {
      clearVersionPreview();
    }
    getAllComments(versionId?.id, taskId);
  }, [versionId]); // Added versionResults to dependencies

  // useEffect(() => {
  //   console.log(versionId);
  // }, [versionId]);

  if (loading) {
    return <PreviewLoading />;
  } else if (versionPreviewLoading) {
    return <PreviewLoading />;
  }

  return (
    <div
      className="w-full h-full flex flex-col gap-[10px] p-[10px] shrink-0"
      onClick={(e) => {
        e.stopPropagation();
        // stopResizing();
      }}
    >
      {taskResults.length > 0 ? (
        <>
          <PreviewTopBar hidePrev={hidePrev} />
          <PreviewAddress addressbar={addressbar} />

          <PreviewVideoWrapper
            switcher={switcher}
            setSwitcher={setSwitcher}
            previewWidth={previewWidth}
            isResizing={isResizing}
            versionId={versionId}
            setVersionId={setVersionId}
            versionLoading={versionLoading}
            versionResults={versionResults}
            versionPreviewData={versionPreviewData}
            versionPreviewLoading={versionPreviewLoading}
            fetchAllVersions={fetchAllVersions}
            getAllComments={getAllComments}
            taskId={taskId}
            setFullScreenOverview={setFullScreenOverview}
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
    </div>
  );
};

export default PreviewMain;
