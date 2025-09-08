import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import CbuttonOne from "../golbals/Buttons/CbuttonOne";
import { useEpisodeManagerContext } from "../../assets/context/EpisodeManagerContext";
import FormInputC from "../golbals/FormInputC";
import TheGlobalDropDown from "../golbals/TheGlobalDropDown";
import { useProject } from "../../hooks/useProject";
import { useTypes } from "../../hooks/useTypes";
import Loading from "../golbals/Loading";
import { useEntityFormSchema } from "../../hooks/useFormSchema";

import { ToastContainer } from "react-toastify";
import CustomInput from "./CustomInput";
import TheButton from "./TheButton";
import TheDropDown from "./TheDropDown";
import { entities as EntTypes } from "../../fakeContents/Entities";
import { useEntities } from "../../hooks/useEntities";

const CreateEntityForm = ({
  header = "Create Entity",
  setCreateModal = () => {},
  selectedProject = { id: null, name: "" },
  fetchData = () => {},
}) => {
  const { createFilmEntity, createLoading } = useEntities();
  const { fromSchema } = useEntityFormSchema();

  const initialValues = {
    name: "",
    project: {
      id: selectedProject.id,
      name: selectedProject.name,
    },
    type: {
      id: "EP",
      name: "Episode",
    },
    description: "test",
    // episode: {
    //   id: selectedEpisode.id,
    //   name: selectedEpisode.name,
    // },
    // metadata: "",
    // location: "",
    // start_frame: "",
    // end_frame: "",
  };

  const submitForm = (values) => {
    console.log("Form values:", values);
    const newData = {
      ...values,
      project: values.project.id,
      type: values.type.id,
    };
    // Remove empty, null, or undefined values
    const cleanedData = Object.fromEntries(
      Object.entries(newData).filter(
        ([_, value]) =>
          value !== undefined &&
          value !== null &&
          value !== "" &&
          !(typeof value === "object" && Object.keys(value).length === 0)
      )
    );

    const fetchEntities = () => {
      fetchData(selectedProject, values.type);
    };
    createFilmEntity(cleanedData, setCreateModal, fetchEntities);
  };

  return (
    <>
      {/* show the toasts  */}
      <ToastContainer />
      <div
        className="w-[700px] h-fit px-[10px] py-[20px] radius bg-[var(--overview-color-one)] flex flex-col gap-[20px] justify-between transition"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full border-b-1 border-[var(--overview-color-three)]/80 h-lg text-bold text-white flex py-2">
          {header}
        </div>
        <Formik
          initialValues={{ ...initialValues }}
          validationSchema={fromSchema}
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
            // Handler function that updates Formik's values
            const handleTypeChange = (selectedType) => {
              setFieldValue("type", {
                id: selectedType.id,
                name: selectedType.name,
              });
            };
            return (
              <>
                <form
                  className="w-full flex-1 flex flex-col gap-[10px] px-0 overflow-hidden h-lg text-white"
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                >
                  {/* inputs  */}
                  <div className="w-full flex flex-1 flex-col gap-4 mb-40">
                    {/* entity name  */}
                    <CustomInput
                      name="name"
                      label="Entity Name"
                      onChange={handleChange}
                      type="text"
                      inputClass="w-full !h-[40px]"
                      value={values.name}
                      // handleBlur={handleBlur}
                      // error={touched.entity_name && errors.entity_name}
                    />
                    {/* entity description  */}
                    <CustomInput
                      name="description"
                      label="Description"
                      onChange={handleChange}
                      type="description"
                      inputClass="w-full"
                      placeholder="Description ..."
                      value={values.description}
                    />
                    <div className="w-fit">
                      <TheDropDown
                        init={values.type.name}
                        items={
                          EntTypes.filter((ent) => ent !== "All").map(
                            (ent, i) => {
                              let prefix = "";

                              if (ent === "Episode") prefix = "EP";
                              else if (ent === "Shot") prefix = "SH";
                              else if (ent === "Sequence") prefix = "SQ";

                              return {
                                id: prefix,
                                name: ent,
                              };
                            }
                          ) || []
                        }
                        width={"w-[120px]"}
                        funcAfter={handleTypeChange}
                      />
                    </div>
                  </div>

                  {/* actions  */}
                  <div className="w-full flex justify-end gap-2">
                    <TheButton
                      cClass="w-fit !flex !items-center !justify-between gap-2 h-regular !bg-[var(--overview-color-done)]"
                      // onClick={() => {}}
                      loading={createLoading}
                      type="submit"
                    >
                      <span>Create</span>
                    </TheButton>
                    <TheButton
                      cClass="flex items-center justify-between gap-2 h-regular "
                      onClick={(e) => {
                        e.preventDefault();
                        setCreateModal(false);
                      }}
                      type=""
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
    </>
  );
};

export default CreateEntityForm;
