import React, { useEffect, useState } from "react";
import EntityItem from "./golbals/EntityItem";
import CbuttonTwo from "./golbals/Buttons/CbuttonTwo";
import CdropDown from "./golbals/CdropDown";
import SearchTwo from "./golbals/SearchTwo";
import { entities, episodes } from "../fakeContents/Entities";
import { useEpisodeManagerContext } from "../assets/context/EpisodeManagerContext";
import Loading from "./golbals/Loading";
import Pagination from "./golbals/Pagination";

import { useEntities } from "../hooks/useEntities";
import MainContentVisibleData from "./taskmanager/MainContentVisibleData";
import MainContentPrev from "./golbals/PlaceHolders.jsx/MainContentPrev";

const MainContent = () => {
  const {
    entityResults,
    entityLoading,
    entityError,
    setSearch,
    currentPage,
    setCurrentPage,
    totalPages,
    fetchEntities,
    fetchEntityTasks,
    search,
    activeEntity,
    selectEntityType,
    selectedEntityType,
  } = useEntities();
  const { setGlobalActiveEntity } = useEpisodeManagerContext();

  useEffect(() => {
    fetchEntities();
  }, [search, currentPage, selectedEntityType]);

  useEffect(() => {
    if (entityResults && entityResults.length > 0) {
      fetchEntityTasks(entityResults[0].id);
    }
  }, [entityResults]);

  useEffect(() => {
    setGlobalActiveEntity(activeEntity);
  }, [activeEntity]);

  return (
    <>
      {entityLoading ? (
        <MainContentPrev />
      ) : (
        <MainContentVisibleData
          selectEntityType={selectEntityType}
          setSearch={setSearch}
          entityResults={entityResults}
          entityLoading={entityLoading}
          entityError={entityError}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          fetchEntityTasks={fetchEntityTasks}
          activeEntity={activeEntity}
        />
      )}
    </>
  );
};

export default MainContent;
