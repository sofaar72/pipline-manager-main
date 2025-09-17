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
}) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    setFiles(versionPreviewData?.files);
  }, [versionPreviewData]);

  return (
    <div className="w-full flex-1 radius bg-[var(--overview-color-two)] text-white h-lg flex items-center p-2 justify-center shrink-0">
      {switcher === "file" ? (
        <FilesWrapper files={files} versionId={versionId} />
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
        />
      )}
    </div>
  );
};

export default PreviewFilesAndComments;
