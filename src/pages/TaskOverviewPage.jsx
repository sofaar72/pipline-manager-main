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
    searchItem,
    setSearchItem,
    entityId,
    setEntityId,
  } = useOverview();

  const [showPreview, setShowPreview] = useState({
    id: null,
    groupId: null,
    taskID: null,
    show: true,
  });

  const [activeTask, setActiveTask] = useState({ collId: "", rowId: "" });
  const [previewWidth, setPreviewWidth] = useState(600); // default width
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
      if (newWidth > 600 && newWidth < 1000) {
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

  // Initial data loading - get projects first
  useEffect(() => {
    getTheProjects();
  }, []);

  // Get episodes when selectedProject changes
  useEffect(() => {
    if (selectedProject) {
      getEpisodes();
      // Also get entities when project is selected
      getTheEntities(selectedProject, selectedEntType);
    }
  }, [selectedProject]);

  // Get entities when selectedEntType changes (but only if we have a selected project)
  useEffect(() => {
    if (selectedProject) {
      getTheEntities(selectedProject, selectedEntType);
    }
    setSearchItem("");
  }, [selectedEntType]);

  // Additional effect to ensure entities are loaded if we have both project and type
  useEffect(() => {
    if (selectedProject && selectedEntType && (!films || !films.results)) {
      getTheEntities(selectedProject, selectedEntType);
    }
  }, [selectedProject, selectedEntType]);

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

  const selectProject = (id) => {
    selectTheProject(id);
  };

  const handleShowPrev = (e, id, groupId, taskId) => {
    e.stopPropagation();

    setShowPreview((prev) => {
      if (taskId === prev.taskID) {
        // same task clicked → toggle
        setActiveTask({ collId: "", rowId: "" });
        return {
          id: null,
          groupId: null,
          taskId: null,
          show: true,
        };
      }

      // new task clicked → open preview
      return { id, groupId, taskID: taskId, show: false };
    });
  };

  const hidePrev = () => {
    setShowPreview({
      ...showPreview,
      id: null,
      groupId: null,
      taskID: null,
      show: true,
    });
    setActiveTask({ collId: "", rowId: "" });
  };

  useEffect(() => {
    if (!showPreview.show) {
      setShowMeta(false);
    } else {
      setShowMeta(true);
    }
  }, [showPreview.show]);

  // Debug logging (remove in production)
  useEffect(() => {
    console.log("Debug - selectedProject:", selectedProject);
    console.log("Debug - selectedEntType:", selectedEntType);
    console.log("Debug - films:", films);
  }, [selectedProject, selectedEntType, films]);

  const searchEntity = (e) => {
    const search = e.target.value;
    setSearchItem(search);
  };

  useEffect(() => {
    getTheEntities(selectedProject, selectedEntType, searchItem);
  }, [searchItem]);

  // CLose preview by clicking outside
  // useEffect(() => {
  //   const handleClickOutside = (e) => {
  //     // if preview is hidden, do nothing
  //     if (showPreview.show) return;

  //     if (
  //       wrapperRef.current &&
  //       !wrapperRef.current.contains(e.target) &&
  //       !isResizing.current
  //     ) {
  //       hidePrev();
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [wrapperRef, isResizing, showPreview.show]);

  return (
    <LayoutOne>
      <div className="w-full h-full flex gap-4 p-4 relative radius overflow-hidden">
        {/* OVERVIEW PART */}
        <div
          className={`flex-1 h-full p-[10px] text-white transition flex flex-col gap-[10px]`}
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
            showPreview={showPreview.show}
            previewWidth={previewWidth}
            searchEntity={searchEntity}
            searchItem={searchItem}
          />

          {/* Show loading state when no films data */}
          {!films ? (
            <div className="flex-1 flex items-center justify-center text-white">
              Loading...
            </div>
          ) : !films.results || films.results.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-white">
              No entities found. Please select a project or check your data.
            </div>
          ) : (
            <OverveiwTable
              handleShowPrev={handleShowPrev}
              activeTask={activeTask}
              setActiveTask={setActiveTask}
              selectedId={showPreview.id}
              groupId={showPreview.groupId}
              tableItemsSize={tableItemsSize}
              showMeta={showMeta}
              showAssignees={showAssignees}
              tableItems={films.results}
              collapseWidth={"w-full"}
              setAddressbar={setAddressbar}
              showPreview={showPreview.show}
              previewWidth={previewWidth}
              setEntityId={setEntityId}
            />
          )}
        </div>

        {/* PREVIEW PART */}
        <div
          className={`w-full h-full top-0 right-0 z-[999] absolute ${
            showPreview.show ? "translate-x-[100%]" : "translate-x-0"
          }`}
          style={{ width: previewWidth }}
          onMouseDown={(e) => {
            if (!isResizing.current) hidePrev();
          }}
        >
          <div
            className={`h-full top-0 right-0 z-[999] absolute flex transition-transform duration-150 bg-[var(--overview-color-one)] `}
            style={{ width: previewWidth }}
            ref={wrapperRef}
            onMouseDown={(e) => e.stopPropagation()}
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
              isResizing={isResizing}
              hidePrev={hidePrev}
              entityId={entityId}
            />
          </div>
        </div>
      </div>

      {/* modals */}
      {/* CREATE ENTITY */}
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
