import React, { useEffect, useState, useRef } from "react";
import LayoutOne from "../layout/LayoutOne";
import VideoAnnotationTwo from "../components/previewPage/videoAnnotationTwo/VideoAnnotationTwo";
import OverviewHeader from "../components/overview/OverviewHeader";
import OverveiwTable from "../components/overview/table/OverveiwTable";
import { useElementAspect } from "../hooks/annotationHooks/useElementAspect";
import { useOverview } from "../hooks/overview/useOverView";
import GlobalPureModal from "../components/golbals/GlobalPureModal";
import CreateEntityForm from "../components/overview/CreateEntityForm";
import PreviewMain from "../components/overview/preview/PreviewMain";
import { useTableTaskSettings } from "../hooks/overview/useTableTaskSettings,js";
import { useTasks } from "../hooks/useTasks";
import { useVersions } from "../hooks/useVersions";
import { useComments } from "../hooks/useComments";
import CreateTaskForm from "../components/overview/CreateTaskForm";
import OnlyCreateTaskModal from "../components/overview/OnlyCreateTaskModal";
import Loading from "../components/golbals/Loading";
import { ToastContainer } from "react-toastify";
import AddUserToTaskForm from "../components/overview/AddUserToTaskForm";
import CreateAssetForm from "../components/overview/CreateAssetForm";
import CreateAssetModal from "../components/overview/table/CreateAssetModal";
import { useMediaQuery } from "react-responsive";
import OverviewHeaderMobile from "../components/overview/OverviewHeaderMobile";

const TaskOverviewPage = () => {
  const wrapperRef = useRef(null);
  const isSmallView = useMediaQuery({ maxWidth: 1400 });
  const { width, height, aspectRatio } = useElementAspect(wrapperRef);
  const {
    fetchAllTasks,
    taskResults,
    taskLoading,
    taskError,
    deleteTheTask,
    taskDeleteSuccess,
    deleteTaskLoading,
    deleteTaskError,
  } = useTasks();
  const {
    fetchAllVersions,
    versionResults,
    versionLoading,
    fetchSingleVersionPreview,
    versionPreviewData,
    versionPreviewLoading,
    clearVersionPreview,
  } = useVersions();

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
    filmLoading,
    createEntityModal,
    setCreateEntityModal,
    createAssetModal,
    setCreateAssetModal,
    createTaskModal,
    setCreateTaskModal,
    createGlobalTaskModal,
    setCreateGlobalTaskModal,
    handleCreateEntityModal,
    handleCreateAssetModal,
    handleCreateTaskModal,
    handleCreateGlobalTaskModal,
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
    taskType,
    setTaskType,
    versionId,
    setVersionId,
    taskId,
    setTaskId,
    typeId,
    setTypeId,
    addUserTaskModal,
    setAddUserTaskModal,
    handleAddUserTaskModal,
    assigneeUsers,
    entityResults,
    assetResults,
    assetLoading,
    assetError,
    allVariationsResults,
    allVariationsLoading,
    allVariationsError,
  } = useOverview();

  const [showPreview, setShowPreview] = useState({
    id: null,
    groupId: null,
    taskID: null,
    show: true,
  });
  const [selectedTasksOutside, setSelectedTasksOutside] = useState([]);
  const [activeTask, setActiveTask] = useState({ collId: "", rowId: "" });
  const [previewWidth, setPreviewWidth] = useState(600); // default width
  const isResizing = useRef(false);
  const [fullScreenOverView, setFullScreenOverview] = useState(false);

  const stopResizing = () => {
    isResizing.current = false;
  };

  // // Start resizing
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

  // // Initial data loading - get projects first
  useEffect(() => {
    getTheProjects();
  }, []);

  const fetchEntities = () => {
    getTheEntities(selectedProject, selectedEntType);
  };

  // // Get episodes when selectedProject changes
  useEffect(() => {
    if (selectedProject) {
      getEpisodes();
      // Also get entities when project is selected
      fetchEntities();
    }
  }, [selectedProject]);

  // // Get entities when selectedEntType changes (but only if we have a selected project)
  useEffect(() => {
    if (selectedProject && selectedEntType) {
      fetchEntities();
    }
    setSearchItem("");
  }, [selectedEntType]);

  // useEffect(() => {
  //   if (!selectedProject || !selectedEntType) return;

  //   getTheEntities(selectedProject, selectedEntType);
  // }, [selectedEntType]);

  // // Additional effect to ensure entities are loaded if we have both project and type
  useEffect(() => {
    if (
      selectedProject &&
      selectedEntType &&
      (!films || !films.results || assetResults)
    ) {
      fetchEntities();
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
    // console.log(id);
    selectTheProject(id);
  };

  // 👇 Auto open preview if only one task is selected

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

  // useEffect(() => {
  //   console.log(assetResults);
  // }, [assetResults]);

  useEffect(() => {
    if (selectedTasksOutside.length > 0) {
      // hidePrev();
    }
  }, [selectedTasksOutside]);

  useEffect(() => {
    if (!showPreview.show) {
      setShowMeta(false);
      // setVersionId({}); // 🔥 reset versionId when preview closes
    } else {
      setShowMeta(true);
    }
  }, [showPreview?.show]);

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

  // FETCH TASKS
  useEffect(() => {
    if (addressbar) {
      fetchAllTasks(entityId, taskType);
    }
  }, [addressbar, entityResults]);

  useEffect(() => {
    if (taskResults.length > 0) {
      setTaskId(taskResults[0]?.id);
      fetchAllVersions(taskResults[0]?.id);
    }
    console.log(taskResults);
  }, [taskResults]);

  useEffect(() => {
    const versions = versionResults?.versions;

    if (Array.isArray(versions) && versions.length > 0) {
      const first = versions[0];
      setVersionId((prev) => {
        const newVal = {
          id: first.id,
          // prefer `version` field, fallback to `name` or empty string
          name: first.version ?? first.name ?? "",
        };
        // avoid re-setting identical state
        if (prev?.id === newVal.id && prev?.name === newVal.name) return prev;
        return newVal;
      });
    } else {
      // consider using null if you want "no selection" more explicitly
      setVersionId({});
    }
  }, [versionResults]);

  // ADD GLOBAL TASK
  // const addGlobTask = () => {
  //   setCreateGlobalTaskModal(true);
  // };

  useEffect(() => {
    console.log(fullScreenOverView);
  }, [entityId]);

  // hide the show modal
  useEffect(() => {
    hidePrev();
  }, [allVariationsResults, films]);

  return (
    <LayoutOne>
      <ToastContainer style={{ zIndex: 999999999999999 }} />
      <div className="w-full h-full flex gap-4 p-4 relative radius overflow-hidden">
        {/* OVERVIEW PART */}
        <div
          className={`w-full flex-1 h-full  text-white transition flex flex-col gap-[10px]`}
        >
          {isSmallView || !showPreview.show ? (
            <OverviewHeaderMobile
              projects={projects?.results || []}
              selectProject={selectProject}
              selectedProject={selectedProject}
              entities={episodes?.results || []}
              openCreateEntity={handleCreateEntityModal}
              openCreateAsset={handleCreateAssetModal}
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
          ) : (
            <OverviewHeader
              projects={projects?.results || []}
              selectProject={selectProject}
              selectedProject={selectedProject}
              entities={episodes?.results || []}
              openCreateEntity={handleCreateEntityModal}
              openCreateAsset={handleCreateAssetModal}
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
          )}

          {/* Show loading state when no films data */}
          {!films || !assetResults || !allVariationsResults ? (
            <div className="flex-1 flex items-center justify-center text-white">
              Loading...
            </div>
          ) : !films.results &&
            films.results.length === 0 &&
            !assetResults &&
            assetResults.length === 0 &&
            !allVariationsResults &&
            allVariationsResults.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-white">
              No entities found. Please select a project or check your data.
            </div>
          ) : (
            <>
              {filmLoading || assetLoading || allVariationsLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <Loading size={"w-20 h-20"} />
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
                  selectedEntType={selectedEntType}
                  tableItems={
                    selectedEntType === "Assets"
                      ? allVariationsResults
                      : films.results
                  }
                  loading={
                    selectedEntType === "Assets"
                      ? allVariationsLoading
                      : filmLoading
                  }
                  collapseWidth={"w-full"}
                  setAddressbar={setAddressbar}
                  showPreview={showPreview.show}
                  previewWidth={previewWidth}
                  setEntityId={setEntityId}
                  setTaskType={setTaskType}
                  setTaskId={setTaskId}
                  setTypeId={setTypeId}
                  typeId={typeId}
                  handleAddUserTaskModal={handleAddUserTaskModal}
                  setSelectedTasksOutside={setSelectedTasksOutside}
                  deleteTheTask={deleteTheTask}
                  fetchEntities={fetchEntities}
                  handleCreateGlobalTaskModal={handleCreateGlobalTaskModal}
                  isSmallView={isSmallView}
                />
              )}
            </>
          )}
        </div>

        {/* PREVIEW PART */}
        {selectedTasksOutside.length > 0 ? (
          <></>
        ) : (
          // <div
          //   className={` h-full top-0 right-0 z-[999] absolute bg-black/30 `}
          //   // style={{ width: previewWidth }}
          // >
          //   <div
          //     className={`w-full h-full top-0 right-0 z-[999] absolute flex transition-transform duration-150 bg-[var(--overview-color-one)] text-white `}
          //     style={{ width: previewWidth }}
          //     ref={wrapperRef}
          //     onMouseDown={(e) => e.stopPropagation()}
          //   >
          //     show the data
          //   </div>
          // </div>
          <div
            className={`w-full h-full top-0 right-0 z-[999] absolute bg-black/30  ${
              showPreview.show ? "translate-x-[100%]" : "translate-x-0"
            }`}
            style={{
              width:
                !showPreview.show && fullScreenOverView
                  ? "100%"
                  : fullScreenOverView
                  ? "100%"
                  : previewWidth,
            }}
            onMouseDown={(e) => {
              if (!isResizing.current) hidePrev();
            }}
          >
            <div
              className={`w-full h-full top-0 right-0 z-[999] absolute flex transition-transform duration-150 bg-[var(--overview-color-one)] `}
              style={{ width: !showPreview.show && previewWidth }}
              ref={wrapperRef}
              onMouseDown={(e) => e.stopPropagation()}
            >
              {/* Drag handle */}
              {!showPreview.show && (
                <div
                  className="absolute -left-2 top-0 w-2 h-full cursor-col-resize bg-gray-700 hover:bg-gray-600 z-[100] transition"
                  onMouseDown={startResizing}
                />
              )}

              <PreviewMain
                addressbar={addressbar}
                previewWidth={width}
                stopResizing={stopResizing}
                isResizing={isResizing}
                hidePrev={hidePrev}
                taskResults={taskResults}
                loading={taskLoading}
                fetchAllVersions={fetchAllVersions}
                versionLoading={versionLoading}
                setVersionId={setVersionId}
                versionId={versionId}
                versionResults={versionResults}
                fetchVersionPreview={fetchSingleVersionPreview}
                versionPreviewData={versionPreviewData}
                versionPreviewLoading={versionPreviewLoading}
                handleCreateTaskModal={handleCreateTaskModal}
                clearVersionPreview={clearVersionPreview}
                taskId={taskId}
                typeId={typeId}
                setFullScreenOverview={setFullScreenOverview}
              />
            </div>
          </div>
        )}
      </div>

      {/* modals */}
      {/* CREATE ENTITY */}
      <GlobalPureModal open={createEntityModal} setOpen={setCreateEntityModal}>
        <div
          className="w-full max-w-[700px] h-fit"
          onClick={(e) => e.stopPropagation()}
        >
          <CreateEntityForm
            title={"Create Entity"}
            setCreateModal={setCreateEntityModal}
            selectedProject={selectedProject}
          />
        </div>
      </GlobalPureModal>
      {/* CREATE ASSET  */}
      <GlobalPureModal open={createAssetModal} setOpen={setCreateAssetModal}>
        <div
          className="w-full max-w-[700px] h-fit"
          onClick={(e) => e.stopPropagation()}
        >
          <CreateAssetModal
            setCreateAssetModal={setCreateAssetModal}
            selectedProject={selectedProject}
          />
        </div>
      </GlobalPureModal>
      {/* CREATE TASK MODAL  */}
      <GlobalPureModal open={createTaskModal} setOpen={setCreateTaskModal}>
        {/* <CreateTaskForm id={entityId} setCreateModal={setCreateTaskModal} /> */}
        <OnlyCreateTaskModal
          entityId={entityId}
          typeId={typeId}
          status={540}
          setCreateModal={setCreateTaskModal}
          createTaskModal={createTaskModal}
          fetchData={fetchEntities}
        />
      </GlobalPureModal>
      {/* CREATE GLOBAL TASK MODAL  */}
      <GlobalPureModal
        open={createGlobalTaskModal}
        setOpen={setCreateGlobalTaskModal}
      >
        <CreateTaskForm
          // id={entityId}
          selectedProject={selectedProject}
          setCreateModal={setCreateGlobalTaskModal}
          fetchData={fetchEntities}
          selectedEntType={selectedEntType}
        />
      </GlobalPureModal>

      {/* add user form  */}
      <GlobalPureModal open={addUserTaskModal} setOpen={setAddUserTaskModal}>
        {/* <CreateTaskForm id={entityId} setCreateModal={setCreateTaskModal} /> */}
        <AddUserToTaskForm
          id={entityId}
          taskId={taskId}
          setCreateModal={setAddUserTaskModal}
          users={assigneeUsers}
          fetchData={fetchEntities}
        />
      </GlobalPureModal>
    </LayoutOne>
  );
};

export default TaskOverviewPage;
