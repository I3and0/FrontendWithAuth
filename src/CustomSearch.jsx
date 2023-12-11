import React, { useState } from 'react';
import CustomSearchResultsCard from './CustomSearchResultsCard'; // Import the new component
import './Styles/CustomSearchStyles.css';

const CustomSearch = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      
      const apiUrl = `https://api.example.com/search?value=${selectedValue}&query=${searchQuery}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Update the state with the fetched search results
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="search-bar-parent-container">
        <div className="search-bar-container">
          <select
            className="select-box"
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
          >
            <option value="">Select Option</option>
            <option value="Entity">Entity</option>
            <option value="Feature">Feature</option>
            <option value="DataType">DataType</option>
          </select>

          <input
            className="search-input"
            type="text"
            placeholder="Enter search query"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
      </div>
     

      <div className="search-results-container">
        {searchResults.length > 0 && (<CustomSearchResultsCard results={searchResults} />)}
      </div>
    </div>
  );
};

export default CustomSearch;
