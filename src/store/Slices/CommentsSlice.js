// src/features/film/filmSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/AxiosInstance";
import { toast } from "react-toastify";

export const fetchComment = createAsyncThunk(
  "file/fetchComment",
  async (queryParams, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/comment/`, {
        params: queryParams,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Server error");
    }
  }
);
export const sendComment = createAsyncThunk(
  "file/sendComment",
  async (comment, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/comment/`, comment);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Server error");
    }
  }
);

export const deleteComment = createAsyncThunk(
  "file/deleteComment",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/comment/${id}/`);
      if (response.status === 200) {
        toast.success("Comment removed successfully");
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Server error");
    }
  }
);

export const sendAnnotations = createAsyncThunk(
  "annotation/sendAnnotation",
  async (data, thunkAPI) => {
    // console.log(data);
    try {
      const response = await axiosInstance.post(`/annotations/`, { ...data });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Server error");
    }
  }
);

export const getAnnotations = createAsyncThunk(
  "annotation/getAnnotations",
  async ({ media_id }, thunkAPI) => {
    // console.log(media_id);
    try {
      const response = await axiosInstance.get(`/annotations/${media_id}/`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Server error");
    }
  }
);

// Step 2: Slice
const CommentsSlice = createSlice({
  name: "comments",
  initialState: {
    // data: { results: [], loading: false, error: null },
    comments: [],
    loading: false,
    error: null,
    createComment: [],
    createLoading: false,
    createError: null,
    deleteCommentData: [],
    deleteLoading: false,
    deleteError: null,
    annotations: [],
    annotationLoading: false,
    annotationError: false,
    getAnnotationLoading: false,
    getAnnotationError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // fetch files
    builder.addCase(fetchComment.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchComment.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = action.payload.results;
    });
    builder.addCase(fetchComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // create files
    builder.addCase(sendComment.pending, (state) => {
      state.createLoading = true;
      state.createError = null;
    });
    builder.addCase(sendComment.fulfilled, (state, action) => {
      state.createLoading = false;
      state.createComment = action.payload;
    });
    builder.addCase(sendComment.rejected, (state, action) => {
      state.createLoading = false;
      state.createError = action.payload;
    });
    // delete comment
    builder.addCase(deleteComment.pending, (state) => {
      state.deleteLoading = true;
      state.deleteError = null;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.deleteLoading = false;
      state.deleteComment = action.payload;
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.deleteLoading = false;
      state.deleteError = action.payload;
    });
    // send annotations
    builder.addCase(sendAnnotations.pending, (state) => {
      state.annotationLoading = true;
      state.annotationError = null;
    });
    builder.addCase(sendAnnotations.fulfilled, (state, action) => {
      state.annotationLoading = false;
      state.annotations = action.payload.results;
    });
    builder.addCase(sendAnnotations.rejected, (state, action) => {
      state.annotationLoading = false;
      state.annotationError = action.payload;
    });
    // get annotations
    builder.addCase(getAnnotations.pending, (state) => {
      state.getAnnotationLoading = true;
      state.getAnnotationError = null;
    });
    builder.addCase(getAnnotations.fulfilled, (state, action) => {
      state.getAnnotationLoading = false;

      state.annotations = action.payload[0].annotations;
    });
    builder.addCase(getAnnotations.rejected, (state, action) => {
      state.getAnnotationLoading = false;
      state.getAnnotationError = action.payload;
    });
  },
});

export default CommentsSlice.reducer;
