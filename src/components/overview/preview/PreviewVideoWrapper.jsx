import React, { useEffect, useState } from "react";
import TheButton from "../TheButton";
import { MdOutlineArrowDropDown } from "react-icons/md";
import TheDropDown from "../TheDropDown";
import TheIcon from "../TheIcon";
import { FaPlus } from "react-icons/fa";
import VideoPreview from "./Annotations/TheVideo";
import TheAnnotationWrapper from "./Annotations/TheAnnotationWrapper";
import GlobalPureModal from "../../golbals/GlobalPureModal";
import CreateVersionForm from "../CreateVersionForm";
import Loading from "../../golbals/Loading";

const PreviewVideoWrapper = ({
  switcher,
  setSwitcher,
  previewWidth,
  isResizing,
  versionResults,
  versionLoading,
  setVersionId,
  versionId,
  versionPreviewData,
  versionPreviewLoading,
  fetchAllVersions,
  getAllComments,
  taskId,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`w-full ${
        previewWidth >= 550 ? "h-[400px]" : "h-[300px]"
      }  radius bg-[var(--overview-color-two)]/50 text-white h-lg flex flex-col gap-[10px] p-2  shrink-0`}
    >
      {/* header part  */}
      <div className=" w-full h-[40px] flex items-center gap-2 justify-between">
        {/* variations  */}
        <div className="flex items-center gap-1">
          <TheIcon
            cClass=" !border-none"
            onClick={() => {
              setOpen(true);
            }}
          >
            <FaPlus />
          </TheIcon>
          {!versionLoading &&
            versionPreviewData &&
            Object.keys(versionPreviewData).length > 0 && (
              <>
                <TheDropDown
                  cClass="!bg-[var(--overview-color-three)]"
                  init={
                    versionId && versionId.name
                      ? "V " + versionId.name
                      : versionResults && versionResults?.versions?.[0]
                      ? "V " + versionResults.versions[0].version
                      : "V"
                  }
                  // items={
                  //   versionResults?.versions?.map((version) => {
                  //     return {
                  //       id: version.id,
                  //       name: version.version, // Just the version number, "Ver" will be added in display
                  //     };
                  //   }) || []
                  // }
                  items={
                    versionResults?.versions
                      ?.filter((v) => v.version !== 0)
                      .map((v) => ({
                        id: v.id,
                        name: v.version,
                      })) || []
                  }
                  width={"w-[100px]"}
                  funcAfter={(selectedVersion) => {
                    setVersionId({
                      id: selectedVersion.id,
                      name: selectedVersion.name,
                    });
                  }}
                />
              </>
            )}
        </div>
        <div className="flex items-center gap-2">
          <TheButton
            cClass={`flex items-center justify-between gap-2 h-regular ${
              switcher === "file" && "!bg-[var(--overview-color-three)]"
            }`}
            onClick={() => {
              setSwitcher("file");
            }}
          >
            <span>Files</span>
          </TheButton>
          <TheButton
            cClass={`flex items-center justify-between gap-2 h-regular  ${
              switcher === "comment" && "!bg-[var(--overview-color-three)]"
            }`}
            onClick={() => {
              setSwitcher("comment");
            }}
          >
            <span>Comments</span>
          </TheButton>
        </div>
      </div>

      {/* the video and annotations stage  */}
      {versionPreviewLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <TheAnnotationWrapper
          previewWidth={previewWidth}
          isResizing={isResizing}
          versionPreviewData={versionPreviewData}
        />
      )}

      {/* add version modal  */}
      <GlobalPureModal open={open} setOpen={setOpen}>
        <CreateVersionForm
          open={open}
          setOpen={setOpen}
          taskId={taskId}
          fetchAllVersions={fetchAllVersions}
          getAllComments={getAllComments}
          versionId={versionId}
        />
      </GlobalPureModal>
    </div>
  );
};

export default PreviewVideoWrapper;
