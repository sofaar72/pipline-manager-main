import React from "react";
import { EpisodeManagerProvider } from "../../assets/context/EpisodeManagerContext";
import LayoutOne from "../../layout/LayoutOne";
import { Outlet } from "react-router-dom";

const ProjectsPage = () => {
  return (
    <EpisodeManagerProvider>
      <LayoutOne>
        <Outlet />
      </LayoutOne>
    </EpisodeManagerProvider>
  );
};

export default ProjectsPage;
