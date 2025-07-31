import { TusClientProvider } from "use-tus";
import { EpisodeManagerProvider } from "../assets/context/EpisodeManagerContext";
import { MultiFileUploader } from "../components/golbals/MultiFileUploader";
import LayoutOne from "../layout/LayoutOne";

const HomePage = () => {
  return (
    <TusClientProvider defaultOptions={{}}>
      <LayoutOne>
        <div className="w-full h-full text-white flex gap-[30px] flex-col lg:flex-row">
          {/* <MainContent />
          <FilesContent /> */}
          <MultiFileUploader />
        </div>
      </LayoutOne>
    </TusClientProvider>
  );
};

export default HomePage;
