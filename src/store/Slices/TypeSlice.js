// src/features/film/filmSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/AxiosInstance";

// FETCH TASK
export const fetchTypes = createAsyncThunk(
  "type/fetchTypes",
  async ({ queryParams }, thunkAPI) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      const response = await axiosInstance.get(`/task_type/`, {
        params: queryParams,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Server error");
    }
  }
);

// Step 2: Slice
const TypeSlice = createSlice({
  name: "type",
  initialState: {
    types: {
      results: [],
      loading: false,
      error: null,
    },
    // createStatus: {
    //   loading: false,
    //   error: null,
    //   success: false,
    // },
  },
  reducers: {},
  extraReducers: (builder) => {
    // FETCH TASKS
    builder
      .addCase(fetchTypes.pending, (state) => {
        state.types.loading = true;
        state.types.error = null;
      })
      .addCase(fetchTypes.fulfilled, (state, action) => {
        state.types.loading = false;
        state.types.results = action.payload;
      })
      .addCase(fetchTypes.rejected, (state, action) => {
        state.types.loading = false;
        state.types.error = action.payload;
      });
  },
});

export default TypeSlice.reducer;
