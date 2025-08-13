import React, { useEffect, useState } from "react";
import { useEpisodeManagerContext } from "../../assets/context/EpisodeManagerContext";
import { useEntities } from "../../hooks/useEntities";

const Pagination = ({ totalPages }) => {
  const { currentPage, setCurrentPage, fetchEntities } = useEntities();
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const { globalCurrentPage, setGlobalCurrentPage } =
    useEpisodeManagerContext();

  const nextPage = () => {
    if (currentPage >= pages.length) {
      return;
    }
    setCurrentPage((prev) => prev + 1);
    setGlobalCurrentPage((prev) => prev + 1);
  };
  const prevPage = () => {
    if (currentPage <= 1) {
      return;
    }
    setCurrentPage((prev) => prev - 1);
    setGlobalCurrentPage((prev) => prev - 1);
  };

  const setThePage = (page) => {
    setCurrentPage(page);
    setGlobalCurrentPage(page);
  };
  const changePage = (dir) => {
    if (dir === "next") {
      nextPage();
    } else if (dir === "prev") {
      prevPage();
    }
  };

  useEffect(() => {
    fetchEntities();
  }, [currentPage]);

  const [slice, setSlice] = useState({
    from: 0,
    end: 5,
  });

  useEffect(() => {
    const visibleCount = 5;

    let start = 0;
    let end = visibleCount;

    // If total pages less than visibleCount, show all
    if (totalPages <= visibleCount) {
      start = 0;
      end = totalPages;
    } else {
      // Try to center currentPage
      const middleOffset = Math.floor(visibleCount / 2);

      if (currentPage <= middleOffset + 1) {
        start = 0;
        end = visibleCount;
      } else if (currentPage + middleOffset >= totalPages) {
        end = totalPages;
        start = totalPages - visibleCount;
      } else {
        start = currentPage - middleOffset - 1;
        end = start + visibleCount;
      }
    }

    setSlice({ from: start, end });
  }, [currentPage, totalPages]);

  return (
    <div className="w-full h-[34px] flex items-center justify-between gap-[10px] rounded-full shadow-[var(--box-shadow)] bg-[var(--primary-color-lower)]/20 px-[10px] py-[10px]">
      <img
        onClick={() => changePage("prev")}
        className={`cursor-pointer w-[15px] h-[15px] transition ${
          currentPage == 1 ? "opacit-40" : "opacity-100"
        }`}
        src="/icons/Left Arrow.svg"
        alt=""
      />
      <div className="flex items-center  gap-[15px]">
        {pages.slice(slice.from, slice.end).map((page) => {
          return (
            <span
              key={page}
              onClick={() => setThePage(page)}
              className={`cursor-pointer text-xs w-[18px] h-[18px] flex items-center justify-center text-center transition rounded-full hover:bg-[var(--primary-color-light)] text-white ${
                page === currentPage ? "bg-[var(--primary-color-light)]" : ""
              }`}
            >
              {page}
            </span>
          );
        })}
      </div>
      <img
        onClick={() => changePage("next")}
        className=" cursor-pointer w-[15px] h-[15px]"
        src="/icons/Right Arrow.svg"
        alt=""
      />
    </div>
  );
};

export default Pagination;
