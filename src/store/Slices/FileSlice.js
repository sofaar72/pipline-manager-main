// src/features/film/filmSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/AxiosInstance";
import { toast } from "react-toastify";

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
  async ({ file, version }, thunkAPI) => {
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

      if (response.status === 2 - 1) {
        toast.success("Files uploaded successfully");
      }

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Server error");
    }
  }
);

export const uploadSmallFileToServer = createAsyncThunk(
  "file/uploadSmallFileToServer",
  async ({ file }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `/file/upload/`,
        file, // ✅ Send the FormData directly
        {
          headers: {
            "Content-Type": "multipart/form-data", // Optional: Axios sets this automatically when FormData is used
          },
        }
      );
      if (response.status === 201) {
        toast.success("files uploaded successfully");
      }
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
    uploadFile: { results: [] },
    files: { results: [] },
    uploadSmallFile: { results: [], smallLoading: false, smallError: false },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // fetch files
    builder.addCase(fetchFiles.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchFiles.fulfilled, (state, action) => {
      state.loading = false;
      state.files.results = action.payload.results;
    });
    builder.addCase(fetchFiles.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // upload files to server
    builder
      .addCase(uploadFileToServer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadFileToServer.fulfilled, (state, action) => {
        state.loading = false;
        state.uploadFile.results = action.payload; // ✅ Correct path
      })
      .addCase(uploadFileToServer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // upload small file to server
    builder
      .addCase(uploadSmallFileToServer.pending, (state) => {
        state.loading = true;
        state.uploadSmallFile.smallLoading = true;
        state.uploadSmallFile.smallError = null;
        state.error = null;
      })
      .addCase(uploadSmallFileToServer.fulfilled, (state, action) => {
        state.loading = false;
        state.uploadSmallFile.smallLoading = false;
        state.uploadSmallFile.results = action.payload;
      })
      .addCase(uploadSmallFileToServer.rejected, (state, action) => {
        state.loading = false;
        state.uploadSmallFile.smallLoading = false;
        state.error = action.payload;
        state.uploadSmallFile.smallError = action.payload;
      });
  },
});

export default fileSlice.reducer;
