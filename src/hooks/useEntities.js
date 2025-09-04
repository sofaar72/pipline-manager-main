// hooks/useEntities.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFilm,
  editFilm,
  fetchFilmEpisode,
  fetchFilms,
} from "../store/Slices/FilmSlice";
import { useTasks } from "./useTasks";
import { useNavigate } from "react-router-dom";
import { createFilm } from "../store/Slices/FilmSlice";

export const useEntities = () => {
  const [selectedEntityType, setSelectedEntityType] = useState("All");
  const [entityId, setEntityId] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  // CREATE
  const {
    films,
    loading,
    error,
    createFilm: createFilmData,
    editFilm: editFilmData,
    deleteFilm: deleteFilmData,
  } = useSelector((state) => state.film);

  const {
    results: createResults,
    loading: createLoading,
    error: createError,
  } = createFilmData || {};

  // EDIT
  const {
    results: editResults,
    loading: editLoading,
    error: editError,
  } = editFilmData || {};

  // DELETE
  const {
    results: delelteResults,
    loading: deleteLoading,
    error: deleteError,
  } = deleteFilmData || {};

  const { results = [], total = 0 } = films || {};
  const totalPages = Math.ceil(total / perPage);

  const isEntityInCurrentPage = (entId) => {
    // Get films for the current page
    const currentEntity = results.slice(startIndex, endIndex);
    return currentEntity.some((ent) => ent.id === entId);
  };

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

  const fetchEpisodes = () => {
    const project = localStorage.getItem("project_id");
    if (project) {
      dispatch(
        fetchFilmEpisode({
          project: project,
          type: "EP",
          page_size: "100",
        })
      );
    }
  };

  const navigateToDefaultEntity = () => {
    if (results && results.length > 0) {
      navigate(`/file-manager/production/${results[0].id}`);
    }
  };

  const selectEntityType = (type) => {
    setSelectedEntityType(type);
  };
  const createFilmEntity = async (data, closeModal = () => {}) => {
    dispatch(createFilm(data)).then((res) => {
      if (res.payload) {
        setCurrentPage(1); // this will auto-trigger fetchEntities via useEffect

        setTimeout(
          () => {
            closeModal(false);
            fetchEntities();
          },

          1000
        );
      }
    });
  };

  const deleteFilmEntity = async (id, closeModal = () => {}) => {
    dispatch(deleteFilm(id)).then((res) => {
      console.log(res);
      if (res) {
        setTimeout(() => {
          closeModal();
          fetchEntities();
        }, 1000);
      }
    });
  };
  const editFilmEntity = async (data, closeModal = () => {}) => {
    dispatch(editFilm(data)).then((res) => {
      if (res.payload) {
        //  closeModal( )
      }
    });
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
    selectEntityType,
    selectedEntityType,
    navigateToDefaultEntity,
    isEntityInCurrentPage,
    perPage,
    createFilmEntity,
    createLoading,
    createError,
    deleteFilmEntity,
    delelteResults,
    deleteLoading,
    deleteError,
    editFilmEntity,
    editResults,
    editLoading,
    editError,
    fetchEpisodes,
    entityId,
    setEntityId,
  };
};
