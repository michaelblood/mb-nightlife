import React, { PropTypes } from 'react';

const renderIndividuals = (results) => {
  return (
    <div></div>
  )
};

const Results = ({ data }) => {
  return (
    <div>
      
    </div>
  );
};

Results.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    thumbnail: PropTypes.string,
    rating: PropTypes.number,
    visitors: PropTypes.arrayOf(PropTypes.string),
  }))
};

export default Results;