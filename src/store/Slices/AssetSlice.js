// src/features/film/filmSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/AxiosInstance";

// Step 1: Async thunk to fetch films
export const fetchAssets = createAsyncThunk(
  "asset/fetchAssets",
  async (queryParams, thunkAPI) => {
    try {
      // Simulate 2-second delay
      // await new Promise((resolve) => setTimeout(resolve, 200));
      const response = await axiosInstance.get("/assets/", {
        params: queryParams,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Server error");
    }
  }
);

// Step 2: Slice
const assetSlice = createSlice({
  name: "asset",
  initialState: {
    assets: {
      page_size: null,
      results: [],
      total: null,
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // assets
      .addCase(fetchAssets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.loading = false;
        state.assets = action.payload;
        console.log(state.assets);
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default assetSlice.reducer;
