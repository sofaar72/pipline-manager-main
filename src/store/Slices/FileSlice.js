// src/features/film/filmSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/AxiosInstance";

export const fetchFiles = createAsyncThunk(
  "file/fetchFiles",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/file/");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Server error");
    }
  }
);

export const uploadFileToServer = createAsyncThunk(
  "file/uploadFileToServer",
  async ({ file }, thunkAPI) => {
    try {
      console.log(file);

      const response = await axiosInstance.post(
        `/file/upload_url/`,
        { files: file }
        //    {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Server error");
    }
  }
);

// Step 2: Slice
const fileSlice = createSlice({
  name: "file",
  initialState: {
    // data: { results: [], loading: false, error: null },
    uploadFile: { results: [], loading: false, error: null },
    files: { results: [], loading: false, error: null },
  },
  reducers: {},
  extraReducers: (builder) => {
    // fetch files
    builder.addCase(fetchFiles.pending, (state) => {
      state.files.loading = true;
      state.files.error = null;
    });
    builder.addCase(fetchFiles.fulfilled, (state, action) => {
      state.files.loading = false;
      state.files.results = action.payload.results;
    });
    builder.addCase(fetchFiles.rejected, (state, action) => {
      state.files.loading = false;
      state.files.error = action.payload;
    });
    // upload files to server
    builder
      .addCase(uploadFileToServer.pending, (state) => {
        state.uploadFile.loading = true;
        state.uploadFile.error = null;
      })
      .addCase(uploadFileToServer.fulfilled, (state, action) => {
        state.uploadFile.loading = false;
        state.uploadFile.results = action.payload; // ✅ Correct path
      })
      .addCase(uploadFileToServer.rejected, (state, action) => {
        state.uploadFile.loading = false;
        state.uploadFile.error = action.payload;
      });
  },
});

export default fileSlice.reducer;
