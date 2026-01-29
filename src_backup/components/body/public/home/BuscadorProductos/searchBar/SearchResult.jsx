import React from "react";
import "./SearchResult.css";

export const SearchResult = ({ result, onClick }) => {
  const handleResultClick = () => {
    onClick(result.id); // Pasa el ID del producto como argumento
  };
  return (
    <div className="search-result" onClick={handleResultClick}>
      {result.name}
    </div>
  );
};
