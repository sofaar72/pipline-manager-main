import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { entities } from "../../fakeContents/Entities";

import SearchTwo from "../golbals/SearchTwo";
import EntityItem from "../golbals/EntityItem";
import Pagination from "../golbals/Pagination";
import Loading from "../golbals/Loading";
import CdropDown from "../golbals/CDropDown";
import EntitiListWrapper from "./EntitiListWrapper";
import MainContentPrev from "../golbals/PlaceHolders.jsx/MainContentPrev";
import { useEntities } from "../../hooks/useEntities";
import CbuttonOne from "../golbals/Buttons/CbuttonOne";
import { useAssets } from "../../hooks/useAssets";

const MainContentVisibleData = ({
  dataType,
  selectEntityType,
  setSearch,
  entityError,
  entityResults,
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  const { entityLoading } = useEntities({});
  const { assetLoading } = useAssets({});
  const navigate = useNavigate();

  const goToSelectProject = () => {
    navigate("/projects/select");
  };

  const location = useLocation();
  const { entityType } = location.state;

  return (
    <div className="w-full max-w-main shrink-0 h-full main-bg radius sec-padd-x sec-padd-y flex flex-col gap-[22px]">
      {/* Top controls */}
      <div className="w-full flex flex-col pb-[10px] gap-[20px] border-b border-white/10 ">
        <div className="w-full radius h-[40px] flex justify-between gap-2">
          <CdropDown
            options={[...entities]}
            init={"All"}
            select={selectEntityType}
          />
          <CbuttonOne
            cClasses=" bg-[var(--primary-color-light)]/40 hover:!bg-[var(--primary-color-light)]"
            onClick={goToSelectProject}
          >
            Select Project
          </CbuttonOne>
        </div>
        <SearchTwo searchQuery={setSearch} loading={entityLoading} />
        <div className="w-1/2 radius h-[18px]">
          <span className="text-sm">{entityResults?.length} Items Found</span>
        </div>
      </div>

      <EntitiListWrapper
        entityError={entityError}
        entityResults={entityResults}
        dataType={dataType}
        entityLoading={
          entityType === "Production" ? entityLoading : assetLoading
        }
      />

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
