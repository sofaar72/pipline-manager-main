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
import TheIcon from "./TheIcon";
import { FaPlus } from "react-icons/fa";
import { useVariations } from "../../hooks/useVariations";
import { useAssets } from "../../hooks/useAssets";

const CreateVariationForm = ({
  header = "Select Variation",
  setCreateModal = () => {},
  selectedProject = { id: null, name: "" },
  head,
}) => {
  const {
    createTheVariation,
    createResults,
    createLoading,
    createError,
    fetchAllVariation,
    variationResults,
    variationLoading,
  } = useVariations();

  const [variations, setVariations] = useState([]);

  const { fromSchema } = useEntityFormSchema();

  const initialValues = {
    name: "",
  };

  const submitForm = async (values) => {
    // const newData = {
    //   ...values,
    //   head: head,
    // };
  };

  useEffect(() => {
    fetchAllVariation();
    // console.log("result");
  }, [createResults]);

  return (
    <>
      {/* show the toasts  */}
      {/* <ToastContainer style={{ zIndex: 9999999999999999999999999999 }} /> */}
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
            const createAVariation = async () => {
              const newData = {
                ...values,
                head: head,
              };
              // Remove empty, null, or undefined values
              const cleanedData = Object.fromEntries(
                Object.entries(newData).filter(
                  ([_, value]) =>
                    value !== undefined &&
                    value !== null &&
                    value !== "" &&
                    !(
                      typeof value === "object" &&
                      Object.keys(value).length === 0
                    )
                )
              );
              await createTheVariation(cleanedData, setCreateModal).then(
                (res) => setFieldValue("name", "")
              );
            };

            return (
              <>
                <form
                  className="w-full flex-1 flex flex-col gap-[10px] px-0 overflow-hidden h-lg text-white"
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                >
                  {/* inputs  */}
                  <div className="w-full flex flex-1 flex-col gap-4 mb-20">
                    <div className="w-full  flex items-end gap-2">
                      <CustomInput
                        name="name"
                        label="Create Variation"
                        onChange={handleChange}
                        type="text"
                        inputClass="w-full !h-[40px]"
                        value={values.name}
                      />
                      {/* <TheIcon
                        cClass="!h-[40px] !w-[40px]"
                        onClick={createAVariation}
                      >
                        {createLoading ? (
                          <Loading size={"w-8 h-8"} />
                        ) : (
                          <FaPlus />
                        )}
                      </TheIcon> */}
                    </div>

                    {/* Variations  */}

                    <div className="w-full h-full flex-1 flex flex-col gap-2 py-2  ">
                      <span>Asset Variations List</span>
                      <div className="w-full max-h-[150px] flex-1   border-2 border-[var(--overview-color-four)] radius grid grid-cols-1 gap-2 p-2 overflow-y-auto">
                        {variationLoading ? (
                          <Loading />
                        ) : (
                          <>
                            {variationResults.map((variation) => {
                              return (
                                <div className="w-full bg-[var(--overview-color-two)] h-fit px-4 py-2 radius">
                                  {variation.name}
                                </div>
                              );
                            })}
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* actions  */}
                  <div className="w-full flex justify-end gap-2">
                    <TheButton
                      cClass="w-fit !flex !items-center !justify-between gap-2 h-regular !bg-[var(--overview-color-done)]"
                      onClick={(e) => {
                        e.preventDefault();
                        createAVariation();
                      }}
                      loading={createLoading}
                      // type="submit"
                    >
                      <span>Create Variation</span>
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

export default CreateVariationForm;
