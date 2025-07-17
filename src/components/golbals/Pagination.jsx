import React from "react";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const nextPage = () => {
    if (currentPage >= pages.length) {
      return;
    }
    setCurrentPage((prev) => prev + 1);
  };
  const prevPage = () => {
    if (currentPage <= 1) {
      return;
    }
    setCurrentPage((prev) => prev - 1);
  };

  const setThePage = (page) => {
    setCurrentPage(page);
  };
  const changePage = (dir) => {
    if (dir === "next") {
      nextPage();
    } else if (dir === "prev") {
      prevPage();
    }
  };
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
        {pages.map((page) => {
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
