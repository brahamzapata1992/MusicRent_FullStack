import { useState } from "react";
import API_URL from "../../../../../../config/api";
import "./SearchBar.css";

export const SearchBar = ({ setResults }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = (value) => {
    fetch(`${API_URL}/api/admin/products`)
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((product) => {
          return (
            value &&
            product &&
            product.name &&
            product.name.toLowerCase().includes(value)
          );
        });
        setResults(results);
      });
  };

  const handleChange = (value) => {
    setSearchTerm(value);
    fetchData(value);
  };

  return (
    <div className="input-container">
      <input
        className='input-buscador-productos-2'
        type='text'
        placeholder="Guitarra Fender CD60s"
        value={searchTerm}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
