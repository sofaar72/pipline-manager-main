import React, { memo, useCallback, useEffect, useState } from "react";
import Loading from "./Loading";
import debounce from "lodash/debounce";

const SearchTwo = ({ searchQuery, loading }) => {
  const handleSearch = (query) => {
    console.log("🔍 Searching for:", query);
    if (query.length >= 1) {
      searchQuery(query);
    } else if (query === "") {
      searchQuery(undefined);
    }
  };

  // Memoized debounced function
  const debouncedSearch = useCallback(
    debounce((value) => {
      handleSearch(value);
    }, 500),
    []
  );

  const handleChange = (e) => {
    debouncedSearch(e.target.value);
  };

  // const [searchTerm, setSearchTerm] = useState("");
  // const [debouncedTerm, setDebouncedTerm] = useState("");
  // const [loading, setLoading] = useState(false);

  // // Debounce input
  // useEffect(() => {
  //   const handler = setTimeout(() => {
  //     setDebouncedTerm(searchTerm);
  //   }, 500); // 500ms debounce

  //   return () => {
  //     clearTimeout(handler); // cleanup on re-type
  //   };
  // }, [searchTerm]);

  // // Effect for triggering API/search
  // useEffect(() => {
  //   if (debouncedTerm.trim() !== "") {
  //     // Replace with your API call
  //     setLoading(true);
  //     const handler = setTimeout(() => {
  //       setLoading(false);
  //     }, 1000); // 500ms debounce

  //     return () => {
  //       clearTimeout(handler); // cleanup on re-type
  //     };
  //     // console.log("🔍 Searching for:", debouncedTerm);
  //   } else {
  //     setLoading(false);
  //   }
  // }, [debouncedTerm]);

  return (
    <form class="w-full h-[40px] flex items-center !bg-[var(--primary-color-inputs)] radius">
      <div class="relative w-full">
        <div className="absolute right-[10px] top-1/2 -translate-y-1/2">
          {loading && <Loading size={"w-4 h-4"} />}
        </div>
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            class="w-4 h-4 text-white dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="default-search"
          class="block w-full p-4 ps-10 text-sm text-white placeholder:text-white/90  "
          onChange={handleChange}
          placeholder="Search ..."
          required
        />
      </div>
    </form>
  );
};

export default SearchTwo;
