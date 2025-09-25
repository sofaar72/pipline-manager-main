// src/features/film/filmSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/AxiosInstance";
import { toast } from "react-toastify";

// FETCH Variation
export const fetchVariation = createAsyncThunk(
  "assets/fetchVariations",
  async ({ queryParams }, thunkAPI) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 200));
      const response = await axiosInstance.get(`/assets/variations/`, {
        params: queryParams,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Server error");
    }
  }
);
export const fetchVariationsForAll = createAsyncThunk(
  "assets/fetchVariationsForAll",
  async (_, thunkAPI) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 200));
      const response = await axiosInstance.get(`/assets/variations/`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Server error");
    }
  }
);
export const createVariation = createAsyncThunk(
  "assets/createVariation",
  async (data, thunkAPI) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 200));
      const response = await axiosInstance.post(`/assets/variations/`, data);
      if (response.status === 201) {
        toast.success("Variation Created");
      }
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.error.message);
      return thunkAPI.rejectWithValue(error.response?.data || "Server error");
    }
  }
);

// Step 2: Slice
const VariationsSlice = createSlice({
  name: "variations",
  initialState: {
    variations: {
      results: [],
      loading: false,
      error: null,
    },
    allVariations: {
      allVariationsResults: [],
      allVariationsLoading: false,
      allVariationsError: null,
    },
    createVariationRes: {
      createResults: [],
      createLoading: false,
      createError: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    // FETCH TASKS
    builder
      .addCase(fetchVariation.pending, (state) => {
        state.variations.loading = true;
        state.variations.error = null;
      })
      .addCase(fetchVariation.fulfilled, (state, action) => {
        state.variations.loading = false;
        state.variations.results = action.payload.results;
      })
      .addCase(fetchVariation.rejected, (state, action) => {
        state.variations.loading = false;
        state.variations.error = action.payload;
      });
    // FETCH ALL VARIATIONS
    builder
      .addCase(fetchVariationsForAll.pending, (state) => {
        state.allVariations.allVariationsLoading = true;
        state.allVariations.allVariationsError = null;
      })
      .addCase(fetchVariationsForAll.fulfilled, (state, action) => {
        console.log(action.payload.results);
        state.allVariations.allVariationsLoading = false;
        state.allVariations.allVariationsResults = action.payload.results;
      })
      .addCase(fetchVariationsForAll.rejected, (state, action) => {
        state.allVariations.allVariationsLoading = false;
        state.allVariations.allVariationsError = action.payload;
      });
    // Create Variation
    builder
      .addCase(createVariation.pending, (state) => {
        state.createVariationRes.createLoading = true;
        state.createVariationRes.createError = null;
      })
      .addCase(createVariation.fulfilled, (state, action) => {
        state.createVariationRes.createLoading = false;
        state.createVariationRes.createResults = action.payload;
      })
      .addCase(createVariation.rejected, (state, action) => {
        state.createVariationRes.createLoading = false;
        state.createVariationRes.createError = action.payload;
      });
  },
});

export default VariationsSlice.reducer;
