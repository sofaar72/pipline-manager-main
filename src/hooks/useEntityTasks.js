import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilms } from "../store/Slices/FilmSlice";
import { fetchTasks } from "../store/Slices/TaskSlice";
import { Shots } from "../fakeContents/Shots";
import { Sequences } from "../fakeContents/Sequences";
import { fetchTaskVersions } from "../store/Slices/VersionsSlice";

export const useEntityTasks = ({ selectedEntity }) => {
  const dispatch = useDispatch();
  // STATES
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeEntity, setActiveEntity] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const [activeVersion, setActiveVersion] = useState(null);

  // SELECTORS
  const { films, loading, error } = useSelector((state) => state.film);
  const { tasks } = useSelector((state) => state.task);
  const { versions } = useSelector((state) => state.version);
  const { results } = films || {};
  const perPage = 3;
  const totalPages = Math.ceil(films?.total / perPage);

  const {
    results: taskResults,
    loading: taskLoading,
    error: taskError,
  } = tasks || {};

  const {
    results: versionResults,
    loading: versionLoading,
    error: versionError,
  } = versions || {};

  const fetchEntities = () => {
    dispatch(
      fetchFilms({
        project: 474,
        type:
          selectedEntity === "Episodes"
            ? "EP"
            : selectedEntity === "Sequence"
            ? "SQ"
            : selectedEntity === "Shot"
            ? "SH"
            : undefined,
        name: search || undefined,
        page: currentPage,
        page_size: perPage,
      })
    );
  };

  const filterByEpisode = (episode) => {
    if (selectedEntity === "Sequence") {
      return Sequences.filter((seq) => seq.episode === episode);
    }
    if (selectedEntity === "Shot") {
      return Shots.filter((shot) => shot.episode === episode);
    }
    return [];
  };
  const fetchAllTasks = (id) => {
    dispatch(fetchTasks({ id }));
  };
  const fetchAllVersions = (id) => {
    dispatch(fetchTaskVersions({ id }));
  };

  const handleEntityClick = (id) => {
    setActiveEntity(id);
    fetchAllTasks(id);
  };
  const handleTaskClick = (id) => {
    setActiveTask(id);
    fetchAllVersions(id);
  };
  const handleVersionClick = (id) => {
    setActiveVersion(id);
    fetchAllVersions(id);
  };

  // Fetch films when filters change
  useEffect(() => {
    fetchEntities();
  }, []);
  // useEffect(() => {
  //   fetchEntities();
  // }, [dispatch, selectedEntity, search, currentPage]);

  // Fetch tasks for first film after films load
  // useEffect(() => {
  //   if (results && results.length > 0) {
  //     handleEntityClick(results[0].id);
  //   }
  // }, [results]);
  // Fetch versions for first task after films load
  // useEffect(() => {
  //   if (taskResults && taskResults.length > 0) {
  //     handleTaskClick(taskResults[0].id);
  //   }
  // }, [taskResults]);

  // useEffect(() => {
  //   if (versionResults && versionResults.length > 0) {
  //     handleVersionClick(taskResults[0].id);
  //   }
  // }, [versionResults]);

  return {
    results,
    loading,
    error,
    activeEntity,
    handleEntityClick,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    totalPages,
    filterByEpisode,
    taskResults,
    taskLoading,
    taskError,
    activeTask,
    handleTaskClick,
    handleVersionClick,
  };
};
