// src/features/film/filmSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/AxiosInstance";

export const fetchTaskVersions = createAsyncThunk(
  "task/fetchTaskVersions",
  async ({ id, queryParams }, thunkAPI) => {
    try {
      console.log(id);
      await new Promise((resolve) => setTimeout(resolve, 200));
      const response = await axiosInstance.get(`/tasks/${id}`, {
        params: queryParams,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Server error");
    }
  }
);

// Step 2: Slice
const versionSlice = createSlice({
  name: "version",
  initialState: {
    // data: { results: [], loading: false, error: null },
    versions: { results: [], loading: false, error: null },
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch task versions
    builder
      .addCase(fetchTaskVersions.pending, (state) => {
        state.versions.loading = true;
        state.versions.error = null;
      })
      .addCase(fetchTaskVersions.fulfilled, (state, action) => {
        state.versions.loading = false;
        state.versions.results = action.payload; // ✅ Correct path
      })
      .addCase(fetchTaskVersions.rejected, (state, action) => {
        state.versions.loading = false;
        state.versions.error = action.payload;
      });
  },
});

export default versionSlice.reducer;
