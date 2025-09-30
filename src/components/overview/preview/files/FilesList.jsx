import React from "react";
import FileItem from "./FileItem";
import FileDviderTitle from "./FileDviderTitle";
import { useUploadFile } from "../../../../hooks/useUploadFile";

const FilesList = ({ files, checkedFiles, fetchVersionPreview, versionId }) => {
  const { removeFile } = useUploadFile();

  // Filter files into categories
  const exportFiles = files.filter((file) => file.is_export);
  const resourceFiles = files.filter((file) => file.is_resource);
  const workFiles = files.filter(
    (file) => !file.is_exported && !file.is_resource
  );

  return (
    <div className="flex flex-col h-[360px] overflow-y-auto">
      <div className="flex-1 flex flex-col gap-2 pr-2 bg-[var(--overview-color-two)] text-white">
        {}
        {/* Work Files Section */}
        {checkedFiles.isAll && workFiles.length > 0 && (
          <div className="w-full flex flex-col gap-[10px]">
            <FileDviderTitle title="Work Files" />
            {workFiles.map((file) => (
              <FileItem
                key={file.id}
                file={file}
                isMasterFile={file.is_master}
                isPublishFile={file.is_publish}
                isExport={file.is_exported}
                isResource={file.is_resource}
                isPreview={file.is_preview}
                remove={removeFile}
                fetchVersionPreview={fetchVersionPreview}
                versionId={versionId}
              />
            ))}
          </div>
        )}

        {/* Exports Section */}
        {checkedFiles.isExport && exportFiles.length > 0 && (
          <div className="w-full flex flex-col gap-[10px]">
            <FileDviderTitle title="Exports" />
            {exportFiles.map((file) => (
              <FileItem
                key={file.id}
                file={file}
                isMasterFile={file.is_master}
                isPublishFile={file.is_publish}
                isExport={file.is_exported}
                isResource={file.is_resource}
                isPreview={file.is_preview}
                remove={removeFile}
                fetchVersionPreview={fetchVersionPreview}
                versionId={versionId}
              />
            ))}
          </div>
        )}

        {/* Resources/Dependencies Section */}
        {checkedFiles.isRecource && resourceFiles.length > 0 && (
          <div className="w-full flex flex-col gap-[10px]">
            <FileDviderTitle title="Resources" />
            {resourceFiles.map((file) => (
              <FileItem
                key={file.id}
                file={file}
                isMasterFile={file.is_master}
                isPublishFile={file.is_publish}
                isExport={file.is_exported}
                isResource={file.is_resource}
                isPreview={file.is_preview}
                remove={removeFile}
                fetchVersionPreview={fetchVersionPreview}
                versionId={versionId}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {files.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-400">
            No files available
          </div>
        )}
      </div>
    </div>
  );
};

export default FilesList;
