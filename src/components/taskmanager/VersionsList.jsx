import React, { useEffect } from "react";

import { useVersions } from "../../hooks/useVersions";
import Loading from "../golbals/Loading";
import VersionItem from "../golbals/VersionItem";
import { useEpisodeManagerContext } from "../../assets/context/EpisodeManagerContext";
import GlobalModal from "../golbals/GlobalModal";
import CreateVersionForm from "./CreateVersionForm";
import { useLocation } from "react-router-dom";

const VersionsList = ({ activeVersion, selectVersion }) => {
  const { versionResults, versionLoading } = useVersions();

  return (
    <div className="w-[250px] h-full bg-[var(--bg-color)] radius px-[10px] py-[10px] flex flex-col gap-[20px]">
      {/* Top Add button */}
      <div className="w-full flex justify-end h-[15px] mb-4">
        {/* <button className="transition flex gap-2 text-sm items-center cursor-pointer hover:bg-[var(--primary-color-light)]/20 px-2 py-[10px] radius">
          <span>Add</span>
          <img className="w-[15px] h-[15px]" src="/icons/Add.svg" alt="Add" />
        </button> */}
        <GlobalModal
          text=""
          clickButton={(setOpen) => {
            return (
              <button
                className="transition flex gap-2  text-sm items-center cursor-pointer hover:bg-[var(--primary-color-light)]/20 px-2 py-[10px] radius"
                onClick={() => setOpen(true)}
              >
                <span>Add</span>
                <img
                  className="w-[15px] h-[15px]"
                  src="/icons/Add.svg"
                  alt="Add"
                />
              </button>
            );
          }}
          modalContent={(setOpen) => {
            return (
              <>
                <div
                  className="w-full h-[700px] flex items-center justify-center   text-white max-w-[500px] "
                  onClick={(e) => e.stopPropagation()}
                >
                  <CreateVersionForm
                    taskId={versionResults?.id || ""}
                    setOpen={setOpen}
                  />
                </div>
              </>
            );
          }}
        ></GlobalModal>
      </div>

      {/* Versions list */}
      <div className="w-full h-full flex flex-col gap-[20px] overflow-y-auto pr-[6px]">
        {versionLoading ? (
          <div className="w-full flex items-center justify-center">
            <Loading />
          </div>
        ) : Array.isArray(versionResults?.versions) &&
          versionResults.versions.length > 0 ? (
          // show version 0

          <>
            {versionResults.versions.filter(
              (version) => version.version == 0
            )[0] && (
              <VersionItem
                version={
                  versionResults.versions.filter(
                    (version) => version.version == 0
                  )[0]
                }
                activeVersion={
                  activeVersion ===
                  versionResults.versions.filter(
                    (version) => version.version == 0
                  )[0]?.id
                }
                selectVersion={selectVersion}
              />
            )}

            {versionResults.versions.map((version) => (
              <>
                {version.version !== 0 && (
                  <VersionItem
                    key={version.id}
                    version={version}
                    activeVersion={activeVersion === version.id}
                    selectVersion={selectVersion}
                  />
                )}
              </>
            ))}
          </>
        ) : (
          <div className="w-full text-white text-sm flex items-center justify-center">
            There is no Version created yet!
          </div>
        )}
      </div>
    </div>
  );
};

export default VersionsList;
