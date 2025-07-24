import React from "react";
import { EpisodeManagerProvider } from "../assets/context/EpisodeManagerContext";
import LayoutOne from "../layout/LayoutOne";

const ProjectsPage = () => {
  return (
    <EpisodeManagerProvider>
      <LayoutOne>
        <div className="w-full h-full text-white flex gap-[30px] flex-col lg:flex-row">
          Projects Page
        </div>
      </LayoutOne>
    </EpisodeManagerProvider>
  );
};

export default ProjectsPage;
