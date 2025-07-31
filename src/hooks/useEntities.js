// hooks/useEntities.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilms } from "../store/Slices/FilmSlice";
import { useTasks } from "./useTasks";
import { useNavigate } from "react-router-dom";

export const useEntities = () => {
  const [selectedEntityType, setSelectedEntityType] = useState("All");
  const { fetchAllTasks } = useTasks({ dataType: "production" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const { films, loading, error } = useSelector((state) => state.film);
  const { results = [], total = 0 } = films || {};
  const totalPages = Math.ceil(total / perPage);

  const fetchEntities = () => {
    const project = localStorage.getItem("project_id");
    if (project) {
      dispatch(
        fetchFilms({
          project: project,
          type:
            selectedEntityType === "Episodes"
              ? "EP"
              : selectedEntityType === "Sequence"
              ? "SQ"
              : selectedEntityType === "Shot"
              ? "SH"
              : undefined,
          name: search || undefined,
          page: currentPage,
          page_size: perPage,
        })
      );
    }
  };

  const navigateToDefaultEntity = () => {
    if (results && results.length > 0) {
      navigate(`/task-manager/production/${results[0].id}`);
    }
  };

  const selectEntityType = (type) => {
    setSelectedEntityType(type);
  };

  const fetchEntityTasks = (id) => {
    fetchAllTasks(id);
  };

  return {
    entityResults: results,
    entityLoading: loading,
    entityError: error,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    totalPages,
    fetchEntities,
    fetchEntityTasks,
    selectEntityType,
    selectedEntityType,
    navigateToDefaultEntity,
  };
};
