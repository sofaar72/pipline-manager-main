// src/features/film/filmSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/AxiosInstance";
import { toast } from "react-toastify";

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
export const createAssets = createAsyncThunk(
  "asset/createAssets",
  async (data, thunkAPI) => {
    try {
      // Simulate 2-second delay
      // await new Promise((resolve) => setTimeout(resolve, 200));
      const response = await axiosInstance.post("/assets/", data);
      if (response.status === 201) {
        toast.success("Asset Created");
      }
      return response.data;
    } catch (error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data || "Server error");
    }
  }
);
export const fetchAssetTypes = createAsyncThunk(
  "asset/assetTypes",
  async (queryParams, thunkAPI) => {
    try {
      // Simulate 2-second delay
      // await new Promise((resolve) => setTimeout(resolve, 200));
      const response = await axiosInstance.get("/asset_types/");
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
    createRes: {
      results: [],
      loading: false,
      error: false,
    },
    assetTypes: {
      AssetTypeResults: [],
      assetTypeloading: false,
      assetTypeError: false,
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
        // console.log(state.assets);
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      // assets
      .addCase(createAssets.pending, (state) => {
        state.createRes.loading = true;
        state.createRes.error = null;
      })
      .addCase(createAssets.fulfilled, (state, action) => {
        state.createRes.loading = false;
        state.createRes.assets = action.payload;
      })
      .addCase(createAssets.rejected, (state, action) => {
        state.createRes.loading = false;
        state.createRes.error = action.payload;
      });
    // fetch asset types
    builder
      // assets
      .addCase(fetchAssetTypes.pending, (state) => {
        state.assetTypes.assetTypeloading = true;
        state.assetTypes.assetTypeError = null;
      })
      .addCase(fetchAssetTypes.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.assetTypes.assetTypeloading = false;
        state.assetTypes.AssetTypeResults = action.payload.results;
        // console.log(state.assets);
      })
      .addCase(fetchAssetTypes.rejected, (state, action) => {
        state.assetTypes.assetTypeloading = false;
        state.assetTypes.assetTypeError = action.payload;
      });
  },
});

export default assetSlice.reducer;
