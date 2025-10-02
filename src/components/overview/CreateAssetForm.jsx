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

import CustomInput from "./CustomInput";
import TheButton from "./TheButton";
import TheDropDown from "./TheDropDown";
import { entities as EntTypes } from "../../fakeContents/Entities";
import { useEntities } from "../../hooks/useEntities";
import TheIcon from "./TheIcon";
import { FaPlus } from "react-icons/fa";
import { useVariations } from "../../hooks/useVariations";
import { useAssets } from "../../hooks/useAssets";

const CreateAssetForm = ({
  header = "Create Asset",
  setCreateModal = () => {},
  selectedProject = { id: null, name: "" },
  fetchData = () => {},
  setStep = () => {},
  setHead = () => {},
}) => {
  const {
    createTheAsset,
    createAssetLoading,
    createAssetResults,
    fetchAllAssetTypes,
    assetTypeLoading,
    AssetTypeResults,
  } = useAssets();

  const { fromSchema } = useEntityFormSchema();

  const initialValues = {
    name: "",
    project: {
      id: selectedProject.id,
      name: selectedProject.name,
    },
    description: "test",
    asset_type: { id: null, name: "types" },
  };

  useEffect(() => {
    // console.log("fetch assets");
    // get assetTypes
    fetchAllAssetTypes();
  }, []);
  useEffect(() => {
    // set assetTypes
  }, []);

  const submitForm = async (values) => {
    // console.log("Form values:", values);
    const newData = {
      name: values.name,
      project: values.project.id,
      description: values.description,
      asset_type: values.asset_type.id,

      // type: values.type.id,
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

    // console.log(cleanedData);

    // const fetchEntities = () => {
    //   fetchData(selectedProject, values.type);
    // };
    createTheAsset(cleanedData, setStep, setHead);
  };

  useEffect(() => {
    // setCreateModal(false);
  }, [createAssetResults]);

  return (
    <>
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
            const handleTypeChange = (selected) => {
              setFieldValue("asset_type", {
                id: selected.id,
                name: selected.name,
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
                      label="Asset Name"
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
                    {/* Asset types  */}
                    <div className="w-fit flex flex-col items-start gap-2 h-regular">
                      <span> Select Type</span>
                      <TheDropDown
                        init={values.asset_type.name}
                        items={AssetTypeResults?.map((type) => {
                          return {
                            id: type.id,
                            name: type.name,
                          };
                        })}
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
                      loading={createAssetLoading}
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

export default CreateAssetForm;
