import React, { useEffect } from "react";

import { useVersions } from "../../hooks/useVersions";
import Loading from "../golbals/Loading";
import VersionItem from "../golbals/VersionItem";
import { useEpisodeManagerContext } from "../../assets/context/EpisodeManagerContext";
import GlobalModal from "../golbals/GlobalModal";
import CreateVersionForm from "./CreateVersionForm";

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
                  className="w-full h-[600px] flex items-center justify-center   text-white max-w-[500px] "
                  onClick={(e) => e.stopPropagation()}
                >
                  <CreateVersionForm setOpen={setOpen} />
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
          versionResults.versions.map((version) => (
            <VersionItem
              key={version.id}
              version={version}
              activeVersion={activeVersion === version.id}
              selectVersion={selectVersion}
            />
          ))
        ) : (
          <div className="w-full text-white text-sm">Something went wrong</div>
        )}
      </div>
    </div>
  );
};

export default VersionsList;
