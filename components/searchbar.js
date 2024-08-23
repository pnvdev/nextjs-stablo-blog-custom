"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

function SearchBar() {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState({
    query: searchParams.get("query") || "",
  });

  const [debouncedQuery] = useDebounce(searchQuery, 500);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchQuery((prevQuery) => ({
      ...prevQuery,
      [name]: value,
    }));
  };

  const updateSearchQuery = (updatedQuery) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.keys(updatedQuery).forEach((key) => {
      if (updatedQuery[key]) {
        params.set(key, updatedQuery[key]);
      } else {
        params.delete(key);
      }
    });

    const queryString = params.toString();
    const updatedPath = queryString ? `/search?${queryString}` : pathname;

    router.push(updatedPath);
  };

  useEffect(() => {
    updateSearchQuery(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <input
      type="text"
      placeholder="Enter keywords"
      id="query"
      name="query"
      className="w-full rounded-md border px-3 py-2 outline-none focus:border-gray-300 focus:shadow-sm dark:border-gray-600 dark:bg-gray-900 dark:focus:border-white"
      value={searchQuery.query}
      onChange={handleInputChange}
    />
  );
}

export default SearchBar;
