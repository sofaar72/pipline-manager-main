// src/features/film/filmSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/AxiosInstance";
import { toast } from "react-toastify";

// Step 1: Async thunk to fetch films
export const createProject = createAsyncThunk(
  "project/createProject",
  async (queryParams, thunkAPI) => {
    try {
      // Simulate 2-second delay
      await new Promise((resolve) => setTimeout(resolve, 200));
      const response = await axiosInstance.post("/projects/", queryParams);
      toast.success("Project created successfully");
      return response.data;
    } catch (error) {
      console.log(error?.response?.data);
      return thunkAPI.rejectWithValue(error.response?.data || "Server error");
      // toast.error(error.response?.data || "Server error");
    }
  }
);

export const getProjects = createAsyncThunk(
  "project/getProjects",
  async (queryParams, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/projects/", queryParams);
      return response.data;
    } catch (error) {
      console.log(error?.response?.data);
      return thunkAPI.rejectWithValue(error.response?.data || "Server error");
      // toast.error(error.response?.data || "Server error");
    }
  }
);

// Step 2: Slice
const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: {
      page_size: null,
      results: [],
      total: null,
      loading: false,
      error: null,
    },
    createdProject: {
      data: null,
      success: false,
      message: "",
      loading: false,
      error: null,
    },
    selectedProject: {
      id: localStorage.getItem("project_id") || null,
      name: localStorage.getItem("project_name") || null,
    },
  },
  reducers: {
    selectProject: (state, action) => {
      state.selectedProject = {
        ...state.selectedProject,
        id: action.payload.id,
        name: action.payload.name,
      };
      localStorage.setItem("project_name", action.payload.name);
      localStorage.setItem("project_id", action.payload.id);
    },
    clearSelectedProject: (state) => {
      state.selectedProject = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // create project
      .addCase(createProject.pending, (state) => {
        state.createdProject.loading = true;
        state.createdProject.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.createdProject.loading = false;
        state.createdProject.success = true;
        state.createdProject.message = action.payload.message;
        state.createdProject.data = action.payload.data;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.createdProject.loading = false;
        state.createdProject.error = action.payload;
      });

    // get projects
    builder
      .addCase(getProjects.pending, (state) => {
        state.projects.loading = true;
        state.projects.error = null;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.projects.loading = false;
        state.projects.error = null;
        state.projects.results = action.payload.results;
        state.projects.total = action.payload.total;
        state.projects.page_size = action.payload.page_size;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.projects.loading = false;
        state.projects.error = action.payload;
      });
  },
});

export const { selectProject, clearSelectedProject } = projectSlice.actions;
export default projectSlice.reducer;
