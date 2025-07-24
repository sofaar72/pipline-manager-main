import React, { useEffect } from "react";

import { entities } from "../../fakeContents/Entities";

import SearchTwo from "../golbals/SearchTwo";
import EntityItem from "../golbals/EntityItem";
import Pagination from "../golbals/Pagination";
import Loading from "../golbals/Loading";
import CdropDown from "../golbals/CDropDown";

const MainContentVisibleData = ({
  dataType,
  selectEntityType,
  setSearch,
  entityLoading,
  entityError,
  entityResults,
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  return (
    <div className="w-full max-w-main h-full main-bg radius sec-padd-x sec-padd-y flex flex-col gap-[22px]">
      {/* Top controls */}
      <div className="w-full flex flex-col pb-[10px] gap-[20px] border-b border-white/10 ">
        <div className="w-full radius h-[40px] flex justify-between gap-2">
          <CdropDown
            options={[...entities]}
            init={"All"}
            select={selectEntityType}
          />
        </div>
        <SearchTwo searchQuery={setSearch} loading={entityLoading} />
        <div className="w-1/2 radius h-[18px]">
          <span className="text-sm">{entityResults?.length} Items Found</span>
        </div>
      </div>

      {/* Entities List */}
      <div className="w-full h-full flex flex-col gap-[22px] overflow-y-auto custom-scrollbar pr-2">
        {entityError ? (
          <div className="w-full text-sm">No data found, please try again!</div>
        ) : (
          entityResults?.map((film) => (
            <EntityItem key={film.id} item={film} dataType={dataType} />
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

export default MainContentVisibleData;
