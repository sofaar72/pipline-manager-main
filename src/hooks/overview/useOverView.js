import { useDispatch, useSelector } from "react-redux";
import { useProject } from "../useProject";
import { useEntities } from "../useEntities";
import { selectProject } from "../../store/Slices/ProjectsSlice";
import { useEffect, useState } from "react";
import { fetchFilms } from "../../store/Slices/FilmSlice";

export const useOverview = () => {
  const dispatch = useDispatch();
  const { getAllProjects } = useProject();
  const { fetchEpisodes, entityResults, entityId, setEntityId } = useEntities();
  const [addressbar, setAddressbar] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [taskType, setTaskType] = useState("");
  const [taskId, setTaskId] = useState(null);
  const [typeId, setTypeId] = useState(null);

  const [versionId, setVersionId] = useState(null);

  // table controls
  const [tableItemsSize, setTableItemsSize] = useState(false);
  const [showMeta, setShowMeta] = useState(true);
  const [showAssignees, setShowAssignees] = useState(true);
  const [assigneeUsers, setAssigneeUsers] = useState([]);

  const [createEntityModal, setCreateEntityModal] = useState(false);
  const [createTaskModal, setCreateTaskModal] = useState(false);
  const [addUserTaskModal, setAddUserTaskModal] = useState(false);

  const [selectedEntType, setSelectedEntType] = useState("All");

  const { projects, selectedProject } = useSelector((state) => state.project);
  const {
    films,
    episodes,
    loading: filmLoading,
  } = useSelector((state) => state.film);

  const handleCreateEntityModal = () => {
    setCreateEntityModal(!createEntityModal);
  };
  const handleCreateTaskModal = () => {
    setCreateTaskModal(!createTaskModal);
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
    createTaskModal,
    setCreateTaskModal,
    handleCreateEntityModal,
    handleCreateTaskModal,
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
  };
};
