import React, { createContext, useContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchResult, setSearchResult] = useState([]);

  // Specify the type of 'result' for clarity
  function storeSearchResult(result) {
    setSearchResult(result);
  }

  return (
    <SearchContext.Provider value={{ searchResult, storeSearchResult }}>
      {children}
    </SearchContext.Provider>
  );
};

export function useSearchResult() {
  return useContext(SearchContext);
}
