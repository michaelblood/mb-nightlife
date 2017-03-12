import React, { PropTypes } from 'react';

const ResultItem = ({ bar, onClick }) => {
  return (
    <div className="card bar-card my-1">
      <div className="heading-wrapper card-header">
        <div className="img-wrapper mr-3">
          <img src={bar.thumbnail} className="rounded"/>
        </div>
        <h4><a href={bar.url} target="_blank">{bar.name}</a></h4>
      </div>
      <div className="card-block">
        <img src={bar.ratingImg} alt={bar.rating.toString() + " out of 5 stars"} className="img-thumbnail rating-img"/>
        <button className="float-right btn btn-secondary" onClick={() => onClick()}>
          {`${bar.visitors.length} going`}
        </button>
      </div>
      <div className="card-block item-wrapper">
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
