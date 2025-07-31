import LayoutOne from "../layout/LayoutOne";
import MainContent from "../components/MainContent";
import FilesContent from "../components/FilesContent";
import {
  EpisodeManagerProvider,
  useEpisodeManagerContext,
} from "../assets/context/EpisodeManagerContext";
import { useEntities } from "../hooks/useEntities";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NoFileContent from "../components/golbals/PlaceHolders.jsx/NoFileContent";

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
  } = useEntities({});
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const path = pathname.split("/");
  const { setDataType, dataType, setGlobalActiveEntity } =
    useEpisodeManagerContext();

  useEffect(() => {
    fetchEntities();
  }, [search, currentPage, selectedEntityType]);

  useEffect(() => {
    if (entityResults && entityResults.length > 0) {
      navigateToDefaultEntity();
    }
  }, [entityResults]);

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
