// src/features/film/filmSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/AxiosInstance";
import { toast } from "react-toastify";

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

export const fetchFilmEpisode = createAsyncThunk(
  "film/fetchFilmEpisode",
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

export const createFilm = createAsyncThunk(
  "film/createFilm",
  async (data, thunkAPI) => {
    try {
      // Simulate 2-second delay
      await new Promise((resolve) => setTimeout(resolve, 200));
      const response = await axiosInstance.post("/film/", data);
      if (response.data) {
        toast.success(`Entity created successfully`);
      }
      return response.data;
    } catch (error) {
      if (error.response.data.name) {
        toast.error(`"Name Error" ${error.response.data.name[0]}`);
      } else if (error.response.data.type) {
        toast.error(`"Type Error" ${error.response.data.type[0]}`);
      }
      return thunkAPI.rejectWithValue(error.response?.data || "Server error");
    }
  }
);

export const deleteFilm = createAsyncThunk(
  "film/deleteFilm",
  async (id, thunkAPI) => {
    try {
      // Simulate 2-second delay
      await new Promise((resolve) => setTimeout(resolve, 200));
      const response = await axiosInstance.delete(`/film/delete/${id}/`);

      // if (response.data === 204) {
      toast.success(`film removed successfully`);
      // }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Server error");
    }
  }
);
export const editFilm = createAsyncThunk(
  "film/editFilm",
  async ({ id, data }, thunkAPI) => {
    try {
      // Simulate 2-second delay
      await new Promise((resolve) => setTimeout(resolve, 200));
      const response = await axiosInstance.post(`/film/${id}`, data);
      if (response.data) {
        toast.success(`film updated successfully`);
      }
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
    episodes: {
      loading: false,
      error: false,
      results: [],
    },
    loading: false,
    error: null,
    createFilm: {
      results: [],
      loading: false,
      error: null,
    },
    deleteFilm: {
      results: [],
      loading: false,
      error: null,
    },
    editFilm: {
      results: [],
      loading: false,
      error: null,
    },
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
    builder
      // episode
      .addCase(fetchFilmEpisode.pending, (state) => {
        state.episodes.loading = true;
        state.episodes.error = null;
      })
      .addCase(fetchFilmEpisode.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.episodes.loading = false;
        state.episodes = action.payload;
      })
      .addCase(fetchFilmEpisode.rejected, (state, action) => {
        state.episodes.loading = false;
        state.episodes.error = action.payload;
      });
    builder
      // create film
      .addCase(createFilm.pending, (state) => {
        state.createFilm.loading = true;
        state.createFilm.error = null;
      })
      .addCase(createFilm.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.createFilm.loading = false;
        state.createFilm.results = action.payload;
      })
      .addCase(createFilm.rejected, (state, action) => {
        state.createFilm.loading = false;
        state.createFilm.error = action.payload;
      });
    // delete film
    builder
      .addCase(deleteFilm.pending, (state) => {
        state.deleteFilm.loading = true;
        state.deleteFilm.error = null;
      })
      .addCase(deleteFilm.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.deleteFilm.loading = false;
        state.deleteFilm.results = action.payload;
      })
      .addCase(deleteFilm.rejected, (state, action) => {
        state.deleteFilm.loading = false;
        state.deleteFilm.error = action.payload;
      });
    // edit film
    builder
      .addCase(editFilm.pending, (state) => {
        state.editFilm.loading = true;
        state.editFilm.error = null;
      })
      .addCase(editFilm.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.editFilm.loading = false;
        state.editFilm.results = action.payload;
      })
      .addCase(editFilm.rejected, (state, action) => {
        state.editFilm.loading = false;
        state.editFilm.error = action.payload;
      });
  },
});

export default filmSlice.reducer;
