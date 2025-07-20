import LayoutOne from "../layout/LayoutOne";
import MainContent from "../components/MainContent";
import FilesContent from "../components/FilesContent";
import { EpisodeManagerProvider } from "../assets/context/EpisodeManagerContext";
import { useEntities } from "../hooks/useEntities";
import { useEffect } from "react";

const TaskManager = () => {
  const { entityResults } = useEntities();

  return (
    <EpisodeManagerProvider>
      <LayoutOne>
        <div className="w-full h-full text-white flex gap-[30px] flex-col lg:flex-row">
          <MainContent />
          {entityResults.length > 0 && <FilesContent />}
        </div>
      </LayoutOne>
    </EpisodeManagerProvider>
  );
};

export default TaskManager;
