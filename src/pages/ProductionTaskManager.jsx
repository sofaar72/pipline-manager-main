import LayoutOne from "../layout/LayoutOne";
import MainContent from "../components/MainContent";
import FilesContent from "../components/FilesContent";
import {
  EpisodeManagerProvider,
  useEpisodeManagerContext,
} from "../assets/context/EpisodeManagerContext";
import { useEntities } from "../hooks/useEntities";
import { useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import NoFileContent from "../components/golbals/PlaceHolders.jsx/NoFileContent";
import { useProject } from "../hooks/useProject";
import { useSelector } from "react-redux";

const ProductionTaskManager = () => {
  const {
    entityResults,
    entityError,
    setSearch,
    currentPage,
    setCurrentPage,
    totalPages,
    fetchEntities,
    search,
    selectEntityType,
    selectedEntityType,
    navigateToDefaultEntity,
    isEntityInCurrentPage,
    perPage,
  } = useEntities({});
  const { selectedProject } = useSelector((state) => state.project);
  // send the state

  const location = useLocation();
  const pathname = location.pathname;
  const state = location.state;
  const path = pathname.split("/");
  const { setDataType, dataType, setGlobalActiveEntity } =
    useEpisodeManagerContext();

  const { id } = useParams();

  useEffect(() => {
    fetchEntities();
  }, [search, selectedEntityType, selectedProject]);

  useEffect(() => {
    if (!state?.fromPreview && entityResults && entityResults.length > 0) {
      navigateToDefaultEntity();
    }
  }, [entityResults]);

  // useEffect(() => {
  //   if (currentPage > 1) {
  //     navigateToDefaultEntity();
  //   }
  // }, [entityResults, currentPage]);

  useEffect(() => {
    setDataType("production");
  }, [dataType]);

  return (
    <EpisodeManagerProvider>
      <LayoutOne>
        <div className="w-full h-full text-white flex gap-[30px] flex-col lg:flex-row">
          <MainContent
            dataType={dataType}
            entityResults={entityResults}
            entityError={entityError}
            setSearch={setSearch}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            selectEntityType={selectEntityType}
            totalPages={totalPages}
            selectedEntityType={selectedEntityType}
          />
          <Outlet />
          {/* <NoFileContent /> */}
          {/* {entityResults.length === 0 && <FilesContent />} */}
        </div>
      </LayoutOne>
    </EpisodeManagerProvider>
  );
};

export default ProductionTaskManager;
