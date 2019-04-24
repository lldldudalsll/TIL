import React from 'react';
import queryString from 'query-string';

const Results = ({location, match}) => {
  const query = queryString.parse(location.search);
  // console.log(query);
  const { color } = query;
  return (
    <div>
      <h2 style={{color}}>Introduce Results</h2>
      <p>
        Here is Results section.
        this number of results {match.params.number}
      </p>
    </div>
  )
}

export default Results;