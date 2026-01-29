import React from "react";
import { SearchResult } from "./SearchResult";
import { useNavigate } from 'react-router-dom';
import "./SearchResultsList.css";

export const SearchResultsList = ({ results }) => {
  const navigate = useNavigate();

  const handleResultClick = (productId) => {
    navigate(`/detalle-producto/${productId}`);
  };

  return (
    <div>
      <div className="results-list">
        {results.map((result) => (
          <SearchResult
            key={result.id}
            result={result}
            onClick={handleResultClick}
          />
        ))}
      </div>
    </div>
  );
};



