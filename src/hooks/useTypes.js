// hooks/useTasks.js
import { useDispatch, useSelector } from "react-redux";
import { fetchTypes } from "../store/Slices/TypeSlice";

export const useTypes = () => {
  const dispatch = useDispatch();

  const { types } = useSelector((state) => state.type);
  const {
    results: typeResults,
    loading: typeLoading,
    error: typeError,
  } = types || {};

  const fetchAllTypes = () => {
    dispatch(fetchTypes({ type: "Prd" }));
  };

  return {
    typeResults,
    typeLoading,
    typeError,
    fetchAllTypes,
  };
};
