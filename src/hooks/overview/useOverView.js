import { useDispatch, useSelector } from "react-redux";
import { useProject } from "../useProject";
import { useEntities } from "../useEntities";
import { selectProject } from "../../store/Slices/ProjectsSlice";
import { useEffect, useState } from "react";
import { fetchFilms } from "../../store/Slices/FilmSlice";
import { fetchAssets } from "../../store/Slices/AssetSlice";
import { useAssets } from "../useAssets";
import {
  fetchVariation,
  fetchVariationsForAll,
} from "../../store/Slices/VariationsSlice";

export const useOverview = () => {
  const dispatch = useDispatch();
  const { getAllProjects } = useProject();
  const { fetchEpisodes, entityResults, entityId, setEntityId } = useEntities();
  const { assetResults, assetLoading, assetError } = useAssets();
  const [addressbar, setAddressbar] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [taskType, setTaskType] = useState("");
  const [taskId, setTaskId] = useState(null);
  const [typeId, setTypeId] = useState(null);
  const [entityValidTaskTypes, setEntityValidTaskTypes] = useState([]);

  const [versionId, setVersionId] = useState(null);

  // table controls
  const [tableItemsSize, setTableItemsSize] = useState(false);
  const [showMeta, setShowMeta] = useState(true);
  const [showAssignees, setShowAssignees] = useState(true);
  const [assigneeUsers, setAssigneeUsers] = useState([]);

  const [createEntityModal, setCreateEntityModal] = useState(false);
  const [createAssetModal, setCreateAssetModal] = useState(false);
  const [createTaskModal, setCreateTaskModal] = useState(false);
  const [createGlobalTaskModal, setCreateGlobalTaskModal] = useState(false);
  const [addUserTaskModal, setAddUserTaskModal] = useState(false);

  const [selectedEntType, setSelectedEntType] = useState("All");

  const { projects, selectedProject } = useSelector((state) => state.project);
  const {
    films,
    episodes,
    loading: filmLoading,
  } = useSelector((state) => state.film);

  const { variations, allVariations } = useSelector((state) => state.variation);

  const {
    results: variationsResults,
    loading: variationsLoading,
    error: variationsError,
  } = variations || {};
  const { allVariationsResults, allVariationsLoading, allVariationsError } =
    allVariations || {};

  const handleCreateEntityModal = () => {
    setCreateEntityModal(!createEntityModal);
  };
  const handleCreateAssetModal = () => {
    setCreateAssetModal(!createAssetModal);
  };
  const handleCreateTaskModal = () => {
    setCreateTaskModal(!createTaskModal);
  };
  const handleCreateGlobalTaskModal = () => {
    setCreateGlobalTaskModal(!createGlobalTaskModal);
  };
  const handleAddUserTaskModal = (assignees, taskId) => {
    setTaskId(taskId);
    setAssigneeUsers(assignees);
    setAddUserTaskModal(!createTaskModal);
  };

  const getTheProjects = () => {
    getAllProjects();
  };
  const selectTheProject = (id) => {
    dispatch(selectProject(id));
  };

  const getEpisodes = () => {
    fetchEpisodes();
  };

  const getTheEntities = (
    project,
    type = "All",
    search = "",
    page = 1,
    pageSize = 20
  ) => {
    const projectId = project ? project : localStorage.getItem("project_id");
    if (projectId) {
      // console.log(project);

      if (type === "Assets") {
        dispatch(
          fetchVariationsForAll()
          // fetchAssets({
          //   project: project.id,
          //   // type:type,
          //   name: search ? search : undefined,
          //   page: page,
          //   page_size: pageSize,
          // })
        );
      } else {
        dispatch(
          fetchFilms({
            project: project.id,
            type:
              type === "Episodes"
                ? "EP"
                : type === "Sequence"
                ? "SQ"
                : type === "Shot"
                ? "SH"
                : undefined,
            name: search ? search : undefined,
            page: page,
            page_size: pageSize,
          })
        );
      }
    }
  };

  const resizeTableItems = () => {
    setTableItemsSize(!tableItemsSize);
  };

  return {
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
    handleAddUserTaskModal,
    addUserTaskModal,
    setAddUserTaskModal,
    resizeTableItems,
    setTableItemsSize,
    tableItemsSize,
    setShowMeta,
    showMeta,
    showAssignees,
    setShowAssignees,
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
    assigneeUsers,
    entityResults,
    assetResults,
    assetLoading,
    assetError,
    variationsResults,
    variationsLoading,
    variationsError,
    allVariationsResults,
    allVariationsLoading,
    allVariationsError,
    setEntityValidTaskTypes,
    entityValidTaskTypes,
  };
};
