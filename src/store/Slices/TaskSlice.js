// src/features/film/filmSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/AxiosInstance";
import { toast } from "react-toastify";

// FETCH TASK
export const fetchTasks = createAsyncThunk(
  "task/fetchTasks",
  async ({ id, queryParams }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/film/${id}/tasks`, {
        params: queryParams,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Server error");
    }
  }
);

// Fetch assets tasks
export const fetchAssetsTasks = createAsyncThunk(
  "task/fetchAssetsTasks",
  async ({ id, queryParams }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/assets/variations/${id}/tasks`,
        {
          params: queryParams,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Server error");
    }
  }
);

// CREATE TASK - FIXED: Added thunkAPI parameter
export const createTask = createAsyncThunk(
  "task/createTask",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/tasks/`, data);

      if (response.status == 201) {
        // toast.success("Task Created!");
      }
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error || "something went wrong!");
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || { error: "Server error" }
      );
    }
  }
);

// UPDATE TASK
export const updateTask = createAsyncThunk(
  "task/updateTask",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/tasks/${id}/`, data);

      if (response.status == 200) {
        toast.success("Task UPDATED!");
      }
      return { id, ...response.data };
    } catch (error) {
      toast.error(error.response.data.error || "something went wrong!");
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || { error: "Server error" }
      );
    }
  }
);

// DELETE TASK
export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async ({ id }, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/tasks/${id}/`);
      return { id, ...response.data };
    } catch (error) {
      toast.error(error.response.data.error || "something went wrong!");
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || { error: "Server error" }
      );
    }
  }
);

// FETCH TASK STATUSES - FIXED: Now accepts filmId parameter
export const fetchTaskStatuses = createAsyncThunk(
  "task/fetchTaskStatuses",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/task_status/");
      if (response.status === 200) {
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Server error");
    }
  }
);

// Step 2: Slice
const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: {
      results: [],
      loading: false,
      error: null,
    },
    createStatus: {
      loading: false,
      error: null,
      success: false,
    },
    updateStatus: {
      loading: false,
      error: null,
      success: false,
      updateResults: {},
    },
    deleteStatus: {
      loading: false,
      error: null,
      success: false,
    },
    taskStatuses: {
      statusesLoading: false,
      statusesError: null,
      statusesResults: [],
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    // FETCH TASKS
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.tasks.loading = true;
        state.tasks.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks.loading = false;
        state.tasks.results = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.tasks.loading = false;
        state.tasks.error = action.payload;
      });

    // FETCH ASSETS TASKS
    builder
      .addCase(fetchAssetsTasks.pending, (state) => {
        state.tasks.loading = true;
        state.tasks.error = null;
      })
      .addCase(fetchAssetsTasks.fulfilled, (state, action) => {
        state.tasks.loading = false;
        state.tasks.results = action.payload;
      })
      .addCase(fetchAssetsTasks.rejected, (state, action) => {
        state.tasks.loading = false;
        state.tasks.error = action.payload;
      });

    // CREATE TASK
    builder
      .addCase(createTask.pending, (state) => {
        state.createStatus.loading = true;
        state.createStatus.error = null;
        state.createStatus.success = false;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.createStatus.loading = false;
        state.createStatus.success = true;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.createStatus.loading = false;
        state.createStatus.error = action.payload?.error || "Unknown error";
      });

    // UPDATE TASK
    builder
      .addCase(updateTask.pending, (state) => {
        state.updateStatus.loading = true;
        state.updateStatus.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const taskIndex = state.tasks.results.findIndex(
          (task) => task.id === updatedTask.id
        );

        if (taskIndex !== -1) {
          state.tasks.results[taskIndex] = updatedTask;
        }
        state.updateStatus.loading = false;
        state.updateStatus.success = true;
        state.updateStatus.error = null;
        state.updateStatus.updateResults = updatedTask;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.updateStatus.loading = false;
        state.updateStatus.error = action.payload?.error || "Unknown error";
        state.updateStatus.success = false;
      });

    // DELETE TASK
    builder
      .addCase(deleteTask.pending, (state) => {
        state.deleteStatus.loading = true;
        state.deleteStatus.error = null;
        state.deleteStatus.success = false;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.deleteStatus.loading = false;
        state.deleteStatus.success = true;
        state.deleteStatus.error = null;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.deleteStatus.loading = false;
        state.deleteStatus.error = action.payload?.error || "Unknown error";
        state.deleteStatus.success = false;
      });

    // FETCH TASK STATUSES
    builder
      .addCase(fetchTaskStatuses.pending, (state) => {
        state.taskStatuses.statusesLoading = true;
        state.taskStatuses.statusesError = null;
      })
      .addCase(fetchTaskStatuses.fulfilled, (state, action) => {
        state.taskStatuses.statusesLoading = false;
        state.taskStatuses.statusesResults = action.payload.results;
      })
      .addCase(fetchTaskStatuses.rejected, (state, action) => {
        state.taskStatuses.statusesLoading = false;
        state.taskStatuses.statusesError = action.payload;
      });
  },
});

export default taskSlice.reducer;
