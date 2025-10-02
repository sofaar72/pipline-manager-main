import React, { useState } from "react";
import CreateAssetForm from "../CreateAssetForm";
import CreateVariationForm from "../CreateVariationForm";
import { useVariations } from "../../../hooks/useVariations";

const CreateAssetModal = ({ setCreateAssetModal, selectedProject }) => {
  const [step, setStep] = useState("1");
  const [head, setHead] = useState(null);

  return (
    <div className="w-fit h-fit " onClick={(e) => e.stopPropagation()}>
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
