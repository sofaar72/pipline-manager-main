import { useDispatch, useSelector } from "react-redux";
import { useProject } from "../useProject";
import { useEntities } from "../useEntities";
import { selectProject } from "../../store/Slices/ProjectsSlice";
import { useState } from "react";
import { fetchFilms } from "../../store/Slices/FilmSlice";

export const useOverview = () => {
  const dispatch = useDispatch();
  const { getAllProjects } = useProject();
  const { fetchEpisodes } = useEntities();

  // table controls
  const [tableItemsSize, setTableItemsSize] = useState(false);
  const [showMeta, setShowMeta] = useState(true);
  const [showAssignees, setShowAssignees] = useState(true);

  const [createEntityModal, setCreateEntityModal] = useState(false);
  const [selectedEntType, setSelectedEntType] = useState("All");

  const { projects, selectedProject } = useSelector((state) => state.project);
  const { films, episodes } = useSelector((state) => state.film);

  const handleCreateEntityModal = () => {
    setCreateEntityModal(!createEntityModal);
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
    pageSize = 10
  ) => {
    const projectId = project ? project : localStorage.getItem("project_id");
    if (projectId) {
      dispatch(
        fetchFilms({
          project: project,
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
    createEntityModal,
    setCreateEntityModal,
    handleCreateEntityModal,
    resizeTableItems,
    setTableItemsSize,
    tableItemsSize,
    setShowMeta,
    showMeta,
    showAssignees,
    setShowAssignees,
    setSelectedEntType,
    selectedEntType,
  };
};
