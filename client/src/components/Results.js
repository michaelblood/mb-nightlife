import React, { Component, PropTypes } from 'react';

import ResultItem from './ResultItem';

const renderBars = (bars = [], onClick) => {
  return bars.map((bar) => (
    <ResultItem
      key={bar._id}
      bar={bar}
      onClick={() => onClick(bar._id)}
    />
  ));
};

const Results = ({ bars, onClick }) => {
  return (
    <div className="container">
      <div className="row bar-list">
        <div className="col">
          {renderBars(bars, onClick)}
        </div>
      </div>
    </div>
  );
};

Results.propTypes = {
  bars: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func,
};

export default Results;
