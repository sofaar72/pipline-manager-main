import React, { useEffect, useState } from "react";
import TaskTabs from "../golbals/TaskTabs";
import { useVersions } from "../../hooks/useVersions";
import Loading from "../golbals/Loading";
import CdropDown from "../golbals/CdropDown";
import PreviewSlider from "./PreviewSlider";
import GlobalModal from "../golbals/GlobalModal";

const VersionPreview = ({ activeVersion }) => {
  const { versionResults, versionLoading } = useVersions();

  const [selectedVersion, setSelectedVersion] = useState({});
  const [selectedPrevImage, setSelectedPrevImage] = useState("");

  // useEffect(() => {
  //   console.log(versionResults);
  // }, [activeVersion]);

  const fillterVersion = () => {
    const filteredResult = versionResults?.versions?.filter(
      (version) => version.id === activeVersion
    );
    setSelectedVersion(filteredResult);
  };

  useEffect(() => {
    fillterVersion();
  }, [activeVersion]);

  useEffect(() => {
    console.log(selectedVersion);
    if (selectedVersion && selectedVersion[0]) {
      setSelectedPrevImage(selectedVersion[0]?.previews[0]);
    }
  }, [selectedVersion]);

  if (versionLoading) {
    return (
      <div className="w-full flex-1  h-full bg-[var(--bg-color)] radius px-[20px] py-[20px] flex flex-col gap-[20px] ">
        <Loading />
      </div>
    );
  }

  const selectPrevImage = (prevImg) => {
    console.log(prevImg);
    setSelectedPrevImage(prevImg);
  };

  return (
    <div className="w-full flex-1 h-full bg-[var(--bg-color)] radius px-[20px] py-[20px] flex flex-col gap-[20px] ">
      {/* top part  */}
      <div className="w-full h-[520px] radius overflow-hidden relative ">
        {selectedVersion && selectedVersion[0]?.previews && (
          <>
            <div className="absolute top-[10px] right-[10px] z-20  flex flex-row gap-4 items-center bg-black/10 radius p-4 backdrop-blur-sm cursor-pointer">
              <div className="flex items-center justify-center bg-[var(--primary-color-lower)] text-white p-1 rounded-full hover:bg-[var(--primary-color-light)] transition">
                <img className="w-[15px]" src="/icons/Eye.svg" alt="" />
              </div>
              <div className="relative">
                <GlobalModal
                  text=""
                  clickButton={(openModal) => {
                    return (
                      <div
                        className="flex items-center justify-center bg-[var(--primary-color-lower)] text-white p-1 rounded-full hover:bg-[var(--primary-color-light)] transition"
                        onClick={() => openModal(true)}
                      >
                        <img
                          className="w-[15px]"
                          src="/icons/Zoom Mode.svg"
                          alt=""
                        />
                      </div>
                    );
                  }}
                >
                  <div className="w-fit" onClick={(e) => e.stopPropagation()}>
                    {/* show the image preview  */}
                    {selectedPrevImage && (
                      <>
                        <span>{selectedPrevImage}</span>
                        <img
                          className="w-full max-w-[1000px] h-full object-cover"
                          src={selectedPrevImage}
                          alt=""
                        />
                      </>
                    )}
                  </div>
                </GlobalModal>
              </div>
              <div className="flex items-center justify-center bg-[var(--primary-color-lower)] text-white p-1 rounded-full hover:bg-[var(--primary-color-light)] transition">
                <img className="w-[15px]" src="/icons/Delete.svg" alt="" />
              </div>

              {/* <CdropDown
                image
                options={Object?.keys(selectedVersion[0]?.previews)}
                init={0}
                select={selectPrevImage}
              /> */}
            </div>
            {/* preview image  */}
            <div className="w-full h-full overflow-hidden">
              <PreviewSlider
                slides={selectedVersion[0]?.previews}
                selectPrevImage={selectPrevImage}
              />
            </div>
            {/* <img
              className="w-full h-full object-cover"
              src={selectedVersion[0]?.previews[selectedPrevImage]}
              alt=""
            /> */}
          </>
        )}
        {/* <VideoAnnotator /> */}
        {/* <VideoAnotatorWithPackage /> */}
      </div>
      {versionResults && selectedVersion?.length && (
        <TaskTabs version={selectedVersion[0]} />
      )}
    </div>
  );
};

export default VersionPreview;
