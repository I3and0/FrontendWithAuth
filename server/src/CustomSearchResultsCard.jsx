
import React from 'react';
import "./Styles/CustomSearchResultsCardStyles.css";

const CustomSearchResultsCard = ({ results }) => {

     // Dummy data for demonstration
  const dummyResults = [
    { id: 1, name: 'Result 1' },
    { id: 2, name: 'Result 2' },
    { id: 3, name: 'Result 3' },
  ];

  return (
    <div className="search-results-card">
      <h2>Search Results</h2>
      {/* <ul>
        {results.map((result) => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul> */}
      <ul>
        {results.length > 0
          ? results.map((result) => (
              <li key={result.id}>{result.name}</li>
            ))
          : dummyResults.map((result) => (
              <li key={result.id}>{result.name}</li>
            ))}
      </ul>
    </div>
  );
};

export default CustomSearchResultsCard;
