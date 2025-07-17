// hooks/useEntities.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilms } from "../store/Slices/FilmSlice";
import { useTasks } from "./useTasks";

export const useEntities = ({ selectedEntity }) => {
  const dispatch = useDispatch();
  const [activeEntity, setActiveEntity] = useState();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 3;

  const { films, loading, error } = useSelector((state) => state.film);
  const { results = [], total = 0 } = films || {};
  const totalPages = Math.ceil(total / perPage);

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

  useEffect(() => {
    fetchEntities();
  }, [selectedEntity, search, currentPage]);

  return {
    activeEntity,
    setActiveEntity,
    entityResults: results,
    entityLoading: loading,
    entityError: error,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    totalPages,
    fetchEntities,
  };
};
