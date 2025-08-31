import React, { useEffect, useState, useRef } from "react";
import LayoutOne from "../layout/LayoutOne";
import VideoAnnotationTwo from "../components/previewPage/videoAnnotationTwo/VideoAnnotationTwo";
import OverviewHeader from "../components/overview/OverviewHeader";
import OverveiwTable from "../components/overview/table/OverveiwTable";
import { useElementAspect } from "../hooks/annotationHooks/useElementAspect";
import { useOverview } from "../hooks/overview/useOverView";
import GlobalPureModal from "../components/golbals/GlobalPureModal";
import CreateEntityForm from "../components/taskmanager/CreateEntityForm";
import PreviewMain from "../components/overview/preview/PreviewMain";
import { useTableTaskSettings } from "../hooks/overview/useTableTaskSettings,js";

const TaskOverviewPage = () => {
  const wrapperRef = useRef(null);
  const { width, height, aspectRatio } = useElementAspect(wrapperRef);
  // OVERVIEW HOOK
  const {
    getTheProjects,
    projects,
    selectTheProject,
    selectedProject,
    getEpisodes,
    episodes,
    getTheEntities,
    films,
    createEntityModal,
    setCreateEntityModal,
    handleCreateEntityModal,
    setTableItemsSize,
    tableItemsSize,
    resizeTableItems,
    setShowMeta,
    showMeta,
    setShowAssignees,
    showAssignees,
    setSelectedEntType,
    selectedEntType,
    addressbar,
    setAddressbar,
  } = useOverview();

  const [showPreview, setShowPreview] = useState({
    id: null,
    groupId: null,
    show: true,
  });

  const [activeTask, setActiveTask] = useState({ collId: "", rowId: "" });
  const [previewWidth, setPreviewWidth] = useState(550); // default width
  const isResizing = useRef(false);
  const stopResizing = () => {
    isResizing.current = false;
  };

  // Start resizing
  const startResizing = (e) => {
    e.stopPropagation();
    isResizing.current = true;

    const resizeMouseMove = (eMove) => {
      const newWidth = window.innerWidth - eMove.clientX - 20; // 20px padding
      if (newWidth > 400 && newWidth < 800) {
        setPreviewWidth(newWidth);
      }
    };

    const resizeMouseUp = () => {
      isResizing.current = false;
      window.removeEventListener("mousemove", resizeMouseMove);
      window.removeEventListener("mouseup", resizeMouseUp);
    };

    window.addEventListener("mousemove", resizeMouseMove);
    window.addEventListener("mouseup", resizeMouseUp);
  };
  // get projects
  useEffect(() => {
    getTheProjects();
    getEpisodes();
  }, []);

  // get episodes
  useEffect(() => {
    getEpisodes();
  }, [selectedProject]);
  // get entity
  useEffect(() => {
    getTheEntities(selectedProject, selectedEntType);
  }, [selectedEntType]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing.current) return;
      const newWidth = window.innerWidth - e.clientX - 20; // 20 for padding
      if (newWidth > 400 && newWidth < 800) {
        setPreviewWidth(newWidth);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopResizing);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, []);

  // useEffect(() => {
  //   console.log(width);
  //   console.log(height);
  //   console.log(aspectRatio);
  // }, [width]);

  // useEffect(() => {
  //   console.log(tableItemsSize);
  // }, [tableItemsSize]);

  const selectProject = (id) => {
    selectTheProject(id);
  };

  const handleShowPrev = (e, id, groupId) => {
    e.stopPropagation();
    setShowPreview({
      ...showPreview,
      id: showPreview.show ? id : null,
      groupId: showPreview.show ? groupId : null,
      show: !showPreview.show,
    });
  };

  const hidePrev = () => {
    setShowPreview({ ...showPreview, id: null, groupId: null, show: true });
    setActiveTask({ collId: "", rowId: "" });
  };

  return (
    <LayoutOne>
      <div className="w-full h-full flex gap-4   p-4 relative radius overflow-hidden">
        {/* OVERVIEW PART */}
        <div
          className={`flex-1
           h-full p-[10px] text-white transition flex flex-col gap-[10px]`}
        >
          <OverviewHeader
            projects={projects?.results || []}
            selectProject={selectProject}
            selectedProject={selectedProject}
            entities={episodes?.results || []}
            openCreateEntity={handleCreateEntityModal}
            resizeTableItems={resizeTableItems}
            tableItemsSize={tableItemsSize}
            setShowMeta={setShowMeta}
            showMeta={showMeta}
            setShowAssignees={setShowAssignees}
            showAssignees={showAssignees}
            setSelectedEntType={setSelectedEntType}
            selectedEntType={selectedEntType}
          />
          <OverveiwTable
            handleShowPrev={handleShowPrev}
            activeTask={activeTask}
            setActiveTask={setActiveTask}
            selectedId={showPreview.id}
            groupId={showPreview.groupId}
            tableItemsSize={tableItemsSize}
            showMeta={showMeta}
            showAssignees={showAssignees}
            tableItems={films?.results || []}
            // collapseWidth={
            //   !showPreview.show ? "w-[800px] overflow-scroll " : "w-full"
            // }
            collapseWidth={"w-full"}
            setAddressbar={setAddressbar}
          />
        </div>

        {/* PREVIEW PART */}
        <div
          className={`w-full h-full top-0 right-0 z-[999] absolute bg-black/10 ${
            showPreview.show ? "translate-x-[100%]" : "translate-x-0"
          }`}
          onMouseDown={(e) => {
            if (!isResizing.current) hidePrev();
          }}
        >
          <div
            className={`h-full top-0 right-0 z-[999] absolute flex transition-transform duration-150 bg-[var(--overview-color-one)] `}
            style={{ width: previewWidth }}
            ref={wrapperRef}
            onMouseDown={(e) => e.stopPropagation()} // 🔹 stop click inside from propagating
          >
            {/* Drag handle */}
            <div
              className="absolute -left-2 top-0 w-2 h-full cursor-col-resize bg-gray-700 hover:bg-gray-600 z-[100] transition"
              onMouseDown={startResizing}
            />

            <PreviewMain
              addressbar={addressbar}
              previewWidth={width}
              stopResizing={stopResizing}
            />
          </div>
        </div>
      </div>

      {/* modals  */}
      {/* CREATE ENTITY  */}
      <GlobalPureModal open={createEntityModal} setOpen={setCreateEntityModal}>
        <div
          className="w-full max-w-[500px] h-[600px]"
          onClick={(e) => e.stopPropagation()}
        >
          <CreateEntityForm
            title={"Create Entity"}
            setCreateModal={setCreateEntityModal}
          />
        </div>
      </GlobalPureModal>
    </LayoutOne>
  );
};

export default TaskOverviewPage;
