import React, { useEffect, useState } from "react";
import CommentWrapper from "./comments/CommentWrapper";
import FilesWrapper from "./files/FilesWrapper";

const PreviewFilesAndComments = ({
  switcher,
  setSwitcher,
  versionPreviewData,
  versionId,
  taskId,
  comments,
  sendComment,
  createCommentLoading,
  createResult,
  getAllComments,
  getAllCommentReplies,
  deleteCommentData,
  deleteComment,
  deleteLoading,
  deleteError,
  updateComment,
  updateLoading,
  updateError,
  fetchAllVersions,
  fetchVersionPreview,
}) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    setFiles(versionPreviewData?.files);
  }, [versionPreviewData]);

  return (
    <div className="w-full flex-1 radius bg-[var(--overview-color-two)] text-white h-lg flex items-center p-2 justify-center shrink-0">
      {switcher === "file" ? (
        <FilesWrapper
          files={files}
          taskId={taskId}
          versionId={versionId}
          fetchAllVersions={fetchAllVersions}
          fetchVersionPreview={fetchVersionPreview}
        />
      ) : (
        <CommentWrapper
          comments={comments}
          sendComment={sendComment}
          createCommentLoading={createCommentLoading}
          versionId={versionId}
          createResult={createResult}
          getAllComments={getAllComments}
          getAllCommentReplies={getAllCommentReplies}
          taskId={taskId}
          deleteCommentData={deleteCommentData}
          deleteComment={deleteComment}
          deleteLoading={deleteLoading}
          deleteError={deleteError}
          updateComment={updateComment}
          updateLoading={updateLoading}
          updateError={updateError}
        />
      )}
    </div>
  );
};

export default PreviewFilesAndComments;
