// store/Slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/AxiosInstance";
import { toast } from "react-toastify";

// ... (keep all your existing async thunks: loginUser, registerUser, etc.)

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth/login/", {
        username: userData.email,
        password: userData.password,
      });

      if (response.status === 200) {
        // Store role and user data in localStorage

        console.log(response.data);
        if (response.data.user?.role) {
          const roleData = response.data.user.role;
          if (typeof roleData === "object") {
            localStorage.setItem(
              "first_name",
              JSON.stringify(response.data.user.first_name)
            );
            localStorage.setItem(
              "last_name",
              JSON.stringify(response.data.user.last_name)
            );
            localStorage.setItem("user_id", JSON.stringify(response.data.id));
            localStorage.setItem(
              "access_token",
              JSON.stringify(response.data.access_token)
            );
            localStorage.setItem(
              "refresh_token",
              JSON.stringify(response.data.refresh_token)
            );
            localStorage.setItem("role", JSON.stringify(roleData));
            localStorage.setItem("role_id", roleData.id);
            localStorage.setItem("role_name", roleData.name);
          } else if (typeof roleData === "string") {
            localStorage.setItem("role", roleData);
            localStorage.setItem("role_name", roleData);
          }
        }
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Server error");
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth/register/", userData);
      if (response.status === 201) {
        toast.success("User is Registered");
      }
      return response.data;
    } catch (error) {
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

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth/logout/");
      if (response.status === 200) {
        toast.success("User is logged out");
      }
      return response.data;
    } catch (error) {
      // Even if the API fails, we should still logout locally
      return thunkAPI.rejectWithValue(error.response?.data || "Server error");
    }
  }
);

export const fetchUserRoles = createAsyncThunk(
  "user/fetchUserRole",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/users/role");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Server error");
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  "user/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/users");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Server error");
    }
  }
);

// INITIAL STATE
const initialState = {
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
};

// SLICE
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Add manual reset action (in case you need it)
    resetUserState: () => initialState,

    // Clear any login errors
    clearError: (state) => {
      state.error = null;
      state.registerError = null;
      state.logoutError = null;
    },
  },
  extraReducers: (builder) => {
    // LOGIN
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
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
        state.error = "Something went wrong";
      });

    // REGISTER
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
        state.registerError = "Something went wrong";
      });

    // USER ROLES
    builder
      .addCase(fetchUserRoles.pending, (state) => {
        state.userRoles.loading = true;
        state.userRoles.error = null;
      })
      .addCase(fetchUserRoles.fulfilled, (state, action) => {
        state.userRoles.loading = false;
        state.userRoles.results = action.payload?.results;
      })
      .addCase(fetchUserRoles.rejected, (state, action) => {
        state.userRoles.loading = false;
        state.userRoles.error = "Something went wrong";
      });

    // FETCH USERS
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.users.loading = true;
        state.users.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.users.loading = false;
        state.users.results = action.payload?.results;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.users.loading = false;
        state.users.error = "Something went wrong";
      });

    // LOGOUT - CRITICAL FIX HERE
    builder
      .addCase(logoutUser.pending, (state) => {
        state.logoutLoading = true;
        state.logoutError = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        // RESET ENTIRE STATE TO INITIAL VALUES
        return initialState;
      })
      .addCase(logoutUser.rejected, (state) => {
        // EVEN IF API FAILS, RESET STATE LOCALLY
        return initialState;
      });
  },
});

export const { resetUserState, clearError } = userSlice.actions;
export default userSlice.reducer;
