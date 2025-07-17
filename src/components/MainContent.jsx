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
import { useTasks } from "../hooks/useTasks";

const MainContent = () => {
  const { selectedEntity, selectEntity, activeEntity, setActiveEntity } =
    useEpisodeManagerContext();

  const {
    entityResults,
    entityLoading,
    entityError,
    setSearch,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useEntities({
    selectedEntity,
  });
  const handleEntityClick = (id) => {
    setActiveEntity(id);
  };

  useEffect(() => {
    if (entityResults && entityResults.length > 0) {
      handleEntityClick(entityResults[0].id);
    }
  }, [entityResults]);

  return (
    <div className="w-full max-w-main h-full main-bg radius sec-padd-x sec-padd-y flex flex-col gap-[22px]">
      {/* Top controls */}
      <div className="w-full flex flex-col pb-[10px] gap-[20px] border-b border-white/10 ">
        <div className="w-full radius h-[40px] flex justify-between gap-2">
          <CdropDown
            options={[...entities]}
            init={"All"}
            select={selectEntity}
          />
          {/* {selectedEntity !== "Episodes" && (
            <CdropDown
              options={[...episodes]}
              init={"Episode 1"}
              select={filterByEpisode}
            />
          )} */}
        </div>
        <SearchTwo searchQuery={setSearch} loading={entityLoading} />
        <div className="w-1/2 radius h-[18px]">
          <span className="text-sm">{entityResults?.length} Items Found</span>
        </div>
      </div>

      {/* Entities List */}
      <div className="w-full h-full flex flex-col gap-[22px] overflow-y-auto custom-scrollbar pr-2">
        {entityLoading ? (
          <div className="w-full flex items-center justify-center">
            <Loading />
          </div>
        ) : entityError ? (
          <div className="w-full text-sm">No data found, please try again!</div>
        ) : (
          entityResults?.map((film) => (
            <EntityItem
              key={film.id}
              item={film}
              fetchTask={handleEntityClick}
              isActive={activeEntity === film.id}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default MainContent;
