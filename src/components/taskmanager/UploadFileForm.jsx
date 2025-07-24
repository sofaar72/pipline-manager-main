import React, { useState, useEffect } from "react";
import UploadFileItem from "./UploadFileItem";
import CbuttonOne from "../golbals/Buttons/CbuttonOne";
import { uploadFileToServer } from "../../store/Slices/FileSlice";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "../../hooks/useUser";

import { ToastContainer, toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import * as tus from "tus-js-client";

const UploadFileForm = ({ setVersionFiles = () => {} }) => {
  const [uploadItems, setUploadItems] = useState([]);
  const [files, setFiles] = useState([]);
  const [successUpload, setSuccessUpload] = useState(false);

  const dispatch = useDispatch();
  const { user } = useUser();

  const { uploadFile: uploadFileData } = useSelector((state) => state.file);
  const { loading: uploadFileLoading } = uploadFileData;

  const handleUpload = (uploadUrl) => {
    files.forEach((file) => {
      const upload = new tus.Upload(file, {
        uploadUrl,
        retryDelays: [0, 3000, 5000, 10000, 20000],
        metadata: {
          filename: file.name,
          filetype: file.type,
        },
        onError: (error) => {
          console.error("Upload failed:", error);
          toast.error("Upload failed: " + error.message);
        },
        onProgress: (bytesUploaded, bytesTotal) => {
          const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
          console.log(`${bytesUploaded}/${bytesTotal} (${percentage}%)`);
        },
        onSuccess: () => {
          console.log("Uploaded", upload.file.name, "to", upload.url);
        },
      });

      upload.start();
    });
  };

  const addUploadItem = () => {
    const id = Date.now();
    const newItem = { id, name: "", size: "", type: "", isChecked: false };
    setUploadItems((prev) => [...prev, newItem]);
  };

  const removeUploadItem = (idToRemove) => {
    setUploadItems((prev) => prev.filter((item) => item.id !== idToRemove));
    setFiles((prev) =>
      prev.filter((_, idx) => uploadItems[idx]?.id !== idToRemove)
    );
  };

  const uploadFile = () => {
    if (files.length === 0) {
      toast.warn("No files selected.");
      return;
    }

    const filesData = [
      {
        id: 1753259261578,
        is_export: true,
        name: "Screenshot (1).png",
        size: 433256,
      },
    ];
    console.log(uploadItems);
    dispatch(uploadFileToServer({ file: uploadItems }))
      .then((res) => {
        const url = res?.payload?.files?.[0]?.tus_url;
        if (!url) throw new Error("Missing upload URL");
        handleUpload(url);

        toast.success("Files uploaded successfully");

        if (setVersionFiles) {
          const ids = res.payload?.files?.map((f) => f.media_id) || [];
          setVersionFiles(ids);
        }

        setSuccessUpload(true);
      })
      .catch((error) => {
        console.error("Upload preparation failed:", error);
        toast.error("Upload preparation failed");
      });
  };

  // useEffect(() => {
  //   console.log(uploadItems);
  // }, [uploadItems]);
  // useEffect(() => {
  //   console.log(files);
  // }, [files]);

  return (
    <div className="w-full flex flex-col gap-4 h-full">
      <button
        onClick={(e) => {
          e.preventDefault();
          addUploadItem();
        }}
        className="w-full flex items-center justify-between gap-2 p-2 h-[40px] bg-[var(--primary-add-file-bg)] radius text-[11px] border border-white/40 hover:bg-[var(--primary-add-file-bg)]/20 cursor-pointer"
      >
        <span>Select Files</span>
        <img className="w-[20px] h-[20px]" src="/icons/Add.svg" alt="Add" />
      </button>

      <div className="w-full max-h-[500px] bg-[var(--primary-color-light)]/20 radius p-4 flex flex-col gap-4 overflow-y-auto">
        {uploadItems.length > 0 &&
          uploadItems.map((item, index) => (
            <UploadFileItem
              key={item.id}
              id={item.id}
              index={index}
              userId={user?.id || null}
              uploadItems={uploadItems}
              setUploadItems={setUploadItems}
              removeUploadItem={removeUploadItem}
              files={files}
              setFiles={setFiles}
            />
          ))}
      </div>
      <CbuttonOne
        height="h-[40px] shrink-0 text-[10px] mt-auto border border-white/40 hover:!bg-[var(--secondary-normal)]/80"
        color="var(--secondary-normal)"
        type="submit"
        onClick={uploadFile}
        disabled={files.length === 0 || uploadFileLoading}
      >
        <span className="text-sm">
          {successUpload ? `${files.length} Files Uploaded` : "Upload Files"}
        </span>
        {uploadFileLoading && (
          <span className="text-sm ml-2">
            <FaSpinner className="animate-spin" />
          </span>
        )}
      </CbuttonOne>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme="dark"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
      />
    </div>
  );
};

export default UploadFileForm;
