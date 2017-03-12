import React, { PropTypes } from 'react';

const ResultItem = ({ bar, onClick }) => {
  return (
  <div className="w-100 p-3 my-3 row bar-item">
    <div className="heading-wrapper ">
      <div className="thumbnail-wrapper">
        <img src={bar.thumbnail} className="mx-auto d-block rounded"/>
      </div>
      <h4>{bar.name}</h4>
    </div>
    <div className="item-wrapper">
      <p className="snippet-text">{bar.description}</p>
    </div>
  </div>
  );
};

ResultItem.propTypes = {
  onClick: PropTypes.func,
  bar: PropTypes.object,
};

export default ResultItem;
