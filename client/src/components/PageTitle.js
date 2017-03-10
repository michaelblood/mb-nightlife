import React, { PropTypes } from 'react';

import SearchBar from './SearchBar';

const PageTitle = ({ defaultSearch, handleSubmit }) => (
  <div className="jumbotron page-heading" style={{borderRadius: '0%'}}>
    <div className="container">
      <h1 className="page-title">mb-nightlife</h1>
      <hr className="hr-title"/>
      <SearchBar
        previous={defaultSearch}
        handleSubmit={(text) => handleSubmit(text)}
      />
    </div>
  </div>
);
PageTitle.propTypes = {
  handleSubmit: PropTypes.func,
  defaultSearch: PropTypes.string,
};

export default PageTitle;
