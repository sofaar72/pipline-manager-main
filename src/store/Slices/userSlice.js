// src/features/film/filmSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/AxiosInstance";

// Step 1: Async thunk to fetch films
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, thunkAPI) => {
    try {
      // Simulate 2-second delay
      await new Promise((resolve) => setTimeout(resolve, 200));
      const response = await axiosInstance.post("/auth/login/", {
        ...userData,
      });
      return response.data;
    } catch (error) {
      console.log(error.response?.data);
      return thunkAPI.rejectWithValue(error.response?.data || "Server error");
    }
  }
);

// Step 2: Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    loading: false,
    error: null,
    success: false,
    accessToken: null,
    refreshToken: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // films
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action.payload);
        // console.log(action.payload);
        state.loading = false;
        state.user = action.payload;
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.user.id = action.payload.user.id;
        state.user.email = action.payload.user.email;
        state.success = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = "somthing went wrong";
      });
  },
});

export default userSlice.reducer;
