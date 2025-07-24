import React, { useCallback, useEffect, useState } from "react";
import UploadFileItem from "./UploadFileItem";
import CbuttonOne from "../golbals/Buttons/CbuttonOne";
import { uploadFileToServer } from "../../store/Slices/FileSlice";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "../../hooks/useUser";

import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { useTus } from "use-tus";
import * as tus from "tus-js-client";

const UploadFileForm = ({ setVersionFiles = () => {} }) => {
  const [uploadItems, setUploadItems] = useState([]);
  const [fileDatas, setFileDatas] = useState([]);
  const [files, setFiles] = useState([]);
  const [tusUrl, setTusUrl] = useState(null);
  const { user } = useUser();
  const [successUpload, setSuccessUpload] = useState(false);

  const handleUpload = (uploadUrl) => {
    files.forEach((file) => {
      const upload = new tus.Upload(file, {
        uploadUrl: uploadUrl, // Use existing upload URL
        retryDelays: [0, 3000, 5000, 10000, 20000],
        metadata: {
          filename: file.name,
          filetype: file.type,
        },
        onError: (error) => {
          console.error("Failed:", error);
        },
        onProgress: (bytesUploaded, bytesTotal) => {
          const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
          console.log(`${bytesUploaded}/${bytesTotal} (${percentage}%)`);
        },
        onSuccess: () => {
          console.log("Download %s from %s", upload.file.name, upload.url);
        },
      });

      upload.start(); // Will only send PATCH to the uploadUrl
    });
  };

  // TUS END

  const dispatch = useDispatch();
  const {
    uploadFile: uploadFileData,

    uploadFileError,
  } = useSelector((state) => state.file);

  const { loading: uploadFileLoading } = uploadFileData;

  // Only initialize useTus when we have both tusUrl and files

  const addUploadItem = (file) => {
    const newFiles = [...(uploadItems || []), file];
    setUploadItems(newFiles);
    // setSuccessUpload(false);
    // setFileDatas([]);
  };

  const removeUploadItem = (id, setFile) => {
    const newFiles = uploadItems.filter((it, i) => it.id !== id);

    console.log(newFiles);
    setUploadItems(newFiles);
    setFileDatas((prev) => prev.filter((file) => file.id !== id));
    setFiles((prev) => prev.filter((_, i) => uploadItems[i]?.id !== id));
  };

  useEffect(() => {
    console.log(uploadItems);
  }, [uploadItems]);

  const uploadFile = () => {
    dispatch(uploadFileToServer({ file: fileDatas }))
      .then((res) => {
        const url = res?.payload?.files[0]?.tus_url;
        handleUpload(url);
        toast.success("Files uploaded successfully");
        if (setVersionFiles) {
          setVersionFiles(
            res?.payload?.files.map((file) => file.media_id) || []
          );
        }

        // if (url && files.length > 0) {
        //   setTusUrl(url);
        //   // Small delay to ensure state is updated
        //   setTimeout(() => {
        //     handleSetUpload();
        //     handleStart();
        //   }, 100);
        // } else {
        //   toast.error("Failed to get upload URL or no files selected");
        // }

        // Clear the form data after getting the URL
        // setFileDatas([]);
        // setUploadItems([]);
      })
      .then(() => {
        setSuccessUpload(true);
      })
      .catch((error) => {
        console.error("Upload to server failed:", error);
        toast.error("Failed to prepare upload");
      });
  };

  useEffect(() => {
    console.log(uploadFileLoading);
  }, [uploadFileLoading]);

  return (
    <div className="w-full flex flex-col gap-4 h-full ">
      {/* add file item  */}

      <button
        onClick={() =>
          addUploadItem({
            id: Date.now(),
            name: "",
            type: "",
            isChecked: false,
          })
        }
        className="w-full flex items-center justify-center h-[40px] flex justify-between gap-2 p-2 bg-[var(--primary-add-file-bg)] radius text-[11px] relative border transition hover:bg-[var(--primary-add-file-bg)]/20 border-white/40 cursor-pointer"
      >
        <span>Select Files</span>
        <img
          className="w-[20px] h-[20px] object-contain"
          src="/icons/Add.svg"
          alt=""
        />
      </button>

      <div className="w-full h-full max-h-[500px] bg-[var(--primary-color-light)]/20 radius px-4 py-4 flex flex-col gap-4 overflow-y-auto  ">
        {uploadItems.length > 0 && (
          <div className="w-full flex-1 h-full bg-[var(--primary-color-light)]/20 radius px-4 py-4 flex flex-col gap-2 overflow-y-auto">
            {/* file item  */}
            {uploadItems.map((item, index) => (
              <UploadFileItem
                userId={user ? user.id : null}
                key={index}
                index={index}
                id={item.id}
                removeUploadItem={removeUploadItem}
                fileDatas={fileDatas}
                setFileDatas={setFileDatas}
                files={files}
                setFiles={setFiles}
                setUploadItems={setUploadItems}
              />
            ))}
          </div>
        )}

        {/* Show upload progress */}
        {/* {isLoading && (
            <div className="w-full p-2 bg-blue-500/20 rounded text-center">
              <span className="text-sm">Uploading via TUS...</span>
            </div>
          )} */}

        <CbuttonOne
          height="h-[40px] text-[10px] mt-auto border border-white/40 hover:!bg-[var(--secondary-normal)]/80"
          color="var(--secondary-normal)"
          type="submit"
          onClick={uploadFile}
          disabled={fileDatas.length === 0 || uploadFileLoading}
        >
          <span className="text-sm">
            {successUpload ? files.length + " Files Uploaded" : "Upload Files"}
          </span>
          {uploadFileLoading && (
            <span className="text-sm">
              <FaSpinner className="animate-spin" />
            </span>
          )}
        </CbuttonOne>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        theme="dark"
      />
    </div>
  );
};

export default UploadFileForm;
