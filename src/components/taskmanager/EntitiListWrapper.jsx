import React, { useEffect } from "react";
import EntityItem from "../golbals/EntityItem";
import { useEntities } from "../../hooks/useEntities";
import { useLocation } from "react-router-dom";
import Loading from "../golbals/Loading";

const EntitiListWrapper = ({
  entityError,
  entityResults,
  dataType,
  entityLoading,
}) => {
  console.log(entityLoading);
  return (
    <>
      {/* Entities List */}
      <div className="w-full h-full flex flex-col gap-[22px] overflow-y-auto custom-scrollbar pr-2">
        {entityLoading ? (
          <>
            <div className="w-full animate-pulse h-[80px] bg-gray-500/50 radius"></div>
            <div className="w-full animate-pulse h-[80px] bg-gray-500/50 radius"></div>
            <div className="w-full animate-pulse h-[80px] bg-gray-500/50 radius"></div>
            <div className="w-full animate-pulse h-[80px] bg-gray-500/50 radius"></div>
            <div className="w-full animate-pulse h-[80px] bg-gray-500/50 radius"></div>
          </>
        ) : entityError ? (
          <div className="w-full text-sm">No data found, please try again!</div>
        ) : (
          entityResults?.map((film) => (
            <EntityItem key={film.id} item={film} dataType={dataType} />
          ))
        )}
      </div>
    </>
  );
};

export default EntitiListWrapper;
