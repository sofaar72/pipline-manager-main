import React from "react";

const MainContentPrev = ({
  selectEntityType,
  setSearch,
  entityLoading,
  entityError,
  entityResults,
  currentPage,
  setCurrentPage,
  totalPages,
  fetchEntityTasks,
  activeEntity,
}) => {
  return (
    <div className="w-full max-w-main h-full main-bg radius sec-padd-x sec-padd-y flex flex-col gap-[22px] animate-pulse">
      <div className="w-[72px] animate-pulse h-[40px] bg-gray-500/50 radius"></div>
      <div className="w-full animate-pulse h-[40px] bg-gray-500/50 radius"></div>
      <div className="w-full animate-pulse h-[40px]  radius"></div>
      <div className="w-full h-full flex-1 flex flex-col gap-[22px]  radius overflow-y-hidden">
        <div className="w-full animate-pulse h-[80px] bg-gray-500/50 radius"></div>
        <div className="w-full animate-pulse h-[80px] bg-gray-500/50 radius"></div>
        <div className="w-full animate-pulse h-[80px] bg-gray-500/50 radius"></div>
        <div className="w-full animate-pulse h-[80px] bg-gray-500/50 radius"></div>
        <div className="w-full animate-pulse h-[80px] bg-gray-500/50 radius"></div>
        <div className="w-full animate-pulse h-[80px] bg-gray-500/50 radius"></div>
        <div className="w-full animate-pulse h-[80px] bg-gray-500/50 radius"></div>
      </div>
    </div>
  );
};

export default MainContentPrev;
