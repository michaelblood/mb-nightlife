import React, { Component, PropTypes } from 'react';

import ResultItem from './ResultItem';

const renderBars = (bars = [], onClick) => {
  return bars.map((bar, index) => (
    <ResultItem
      key={bar._id}
      bar={bar}
      onClick={() => onClick(index)}
    />
  ));
};

const Results = ({ bars, onClick }) => {
  return (
    <div className="container">
      <div className="card-deck bar-list">
        {renderBars(bars, onClick)}
      </div>
    </div>
  );
};

Results.propTypes = {
  bars: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func,
};

export default Results;
