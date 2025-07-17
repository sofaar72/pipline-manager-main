import LayoutOne from "../layout/LayoutOne";
import MainContent from "../components/MainContent";
import FilesContent from "../components/FilesContent";
import { EpisodeManagerProvider } from "../assets/context/EpisodeManagerContext";

const TaskManager = () => {
  return (
    <EpisodeManagerProvider>
      <LayoutOne>
        <div className="w-full h-full text-white flex gap-[30px] flex-col lg:flex-row">
          <MainContent />
          <FilesContent />
        </div>
      </LayoutOne>
    </EpisodeManagerProvider>
  );
};

export default TaskManager;
