import React, { PropTypes } from 'react';

import SearchBar from './SearchBar';

const PageTitle = ({ defaultSearch, handleSubmit }) => (
  <div className="jumbotron page-title bg-inverse" style={{borderRadius: '0%'}}>
    <div className="container">
      <h1 className="page-heading text-white">mb-nightlife</h1>
      <hr style={{borderColor: '#f7f7f7'}}/>
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
