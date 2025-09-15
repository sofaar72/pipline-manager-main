import { useDispatch, useSelector } from "react-redux";
import {
  uploadFileToServer,
  uploadSmallFileToServer,
} from "../store/Slices/FileSlice";
import * as tus from "tus-js-client";
import { toast } from "react-toastify";
import { useState } from "react";
import { useVersions } from "./useVersions";

export const useUploadFile = () => {
  const [uploads, setUploads] = useState({});
  const [uploadProgress, setUploadProgress] = useState({});
  const dispatch = useDispatch();
  const { createNewVersion } = useVersions();

  const { uploadSmallFile } = useSelector((state) => state.file);

  const {
    results: uloadSmallResults,
    smallLoading,
    smallError,
  } = uploadSmallFile;

  const handleLargeUpload = (uploadUrl, files) => {
    const token = localStorage.getItem("access_token");

    files.forEach((file) => {
      const upload = new tus.Upload(file, {
        uploadUrl,
        retryDelays: [0, 3000, 5000, 10000, 20000],
        metadata: {
          filename: file.name,
          filetype: file.type,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        onError: (error) => {
          console.error("Upload failed:", error);
          toast.error("Upload failed: " + error.message);
        },
        onProgress: (bytesUploaded, bytesTotal) => {
          const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
          setUploadProgress((prev) => ({
            ...prev,
            [file.name]: percentage,
          }));
        },
        onSuccess: () => {
          console.log("Uploaded", upload.file.name, "to", upload.url);
          toast.success(`${file.name} uploaded successfully`);
          setUploadProgress((prev) => ({
            ...prev,
            [file.name]: 100,
          }));
        },
      });

      // Save upload instance
      setUploads((prev) => ({ ...prev, [file.name]: upload }));

      upload.start();
    });
  };

  const pauseUpload = (fileName) => {
    if (uploads[fileName]) {
      uploads[fileName].abort(); // pauses upload
      toast.info(`${fileName} paused`);
    }
  };

  const resumeUpload = (fileName) => {
    if (uploads[fileName]) {
      uploads[fileName].start(); // resumes upload
      toast.info(`${fileName} resumed`);
    }
  };

  const retryUpload = (uploadUrl, file) => {
    // Simply restart the upload with same file
    handleLargeUpload(uploadUrl, [file]);
  };

  const uploadLargeSize = async (uploadData) => {
    try {
      const res = await dispatch(uploadFileToServer({ file: uploadData }));

      const url = res?.payload?.files?.[0]?.tus_url;
      if (!url) throw new Error("Missing upload URL");

      // Handle the large file upload (assuming this triggers the upload)
      await handleLargeUpload(
        url,
        uploadData.map((item) => item.file)
      );

      // Return the file IDs
      if (res && res.payload) {
        const ids = res?.payload?.map((f) => f.media_id) || [];
        return ids;
      }

      return [];
    } catch (err) {
      console.error("Large file upload failed:", err);
      // toast.error("Large file upload failed");
      throw err; // Re-throw to be caught by the main function
    }
  };
  const uploadSmallSize = async (uploadData) => {
    try {
      const res = await dispatch(uploadSmallFileToServer({ file: uploadData }));

      if (res && res.payload) {
        const ids = res?.payload?.map((f) => f.media_id) || [];
        return ids;
      }

      return [];
    } catch (err) {
      console.error("Small file upload failed:", err);
      throw err; // Re-throw to be caught by the main function
    }
  };

  const handleCreateVersion = (data) => {
    createNewVersion(data);
  };

  return {
    uploadSmallSize,
    uploadLargeSize,
    uloadSmallResults,
    smallLoading,
    smallError,
    uploadProgress,
    pauseUpload,
    resumeUpload,
    retryUpload,
    handleCreateVersion,
  };
};
