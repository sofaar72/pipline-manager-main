// src/features/film/filmSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/AxiosInstance";

// FETCH TASK
export const fetchTasks = createAsyncThunk(
  "task/fetchTasks",
  async ({ id, queryParams }, thunkAPI) => {
    try {
      // console.log(id);
      await new Promise((resolve) => setTimeout(resolve, 200));
      const response = await axiosInstance.get(`/film/${id}/tasks`, {
        params: queryParams,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Server error");
    }
  }
);
// CREATE TASK
export const createTask = createAsyncThunk("task/createTask", async (data) => {
  console.log(data);
  try {
    const response = await axiosInstance.post(`/tasks/`, data);
    return response.data;
  } catch (error) {
    console.log("Error response:", error.response);
    return thunkAPI.rejectWithValue(
      error.response?.data?.error || { error: "Server error" }
    );
  }
});

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
        // console.log(action.payload);
        state.tasks.results.push(action.payload); // Optionally update local task list
      })
      .addCase(createTask.rejected, (state, action) => {
        state.createStatus.loading = false;
        state.createStatus.error = action.payload.error || "Unknown error";
      });
  },
});

export default taskSlice.reducer;
