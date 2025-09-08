// hooks/useEntities.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProject, getProjects } from "../store/Slices/ProjectsSlice";
import {
  fetchComment,
  sendAnnotations,
  sendComment,
  getAnnotations,
} from "../store/Slices/CommentsSlice";

export const useComments = () => {
  const dispatch = useDispatch();
  const {
    comments,
    loading,
    error,
    createComment,
    createLoading,
    createError,
    annotations,
    annotationLoading,
    annotationError,
  } = useSelector((state) => state.comments);

  const getAllComments = (id) => {
    dispatch(fetchComment({ version: id }));
  };
  const sendTheComment = (comment) => {
    dispatch(sendComment(comment)).then((response) => {
      if (response?.payload) {
        // getComments();
        getAllComments(response?.payload?.version);
      }
    });
  };

  const sendAllAnnotations = (data) => {
    dispatch(sendAnnotations(data));
  };
  const fetchAllAnnotations = (media_id) => {
    console.log(media_id);
    dispatch(getAnnotations({ media_id: media_id }));
  };

  return {
    getAllComments,
    comments,
    loading,
    error,
    sendTheComment,
    createComment,
    createLoading,
    createError,
    sendAllAnnotations,
    fetchAllAnnotations,
    annotations,
    annotationLoading,
    annotationError,
  };
};
