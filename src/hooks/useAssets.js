// hooks/useAssets.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssets } from "../store/Slices/AssetSlice";
import { useTasks } from "./useTasks";
import { useNavigate } from "react-router-dom";

export const useAssets = () => {
  const [selectedAssetType, setSelectedAssetType] = useState("All");

  const { fetchAllAssetsTasks } = useTasks({
    dataType: "assets",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const { assets, loading, error } = useSelector((state) => state.asset);
  const { results = [], total = 0 } = assets || {};
  const totalPages = Math.ceil(total / perPage);

  const fetchAllAssets = () => {
    const project = localStorage.getItem("project_id");
    if (project) {
      dispatch(
        fetchAssets({
          project: project,
          type:
            selectedAssetType === "Episodes"
              ? "EP"
              : selectedAssetType === "Sequence"
              ? "SQ"
              : selectedAssetType === "Shot"
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
      navigate(`/task-manager/assets/${results[0].id}`);
    }
  };

  const selectAssetType = (type) => {
    setSelectedAssetType(type);
  };

  const fetchAssetTasks = (id) => {
    fetchAllAssetsTasks(id);
  };

  return {
    assetResults: results,
    assetLoading: loading,
    assetError: error,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    totalPages,
    fetchAllAssets,
    fetchAssetTasks,
    selectAssetType,
    selectedAssetType,
    navigateToDefaultEntity,
  };
};
