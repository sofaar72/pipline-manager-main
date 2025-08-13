import React, { useEffect, useState } from "react";
import TabItem from "./TabItem";
import { Versions } from "../../fakeContents/Versions";
import VersionItem from "./VersionItem";
import { Files } from "../../fakeContents/Files";
import FilesItemExport from "./FilesItemExport";
import FilesItemDependency from "./FilesItemDependency";
import CbuttonOne from "./Buttons/CbuttonOne";

import CreateOnlyFile from "../taskmanager/CreateOnlyFile";
import GlobalModal from "./GlobalModal";

const TaskTabs = ({ version }) => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [selectedVersion, setActiveVersion] = useState([]);

  if (version) {
    return (
      <div className="w-full h-full  overflow-hidden flex flex-col gap-4  mx-auto">
        {/* Tab Headers */}
        <div className="flex border-b border-white/20">
          <button
            className={`w-fit tab-btn px-4 py-2 text-sm font-medium transition capitalize relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-transparent  ${
              activeTab === "tab1"
                ? "after:!bg-[var(--primary-color-light)] "
                : "text-white/90 hover:text-white cursor-pointer "
            }`}
            onClick={() => setActiveTab("tab1")}
          >
            Export
          </button>

          <button
            className={`w-fit tab-btn px-4 py-2 text-sm font-medium transition capitalize relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-transparent  ${
              activeTab === "tab2"
                ? "after:!bg-[var(--primary-color-light)] "
                : "text-white/90 hover:text-white cursor-pointer "
            }`}
            onClick={() => setActiveTab("tab2")}
          >
            Dependencies
          </button>
        </div>

        {/* Tab Content */}
        <div className=" flex-1 h-full w-full ">
          {activeTab === "tab1" && (
            <div className="w-full h-[210px] flex flex-col gap-4">
              {/* files  */}
              <div className="w-full h-full flex-1 flex flex-col gap-[10px] overflow-y-auto px-[5px]">
                {version?.files?.map((file, i) => {
                  return <FilesItemExport file={file} key={i} />;
                })}
              </div>

              <GlobalModal
                text=""
                clickButton={(openModal) => {
                  return (
                    <CbuttonOne
                      height="w-full h-[30px]"
                      color="var(--primary-color-lowest)"
                      onClick={() => {
                        openModal(true);
                      }}
                    >
                      <span className="text-sm">Add File</span>
                      <img
                        className="w-[15px] h-[15px]"
                        src="/icons/Add.svg"
                        alt=""
                      />
                    </CbuttonOne>
                  );
                }}
              >
                <div
                  className="w-full h-full max-w-[400px] text-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  <CreateOnlyFile version={version} />
                </div>
              </GlobalModal>
            </div>
          )}

          {activeTab === "tab2" && (
            <div className="w-full h-[210px] flex flex-col gap-4">
              {/* files  */}
              <div className="w-full h-full flex-1 flex flex-col gap-[10px] overflow-y-auto px-[5px]">
                {version?.dependencies?.map((file, i) => {
                  return <FilesItemDependency file={file} key={i} />;
                })}
              </div>
              <CbuttonOne height="h-[30px]" color="var(--primary-color-lowest)">
                <span className="text-sm">Add File</span>
                <img
                  className="w-[15px] h-[15px]"
                  src="/icons/Add.svg"
                  alt=""
                />
              </CbuttonOne>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default TaskTabs;
