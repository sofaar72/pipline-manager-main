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
import { useNavigate } from "react-router-dom";

const MainContent = ({
  dataType,
  entityResults,
  entityLoading,
  entityError,
  setSearch,
  currentPage,
  setCurrentPage,
  selectEntityType,
  totalPages,
}) => {
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
          dataType={dataType}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
    </>
  );
};

export default MainContent;
