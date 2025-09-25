import React, { useEffect, useRef, useState } from "react";
import CustomInput from "../../CustomInput";
import { FaCloudUploadAlt } from "react-icons/fa";
import UploadedItem from "./UploadedItem";
import TheButton from "../../TheButton";
import { Formik } from "formik";
import { useUploadFile } from "../../../../hooks/useUploadFile";
import Loading from "../../../golbals/Loading";
import TheIcon from "../../TheIcon";

const UploadFileForm = ({
  header = "Add File",
  versionId = null,
  taskId = null,

  openModal,
  setOpenModal,
  createVersion = false,
  setSuccess,
}) => {
  // const {} = useVersionFormSchema();

  const {
    uploadSmallSize,
    smallLoading,
    uploadLargeSize,
    uploadProgress,
    pauseUpload,
    resumeUpload,
    retryUpload,
    handleCreateVersion,
  } = useUploadFile();

  const [workfileItem, setWorkfileItem] = useState(null);
  const [resourceItems, setResourceItems] = useState([]);
  const [previewItems, setPreviewItems] = useState([]);
  const [exportItems, setExportItems] = useState([]);

  const initialValues = createVersion
    ? {
        file: [],
        task: taskId || null, // if creating a version, use task
        note: "",
      }
    : {
        file: [],
        version: versionId?.id, // otherwise use version
      };

  const chooseFile = (e, index, type) => {
    const file = e.target.files[0];
    const id = Date.now();
    if (!file) return;

    if (type === "preview") {
      setPreviewItems((prev) => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          name: file.name,
          size: `${(file.size / 1024).toFixed(2)} KB`,
          files: [...updated[index].files, file],
        };
        return updated;
      });
    } else if (type === "export") {
      setExportItems((prev) => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          name: file.name,
          size: `${(file.size / 1024).toFixed(2)} KB`,
          files: [...updated[index].files, file],
        };
        return updated;
      });
    } else if (type === "resource") {
      setResourceItems((prev) => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          name: file.name,
          size: `${(file.size / 1024).toFixed(2)} KB`,
          files: [...updated[index].files, file],
        };
        return updated;
      });
    } else if (type === "workfile") {
      setWorkfileItem({
        id: id,
        name: file.name,
        size: `${(file.size / 1024).toFixed(2)} KB`,
        files: [file],
        type: type,
      });
    }
  };

  const addSuffix = (e, index, type, suffix) => {
    if (type === "preview") {
      setPreviewItems((prev) => {
        const updated = [...prev];
        const currentName = updated[index]?.name || "";
        updated[index] = {
          ...updated[index],
          name: suffix + currentName, // ✅ use stored name
        };
        return updated;
      });
    } else if (type === "export") {
      setExportItems((prev) => {
        const updated = [...prev];
        const currentName = updated[index]?.name || "";
        updated[index] = {
          ...updated[index],
          name: suffix + currentName,
        };
        return updated;
      });
    } else if (type === "resource") {
      setResourceItems((prev) => {
        const updated = [...prev];
        const currentName = updated[index]?.name || "";
        updated[index] = {
          ...updated[index],
          name: suffix + currentName,
        };
        return updated;
      });
    }
  };

  const addUploadItem = (type) => {
    const id = Date.now();
    const newItem = {
      id,
      name: "",
      size: "",
      type: type,
      files: [],
    };
    if (type === "resource") {
      setResourceItems((prev) => [...prev, newItem]);
    } else if (type === "export") {
      setExportItems((prev) => [...prev, newItem]);
    } else if (type === "preview") {
      setPreviewItems((prev) => [...prev, newItem]);
    }
  };

  const removeUploadItem = (idToRemove, type) => {
    if (type === "resource") {
      setResourceItems((prev) => prev.filter((item) => item.id !== idToRemove));
    } else if (type === "export") {
      setExportItems((prev) => prev.filter((item) => item.id !== idToRemove));
    } else if (type === "preview") {
      setPreviewItems((prev) => prev.filter((item) => item.id !== idToRemove));
    } else if (type === "workfile") {
      setWorkfileItem(null);
      // setWorkfileItem((prev) => prev.filter((item) => item.id !== idToRemove));
    }

    // }
  };

  const submitForm = async (values) => {
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

    const smallFilesFormData = new FormData();
    const largeFilesFormData = [];

    const allItems = [...previewItems, ...exportItems, ...resourceItems].filter(
      (item) => item.name || item.size
    );

    allItems.forEach((item, index) => {
      item.files.forEach((file) => {
        const metadata = JSON.stringify({
          is_exported: item.type === "export",
          is_preview: item.type === "preview",
          is_resource: item.type === "resource",
          version: values.version ?? null,
        });

        if (file.size > MAX_FILE_SIZE) {
          // large files
          largeFilesFormData.push({
            file: file,
            name: file.name,
            size: file.size,
            version: values.version,
            is_exported: item.type === "export",
            is_preview: item.type === "preview",
            is_resource: item.type === "resource",
          });
        } else {
          // small files
          smallFilesFormData.append(`files_${index}`, file);
          smallFilesFormData.append(`metadata_${index}`, metadata);
        }
      });
    });

    try {
      // ✅ Send small files
      if ([...smallFilesFormData].length > 0) {
        await uploadSmallSize(smallFilesFormData);
      }

      // ✅ Send large files
      if (largeFilesFormData.length > 0) {
        await uploadLargeSize(largeFilesFormData);
      }

      // ✅ Clear items AFTER everything is done
      setPreviewItems([]);
      setExportItems([]);
      setResourceItems([]);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const submitVersionForm = async (values) => {
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

    const smallFilesFormData = new FormData();
    const largeFilesFormData = [];

    const allItems = [
      ...previewItems,
      ...exportItems,
      ...resourceItems,
      workfileItem,
    ].filter((item) => item?.name || item?.size);

    // console.log(allItems);

    // Build form data for small and large files
    allItems.forEach((item, index) => {
      item.files.forEach((file) => {
        const metadata = JSON.stringify({
          is_exported: item.type === "export",
          is_preview: item.type === "preview",
          is_resource: item.type === "resource",
          task: values.task ?? null,
        });

        if (file.size > MAX_FILE_SIZE) {
          // large files
          largeFilesFormData.push({
            file,
            name: file.name,
            size: file.size,
            task: values.task,
            is_exported: item.type === "export",
            is_preview: item.type === "preview",
            is_resource: item.type === "resource",
          });
        } else {
          // small files
          smallFilesFormData.append(`files_${index}`, file);
          smallFilesFormData.append(`metadata_${index}`, metadata);
        }
      });
    });

    try {
      let uploadedFileIds = [];

      // ✅ 1. Send small files
      if ([...smallFilesFormData].length > 0) {
        const smallFileIds = await uploadSmallSize(smallFilesFormData);
        uploadedFileIds = [...uploadedFileIds, ...smallFileIds];
      }

      // ✅ 2. Send large files
      if (largeFilesFormData.length > 0) {
        const largeFileIds = await uploadLargeSize(largeFilesFormData);
        uploadedFileIds = [...uploadedFileIds, ...largeFileIds];
      }

      // console.log({
      //   task: values.task,
      //   note: values.note || null,
      //   files: uploadedFileIds, // 🔑 associate uploaded files
      // });

      // ✅ 3. Create version AFTER uploads
      await handleCreateVersion(
        {
          task: values.task,
          note: values.note || null,
          files: uploadedFileIds, // 🔑 associate uploaded files
        },
        setOpenModal,
        setSuccess
      );

      // ✅ 4. Clear items AFTER everything is done
      setWorkfileItem(null);
      setPreviewItems([]);
      setExportItems([]);
      setResourceItems([]);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  // for uploading work files
  const uploadWorkfileRef = useRef(null);

  if (!createVersion) {
    return (
      <div
        className="w-[700px] h-fit px-[10px] py-[20px] radius bg-[var(--overview-color-one)] flex flex-col gap-2 justify-between transition"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full border-b-1 border-[var(--overview-color-three)]/80 h-lg text-bold text-white flex py-2">
          {header}
        </div>
        <Formik
          initialValues={{ ...initialValues }}
          enableReinitialize
          // validationSchema={fromSchema}
          onSubmit={submitForm}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => {
            return (
              <>
                {/* inputs  */}
                <form
                  className="w-full flex flex-1 flex-col gap-4"
                  onSubmit={handleSubmit}
                >
                  {/* version  */}
                  <CustomInput
                    label="Version"
                    onChange={() => {}}
                    type="text"
                    value={"Version" + " " + versionId?.name || ""}
                    inputClass={"!w-[100px]"}
                  />
                  {/* last comment  */}
                  {/* <CustomInput
                  name="description"
                  label="Last Comment"
                  onChange={handleChange}
                  type="description"
                  value={values.description}
                /> */}

                  {/* files wrappers  */}
                  <div className="w-full h-full flex gap-2 justify-between text-white mb-4">
                    <div className="w-1/3 h-full flex flex-col gap-2 ">
                      {/* preview title  */}
                      <TheButton
                        type="noting"
                        onClick={(e) => {
                          e.preventDefault();
                          addUploadItem("preview");
                        }}
                        className="h-small w-full h-[40px] p-2 flex items-center justify-between radius border-2 border-[var(--overview-color-three)] hover:bg-[var(--overview-color-three)] transition cursor-pointer"
                      >
                        <span>Preview Files</span>
                        {smallLoading ? (
                          <Loading size={"w-6 h-6"} />
                        ) : (
                          <FaCloudUploadAlt className="text-lg" />
                        )}
                      </TheButton>
                      {previewItems.length > 0 && (
                        <div className="w-full max-h-[300px] overflow-y-auto flex-1 border-2 border-[var(--overview-color-three)] radius px-2 py-4 flex flex-col gap-2">
                          {previewItems.map((item, i) => {
                            return (
                              <UploadedItem
                                name={item.name || ""}
                                size={item.size || ""}
                                type={item.type}
                                id={item.id}
                                index={i}
                                del={removeUploadItem}
                                choose={chooseFile}
                                addSuffix={addSuffix}
                                uploadProgress={uploadProgress}
                                pauseUpload={pauseUpload}
                                resumeUpload={resumeUpload}
                                retryUpload={retryUpload}
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>
                    <div className="w-1/3 h-full flex flex-col gap-2 ">
                      {/* export title  */}
                      <TheButton
                        type="noting"
                        onClick={(e) => {
                          e.preventDefault();
                          addUploadItem("export");
                        }}
                        className="h-small w-full h-[40px] p-2 flex items-center justify-between radius border-2 border-[var(--overview-color-three)] hover:bg-[var(--overview-color-three)] transition cursor-pointer"
                      >
                        <span>Export Files</span>
                        <FaCloudUploadAlt className="text-lg" />
                      </TheButton>
                      {exportItems.length > 0 && (
                        <div className="w-full max-h-[300px] overflow-y-auto flex-1 border-2 border-[var(--overview-color-three)] radius px-2 py-4 flex flex-col gap-2">
                          {exportItems.map((item, i) => {
                            return (
                              <UploadedItem
                                name={item.name || ""}
                                size={item.size || ""}
                                type={item.type}
                                id={item.id}
                                index={i}
                                del={removeUploadItem}
                                choose={chooseFile}
                                addSuffix={addSuffix}
                                uploadProgress={uploadProgress}
                                pauseUpload={pauseUpload}
                                resumeUpload={resumeUpload}
                                retryUpload={retryUpload}
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>
                    <div className="w-1/3 h-full flex flex-col gap-2 ">
                      {/* recource title  */}
                      <TheButton
                        type="noting"
                        onClick={(e) => {
                          e.preventDefault();
                          addUploadItem("resource");
                        }}
                        className="h-small w-full h-[40px] p-2 flex items-center justify-between radius border-2 border-[var(--overview-color-three)] hover:bg-[var(--overview-color-three)] transition cursor-pointer"
                      >
                        <span>Resource Files</span>
                        <FaCloudUploadAlt className="text-lg" />
                      </TheButton>
                      {resourceItems.length > 0 && (
                        <div className="w-full max-h-[300px] overflow-y-auto flex-1 border-2 border-[var(--overview-color-three)] radius px-2 py-4 flex flex-col gap-2">
                          {resourceItems.map((item, i) => {
                            return (
                              <UploadedItem
                                name={item.name || ""}
                                size={item.size || ""}
                                type={item.type}
                                id={item.id}
                                index={i}
                                del={removeUploadItem}
                                choose={chooseFile}
                                addSuffix={addSuffix}
                                uploadProgress={uploadProgress}
                                pauseUpload={pauseUpload}
                                resumeUpload={resumeUpload}
                                retryUpload={retryUpload}
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* actions  */}
                  <div className="w-full flex justify-end gap-2">
                    <TheButton
                      cClass="flex items-center justify-between gap-2 h-regular !bg-[var(--overview-color-done)]"
                      // onClick={() => {}}
                      type="submit"
                      loading={smallLoading}
                    >
                      <span>Create</span>
                    </TheButton>
                    <TheButton
                      cClass="flex items-center justify-between gap-2 h-regular "
                      type="cancel"
                      onClick={(e) => {
                        e.preventDefault;
                        setOpenModal(!openModal);
                      }}
                    >
                      <span>Cancel</span>
                    </TheButton>
                  </div>
                </form>
              </>
            );
          }}
        </Formik>
      </div>
    );
  } else {
    return (
      <div
        className="w-[700px] h-fit px-[10px] py-[20px] radius bg-[var(--overview-color-one)] flex flex-col gap-2 justify-between transition"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full border-b-1 border-[var(--overview-color-three)]/80 h-lg text-bold text-white flex py-2">
          {header}
        </div>
        <Formik
          initialValues={{ ...initialValues }}
          enableReinitialize
          // validationSchema={fromSchema}
          onSubmit={submitVersionForm}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => {
            return (
              <>
                {/* inputs  */}
                <form
                  className="w-full flex flex-1 flex-col gap-4"
                  onSubmit={handleSubmit}
                >
                  {/* version  */}
                  <CustomInput
                    label="Task"
                    onChange={() => {}}
                    type="text"
                    value={"task" + " " + taskId || ""}
                    inputClass={"!w-[100px]"}
                  />
                  {/* Note  */}
                  <CustomInput
                    name="note"
                    label="Note"
                    onChange={handleChange}
                    value={values.note}
                    type="description"
                  />
                  {/* Work file  */}
                  <div className="w-full h-full flex gap-2 justify-between text-white ">
                    <div className="basis-1/3 flex-none">
                      <TheButton
                        type="noting"
                        onClick={(e) => {
                          e.preventDefault();
                          uploadWorkfileRef.current.click();
                        }}
                        cClass="h-sm w-full h-[40px] p-2 flex items-center justify-between radius hover:bg-[var(--overview-color-three)] transition cursor-pointer"
                      >
                        <span>Upload Work Files</span>
                        {smallLoading ? (
                          <Loading size={"w-6 h-6"} />
                        ) : (
                          <FaCloudUploadAlt className="text-lg" />
                        )}
                      </TheButton>
                      <input
                        ref={uploadWorkfileRef}
                        type="file"
                        className="hidden"
                        onChange={(e) => chooseFile(e, 1, "workfile")}
                      />
                    </div>
                    {workfileItem && (
                      <div className="basis-2/3 overflow-y-auto   flex flex-col gap-2 ">
                        <UploadedItem
                          name={workfileItem.name || ""}
                          size={workfileItem.size || ""}
                          type={workfileItem.type}
                          id={workfileItem.id}
                          del={removeUploadItem}
                          choose={chooseFile}
                          addSuffix={addSuffix}
                          uploadProgress={uploadProgress}
                          pauseUpload={pauseUpload}
                          resumeUpload={resumeUpload}
                          retryUpload={retryUpload}
                        />
                      </div>
                    )}
                  </div>
                  {/* files wrappers  */}
                  <div className="w-full h-full flex gap-2 justify-between text-white mb-4">
                    <div className="w-1/3 h-full flex flex-col gap-2 flex-none">
                      {/* preview title  */}
                      <TheButton
                        type="noting"
                        onClick={(e) => {
                          e.preventDefault();
                          addUploadItem("preview");
                        }}
                        className="h-small w-full h-[40px] p-2 flex items-center justify-between radius border-2 border-[var(--overview-color-three)] hover:bg-[var(--overview-color-three)] transition cursor-pointer"
                      >
                        <span>Preview Files</span>
                        {smallLoading ? (
                          <Loading size={"w-6 h-6"} />
                        ) : (
                          <FaCloudUploadAlt className="text-lg" />
                        )}
                      </TheButton>
                      {previewItems.length > 0 && (
                        <div className="w-full max-h-[300px] overflow-y-auto flex-1 border-2 border-[var(--overview-color-three)] radius px-2 py-4 flex flex-col gap-2">
                          {previewItems.map((item, i) => {
                            return (
                              <UploadedItem
                                name={item.name || ""}
                                size={item.size || ""}
                                type={item.type}
                                id={item.id}
                                index={i}
                                del={removeUploadItem}
                                choose={chooseFile}
                                addSuffix={addSuffix}
                                uploadProgress={uploadProgress}
                                pauseUpload={pauseUpload}
                                resumeUpload={resumeUpload}
                                retryUpload={retryUpload}
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>
                    <div className="w-1/3 h-full flex flex-col gap-2 flex-none">
                      {/* export title  */}
                      <TheButton
                        type="noting"
                        onClick={(e) => {
                          e.preventDefault();
                          addUploadItem("export");
                        }}
                        className="h-small w-full h-[40px] p-2 flex items-center justify-between radius border-2 border-[var(--overview-color-three)] hover:bg-[var(--overview-color-three)] transition cursor-pointer"
                      >
                        <span>Export Files</span>
                        <FaCloudUploadAlt className="text-lg" />
                      </TheButton>
                      {exportItems.length > 0 && (
                        <div className="w-full max-h-[300px] overflow-y-auto flex-1 border-2 border-[var(--overview-color-three)] radius px-2 py-4 flex flex-col gap-2">
                          {exportItems.map((item, i) => {
                            return (
                              <UploadedItem
                                name={item.name || ""}
                                size={item.size || ""}
                                type={item.type}
                                id={item.id}
                                index={i}
                                del={removeUploadItem}
                                choose={chooseFile}
                                addSuffix={addSuffix}
                                uploadProgress={uploadProgress}
                                pauseUpload={pauseUpload}
                                resumeUpload={resumeUpload}
                                retryUpload={retryUpload}
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>
                    <div className="w-1/3 h-full flex flex-col gap-2 ">
                      {/* recource title  */}
                      <TheButton
                        type="noting"
                        onClick={(e) => {
                          e.preventDefault();
                          addUploadItem("resource");
                        }}
                        className="h-small w-full h-[40px] p-2 flex items-center justify-between radius border-2 border-[var(--overview-color-three)] hover:bg-[var(--overview-color-three)] transition cursor-pointer"
                      >
                        <span>Resource Files</span>
                        <FaCloudUploadAlt className="text-lg" />
                      </TheButton>
                      {resourceItems.length > 0 && (
                        <div className="w-full max-h-[300px] overflow-y-auto flex-1 border-2 border-[var(--overview-color-three)] radius px-2 py-4 flex flex-col gap-2">
                          {resourceItems.map((item, i) => {
                            return (
                              <UploadedItem
                                name={item.name || ""}
                                size={item.size || ""}
                                type={item.type}
                                id={item.id}
                                index={i}
                                del={removeUploadItem}
                                choose={chooseFile}
                                addSuffix={addSuffix}
                                uploadProgress={uploadProgress}
                                pauseUpload={pauseUpload}
                                resumeUpload={resumeUpload}
                                retryUpload={retryUpload}
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* actions  */}
                  <div className="w-full flex justify-end gap-2">
                    <TheButton
                      cClass="flex items-center justify-between gap-2 h-regular !bg-[var(--overview-color-done)]"
                      // onClick={() => {}}
                      type="submit"
                      loading={smallLoading}
                    >
                      <span>Create</span>
                    </TheButton>
                    <TheButton
                      cClass="flex items-center justify-between gap-2 h-regular "
                      type="cancel"
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenModal(!openModal);
                      }}
                    >
                      <span>Cancel</span>
                    </TheButton>
                  </div>
                </form>
              </>
            );
          }}
        </Formik>
      </div>
    );
  }
};

export default UploadFileForm;
