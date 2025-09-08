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
import { useEntities } from "../../hooks/useEntities";
import { ToastContainer } from "react-toastify";

const CreateEntityForm = ({
  title = "Create Entity",
  titleSize = "h-xl",
  setCreateModal = () => {},
}) => {
  const { createFilmEntity, createLoading } = useEntities();
  const { fromSchema } = useEntityFormSchema();
  const initialValues = {
    name: "",
    project: {
      id: null,
      name: "",
    },
    type: {
      id: null,
      name: "",
    },
    metadata: "",
    location: "",
    start_frame: "",
    end_frame: "",
  };

  const { dataType } = useEpisodeManagerContext();
  const { projectsData } = useProject();

  const [project, setProject] = useState({
    id: projectsData[0]?.id,
    name: projectsData[0].name,
  });
  const entityTypes = [
    { name: "Episodes", id: "EP" },
    { name: "Sequence", id: "SQ" },
    { name: "Shot", id: "SH" },
    { name: "Asset", id: "AS" },
  ];
  const [type, setType] = useState({ name: "Episode", id: "EP" });

  const submitForm = (data) => {
    const newData = { ...data, project: project.id, type: type.id };
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
    createFilmEntity(cleanedData, setCreateModal);
  };

  return (
    <div className="w-full h-full  form-bg radius px-[10px] py-[20px] flex flex-col  justify-between gap-4 text-white">
      <h2 className={`flex ${titleSize} uppercase font-[600] `}>{title}</h2>
      {/* dvider  */}
      <div className="w-full h-[1px] bg-white/20"></div>

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
        }) => (
          <>
            <form
              className="w-full flex-1 flex flex-col gap-[20px] px-0 overflow-hidden "
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <label className="h-regular" htmlFor="name">
                Entity Name
              </label>
              <FormInputC
                name="name"
                type="text"
                placeholder="Enter your entity name"
                formValue={values.name}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={touched.entity_name && errors.entity_name}
              />
              {/* projects  */}
              <div className="relative z-20">
                <TheGlobalDropDown
                  selected={project?.name}
                  items={projectsData?.map((project) => ({
                    name: project?.name,
                    id: project?.id,
                  }))}
                  setItems={setProject}
                />
              </div>
              {/* types  */}
              <div className="relative z-10">
                <TheGlobalDropDown
                  selected={type?.name}
                  items={entityTypes}
                  setItems={setType}
                />
              </div>

              {/* locations  */}
              <FormInputC
                name="location"
                type="text"
                placeholder="Enter entity location"
                formValue={values.location}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={touched.location && errors.location}
              />
              <CbuttonOne
                height="h-[40px]"
                color="var(--primary-color-lowest)"
                type="submit"
                cClasses="mt-auto"
                loading={createLoading}
                disabled={createLoading}
              >
                Create Entity
              </CbuttonOne>
            </form>
          </>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default CreateEntityForm;
