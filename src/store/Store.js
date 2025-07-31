// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import filmReducer from "./Slices/FilmSlice";
import taskReducer from "./Slices/TaskSlice";
import versionReducer from "./Slices/VersionsSlice";
import TypeReducer from "./Slices/TypeSlice";
import userReducer from "./Slices/userSlice";
import fileReducer from "./Slices/FileSlice";
import assetReducer from "./Slices/AssetSlice";
import variationsReducer from "./Slices/VariationsSlice";
import projectReducer from "./Slices/ProjectsSlice";

export const store = configureStore({
  reducer: {
    film: filmReducer,
    asset: assetReducer,
    task: taskReducer,
    version: versionReducer,
    type: TypeReducer,
    user: userReducer,
    file: fileReducer,
    variation: variationsReducer,
    project: projectReducer,
  },
});
