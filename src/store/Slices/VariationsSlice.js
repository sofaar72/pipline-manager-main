// src/features/film/filmSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/AxiosInstance";

// FETCH TASK
export const fetchVariation = createAsyncThunk(
  "type/fetchVariations",
  async ({ id }, thunkAPI) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      const response = await axiosInstance.get(`/variations/`, {
        params: {
          head: id,
        },
      });
      return response.data;
    } catch (error) {
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
      .addCase(fetchVariation.pending, (state) => {
        state.variations.loading = true;
        state.variations.error = null;
      })
      .addCase(fetchVariation.fulfilled, (state, action) => {
        state.variations.loading = false;
        state.variations.results = action.payload;
      })
      .addCase(fetchVariation.rejected, (state, action) => {
        state.variations.loading = false;
        state.variations.error = action.payload;
      });
  },
});

export default VariationsSlice.reducer;
