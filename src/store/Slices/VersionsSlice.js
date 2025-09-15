// src/features/film/filmSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/AxiosInstance";
import { toast } from "react-toastify";

export const fetchTaskVersions = createAsyncThunk(
  "task/fetchTaskVersions",
  async ({ id, queryParams }, thunkAPI) => {
    try {
      // console.log(id);
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
export const fetchVersionPreview = createAsyncThunk(
  "version/fetchVersionPreview",
  async ({ id }, thunkAPI) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      const response = await axiosInstance.get(`/versions/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Server error");
    }
  }
);

export const createVersion = createAsyncThunk(
  "version/createVersion",
  async (data) => {
    console.log(data);
    try {
      const response = await axiosInstance.post(`/versions/publish/`, data);
      if (response.status === 201) {
        toast.success("Version created successfully");
      }
      return response.data;
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || { error: "Server error" }
      );
    }
  }
);

// Step 2: Slice
const versionSlice = createSlice({
  name: "version",
  initialState: {
    // data: { results: [], loading: false, error: null },
    versions: { results: [], loading: false, error: null },
    versionPreview: { data: {}, loading: false, error: null },
    createVersionData: { data: {}, loading: false, error: null },
  },
  reducers: {
    resetVersionPreview: (state) => {
      state.versionPreview = { data: {}, loading: false, error: null };
    },
  },
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

    // version preview
    builder
      .addCase(fetchVersionPreview.pending, (state) => {
        state.versionPreview.loading = true;
        state.versionPreview.error = null;
      })
      .addCase(fetchVersionPreview.fulfilled, (state, action) => {
        state.versionPreview.loading = false;
        state.versionPreview.data = action.payload; // ✅ Correct path
      })
      .addCase(fetchVersionPreview.rejected, (state, action) => {
        state.versionPreview.loading = false;
        state.versionPreview.error = action.payload;
      });

    // create version
    builder
      .addCase(createVersion.pending, (state) => {
        state.createVersionData.loading = true;
        state.createVersionData.error = null;
      })
      .addCase(createVersion.fulfilled, (state, action) => {
        state.createVersionData.loading = false;
        state.createVersionData.success = true;
        // state.versions.results.push(action.payload); // Optionally update local task list
      })
      .addCase(createVersion.rejected, (state, action) => {
        state.createVersionData.loading = false;
        state.createVersionData.error = action.payload;
      });
  },
});

export const { resetVersionPreview } = versionSlice.actions;
export default versionSlice.reducer;
