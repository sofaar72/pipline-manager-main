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
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (versionResults) {
      if (versionResults?.versions?.length > 0) {
        console.log(versionResults.versions[0].id);
        setVersionId({
          id: versionResults?.versions[0]?.id,
          name: versionResults?.versions[0]?.version,
        });
      }
      // console.log(versionResults?.versions[0]?.id);
    }
  }, [versionResults]);

  useEffect(() => {
    console.log(versionPreviewData);
  }, [versionPreviewData]);

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
          {!versionLoading && (
            <TheDropDown
              cClass="!bg-[var(--overview-color-three)]"
              init={
                versionResults && versionResults?.versions
                  ? "Ver" + " " + versionResults?.versions[0]?.version
                  : "Ver 0"
              }
              items={
                versionResults?.versions?.map((version) => {
                  return {
                    id: version.id,
                    name: "Ver" + " " + version.version,
                  };
                }) || []
              }
              width={"w-[100px]"}
              funcAfter={setVersionId}
            />
          )}

          <TheIcon
            cClass=" !border-none"
            onClick={() => {
              setOpen(true);
            }}
          >
            <FaPlus />
          </TheIcon>
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
        <CreateVersionForm />
      </GlobalPureModal>
    </div>
  );
};

export default PreviewVideoWrapper;
