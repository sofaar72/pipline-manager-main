// hooks/useTasks.js
import { useDispatch, useSelector } from "react-redux";
import {
  createVariation,
  fetchVariation,
  fetchVariationsForAll,
} from "../store/Slices/VariationsSlice";

export const useVariations = () => {
  const dispatch = useDispatch();

  const { variations, createVariationRes, allVariations } = useSelector(
    (state) => state.variation
  );
  const {
    results: variationResults,
    loading: variationLoading,
    error: variationError,
  } = variations || {};
  const { allVariationsResults, allVariationsLoading, allVariationsError } =
    allVariations || {};
  const { createResults, createLoading, createError } =
    createVariationRes || {};

  const fetchAllVariation = (id) => {
    dispatch(fetchVariation({ head: id }));
  };
  const fetchVariationsForAllEntities = () => {
    dispatch(fetchVariationsForAll());
  };
  const createTheVariation = async (data, closeModal) => {
    await dispatch(createVariation(data))
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return {
    variationResults,
    variationLoading,
    variationError,
    allVariationsResults,
    allVariationsLoading,
    allVariationsError,
    createResults,
    createLoading,
    createError,
    fetchAllVariation,
    fetchVariationsForAllEntities,
    createTheVariation,
  };
};
