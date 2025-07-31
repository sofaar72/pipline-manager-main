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

const MainContent = ({
  dataType,
  entityResults,

  entityError,
  setSearch,
  currentPage,
  setCurrentPage,
  selectEntityType,
  totalPages,
}) => {
  return (
    <>
      <MainContentVisibleData
        selectEntityType={selectEntityType}
        setSearch={setSearch}
        entityResults={entityResults}
        entityError={entityError}
        dataType={dataType}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </>
  );
};

export default MainContent;
