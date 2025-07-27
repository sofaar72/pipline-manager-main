import React from "react";
import { EpisodeManagerProvider } from "../../assets/context/EpisodeManagerContext";
import LayoutOne from "../../layout/LayoutOne";
import CreateProjectForm from "../../components/projects/CreateProjectForm";

const CreateProjectPage = () => {
  return (
    <div className="w-full h-full text-white flex gap-[30px] flex-col lg:flex-row overflow-hidden">
      <CreateProjectForm />
    </div>
  );
};

export default CreateProjectPage;
