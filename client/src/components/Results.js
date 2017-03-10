import React, { PropTypes } from 'react';

import BarInfo from './BarInfo';

const renderIndividuals = (results) => {
  return (
    <div></div>
  )
};

const Results = ({ data, current }) => {
  return (
    <div>
      
    </div>
  );
};

const BarType = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  thumbnail: PropTypes.string,
  rating: PropTypes.number,
  visitors: PropTypes.arrayOf(PropTypes.string),
});
Results.propTypes = {
  data: PropTypes.arrayOf(BarType),
  current: BarType
};

export default Results;
