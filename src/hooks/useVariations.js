// hooks/useTasks.js
import { useDispatch, useSelector } from "react-redux";
import { fetchVariation } from "../store/Slices/VariationsSlice";

export const useVariations = () => {
  const dispatch = useDispatch();

  const { variations } = useSelector((state) => state.variation);
  const {
    results: variationResults,
    loading: variationLoading,
    error: variationError,
  } = variations || {};

  const fetchAllVariation = (id) => {
    dispatch(fetchVariation({ id }));
  };

  return {
    variationResults,
    variationLoading,
    variationError,
    fetchAllVariation,
  };
};
