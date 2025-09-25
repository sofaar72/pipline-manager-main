import React, { useState } from "react";
import CreateAssetForm from "../CreateAssetForm";
import CreateVariationForm from "../CreateVariationForm";
import { useVariations } from "../../../hooks/useVariations";
import { ToastContainer } from "react-toastify";

const CreateAssetModal = ({ setCreateAssetModal, selectedProject }) => {
  const [step, setStep] = useState("1");
  const [head, setHead] = useState(null);

  return (
    <div className="w-fit h-fit " onClick={(e) => e.stopPropagation()}>
      {/* show the toasts  */}
      <ToastContainer autoClose={5000} />
      {step === "1" ? (
        <CreateAssetForm
          setCreateModal={setCreateAssetModal}
          selectedProject={selectedProject}
          setStep={setStep}
          setHead={setHead}
        />
      ) : (
        <CreateVariationForm
          setCreateModal={setCreateAssetModal}
          selectedProject={selectedProject}
          head={head}
        />
      )}
    </div>
  );
};

export default CreateAssetModal;
