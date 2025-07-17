// src/features/film/filmSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/AxiosInstance";

// Step 1: Async thunk to fetch films
export const fetchFilms = createAsyncThunk(
  "film/fetchFilms",
  async (queryParams, thunkAPI) => {
    try {
      // Simulate 2-second delay
      await new Promise((resolve) => setTimeout(resolve, 200));
      const response = await axiosInstance.get("/film/", {
        params: queryParams,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Server error");
    }
  }
);

// Step 2: Slice
const filmSlice = createSlice({
  name: "film",
  initialState: {
    films: {
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
      // films
      .addCase(fetchFilms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.loading = false;
        state.films = action.payload;
        console.log(state.films);
      })
      .addCase(fetchFilms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default filmSlice.reducer;
