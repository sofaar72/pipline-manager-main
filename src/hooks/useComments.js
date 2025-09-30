// hooks/useEntities.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProject, getProjects } from "../store/Slices/ProjectsSlice";
import {
  fetchComment,
  sendAnnotations,
  sendComment,
  deleteComment,
  getAnnotations,
  updateComment,
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
    deleteCommentData,
    deleteLoading,
    deleteError,
    updateLoading,
    updateError,
    updateRes,
    annotations,
    annotationLoading,
    annotationError,
  } = useSelector((state) => state.comments);

  const getAllComments = (id, taskId = null, parent = undefined) => {
    dispatch(
      fetchComment({
        version: id,
        task: taskId,
        parent: parent ? parent : undefined,
      })
    );
  };
  const getAllCommentReplies = (id, taskId = null, parent = undefined) => {
    dispatch(
      fetchComment({
        version: id,
        task: taskId,
        parent: parent ? parent : undefined,
      })
    );
  };
  const sendTheComment = (comment, getTheComment) => {
    dispatch(sendComment(comment)).then((response) => {
      if (response?.payload) {
        // getComments();
        getTheComment();
      }
    });
  };
  const deleteTheComment = (id, getComments, closeModal) => {
    // console.log(id);
    dispatch(deleteComment(id)).then((response) => {
      if (response?.payload) {
        // getComments();
        getComments();
        closeModal();
      }
    });
  };
  const updateTheComment = (id, data, getComments, close = () => {}) => {
    // console.log(id);
    // console.log(data);
    dispatch(updateComment({ id: id, data: data })).then((response) => {
      if (response?.payload) {
        // getComments();
        getComments();
        close(false);
      }
    });
  };

  const sendAllAnnotations = (data) => {
    dispatch(sendAnnotations(data));
  };
  const fetchAllAnnotations = (media_id) => {
    // console.log(media_id);
    dispatch(getAnnotations({ media_id: media_id }));
  };

  return {
    getAllComments,
    getAllCommentReplies,
    comments,
    loading,
    error,
    sendTheComment,
    createComment,
    createLoading,
    createError,
    deleteCommentData,
    deleteTheComment,
    deleteLoading,
    deleteError,
    updateLoading,
    updateError,
    updateRes,
    updateTheComment,
    sendAllAnnotations,
    fetchAllAnnotations,
    annotations,
    annotationLoading,
    annotationError,
  };
};
