import LayoutOne from "../layout/LayoutOne";
import MainContent from "../components/MainContent";
import FilesContent from "../components/FilesContent";
import {
  EpisodeManagerProvider,
  useEpisodeManagerContext,
} from "../assets/context/EpisodeManagerContext";
import { useEntities } from "../hooks/useEntities";
import { useEffect, useLayoutEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NoFileContent from "../components/golbals/PlaceHolders.jsx/NoFileContent";
import { useAssets } from "../hooks/useAssets";

const AssetsTaskManager = () => {
  const {
    assetResults,
    assetLoading,
    assetError,
    setSearch,
    currentPage,
    setCurrentPage,
    totalPages,
    fetchAllAssets,
    search,
    selectAssetType,
    selectedAssetType,
    variationId,
    setVariationId,
    navigateToDefaultEntity,
  } = useAssets();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const path = pathname.split("/");
  const { setDataType, dataType, setGlobalActiveEntity } =
    useEpisodeManagerContext();

  useEffect(() => {
    fetchAllAssets();
  }, [search, currentPage, selectedAssetType]);

  useEffect(() => {
    if (assetResults && assetResults.length > 0) {
      navigateToDefaultEntity();
    }
  }, [assetResults]);

  useEffect(() => {
    setDataType("assets");
  }, [dataType]);

  return (
    <LayoutOne>
      <div className="w-full h-full text-white flex gap-[30px] flex-col lg:flex-row">
        <MainContent
          dataType={dataType}
          entityResults={assetResults}
          entityLoading={assetLoading}
          entityError={assetError}
          setSearch={setSearch}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          selectEntityType={selectAssetType}
          totalPages={totalPages}
          selectedEntityType={selectedAssetType}
          variationId={variationId}
          setVariationId={setVariationId}
        />
        <Outlet />
        {/* <NoFileContent /> */}
        {/* {entityResults.length === 0 && <FilesContent />} */}
      </div>
    </LayoutOne>
  );
};

export default AssetsTaskManager;
