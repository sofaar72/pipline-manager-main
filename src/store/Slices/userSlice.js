// src/features/film/filmSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/AxiosInstance";
import { toast } from "react-toastify";

// Step 1: Async thunk to fetch films
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, thunkAPI) => {
    console.log(userData);
    try {
      // Simulate 2-second delay
      await new Promise((resolve) => setTimeout(resolve, 200));
      const response = await axiosInstance.post(
        "/auth/login/",
        //   {
        //   ...userData,
        // }
        { username: userData.email, password: userData.password }
      );
      return response.data;
    } catch (error) {
      console.log(error.response?.data);
      return thunkAPI.rejectWithValue(error.response?.data || "Server error");
    }
  }
);

// register
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, thunkAPI) => {
    try {
      // Simulate 2-second delay
      await new Promise((resolve) => setTimeout(resolve, 200));
      const response = await axiosInstance.post("/auth/register/", {
        ...userData,
      });
      if (response.status === 201) {
        toast.success("User is Registered");
      }
      return response.data;
    } catch (error) {
      console.log(error.response?.data.email[0]);
      if (error.response?.data.email) {
        toast.error(error.response?.data.email[0]);
      }
      if (error.response?.data.password) {
        toast.error(error.response?.data.password[0]);
      }
      if (error.response?.data.first_name) {
        toast.error(error.response?.data.first_name[0]);
      }
      if (error.response?.data.last_name) {
        toast.error(error.response?.data.last_name[0]);
      }
      return thunkAPI.rejectWithValue(error.response?.data || "Server error");
    }
  }
);

// logout
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth/logout/");
      if (response.status === 200) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        toast.success("User is logged out");
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Server error");
    }
  }
);

// user Roles
export const fetchUserRoles = createAsyncThunk(
  "user/fetchUserRole",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/users/role");
      if (response.status === 200) {
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Server error");
    }
  }
);

// users
export const fetchAllUsers = createAsyncThunk(
  "user/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/users");
      if (response.status === 200) {
      }
      return response.data;
    } catch (error) {
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
    registerLoading: false,
    registerError: null,
    registerSuccess: false,
    registerUserResponse: {},
    logoutLoading: false,
    logoutError: null,
    logoutSuccess: false,
    userRoles: {
      results: [],
      loading: false,
      error: null,
    },

    users: {
      results: [],
      loading: false,
      error: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // user
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
    // register
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerLoading = false;
        state.registerUserResponse = action.payload;
        state.registerSuccess = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerLoading = false;
        state.registerError = "somthing went wrong";
      });
    // user Roles
    builder
      .addCase(fetchUserRoles.pending, (state) => {
        state.userRoles.loading = true;
        state.userRoles.error = null;
      })
      .addCase(fetchUserRoles.fulfilled, (state, action) => {
        console.log(action.payload);
        state.userRoles.loading = true;
        state.userRoles.results = action.payload?.results;
      })
      .addCase(fetchUserRoles.rejected, (state, action) => {
        state.userRoles.loading = true;
        state.userRoles.error = "somthing went wrong";
      });
    // fetch users
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.users.loading = true;
        state.users.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        console.log(action.payload);
        state.users.loading = false;
        state.users.results = action.payload?.results;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.users.loading = false;
        state.users.error = "somthing went wrong";
      });

    // logout
    builder
      .addCase(logoutUser.pending, (state) => {
        state.logoutLoading = true;
        state.logoutError = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.logoutLoading = false;
        state.logoutSuccess = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.logoutLoading = false;
        state.logoutError = "somthing went wrong";
      });
  },
});

export default userSlice.reducer;
