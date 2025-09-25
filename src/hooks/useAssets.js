// hooks/useAssets.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAssets,
  fetchAssets,
  fetchAssetTypes,
} from "../store/Slices/AssetSlice";
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

  const { assets, loading, error, createRes, assetTypes } = useSelector(
    (state) => state.asset
  );
  const { results = [], total = 0 } = assets || {};
  const { AssetTypeResults, assetTypeLoading, assetTypeError } =
    assetTypes || {};
  const {
    results: createAssetResults,
    loading: createAssetLoading,
    error: createAssetError,
  } = createRes || {};
  const totalPages = Math.ceil(total / perPage);

  const fetchAllAssets = (type = null) => {
    const project = localStorage.getItem("project_id");
    if (project) {
      dispatch(
        fetchAssets({
          project: project,
          type: type ? type : undefined,
          name: search || undefined,
          page: currentPage,
          page_size: perPage,
        })
      );
    }
  };
  const fetchAllAssetTypes = () => {
    dispatch(fetchAssetTypes());
  };

  const createTheAsset = async (data, setStep, setHead) => {
    await dispatch(
      createAssets({
        ...data,
      })
    )
      .then((res) => {
        if (res.payload.name) {
          setStep("2");
          setHead(res.payload.id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
    createAssetResults,
    createAssetLoading,
    createAssetError,
    createTheAsset,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    totalPages,
    fetchAllAssets,
    fetchAssetTasks,
    selectAssetType,
    fetchAllAssetTypes,
    AssetTypeResults,
    assetTypeLoading,
    assetTypeError,
    selectedAssetType,
    navigateToDefaultEntity,
  };
};
