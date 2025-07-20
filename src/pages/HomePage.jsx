import { EpisodeManagerProvider } from "../assets/context/EpisodeManagerContext";
import LayoutOne from "../layout/LayoutOne";

const HomePage = () => {
  return (
    <EpisodeManagerProvider>
      <LayoutOne>
        <div className="w-full h-full text-white flex gap-[30px] flex-col lg:flex-row">
          {/* <MainContent />
          <FilesContent /> */}
        </div>
      </LayoutOne>
    </EpisodeManagerProvider>
  );
};

export default HomePage;
