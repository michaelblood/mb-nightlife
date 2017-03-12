import React, { Component, PropTypes } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleSubmit, previous } = this.props;
    return (
      <div className="col">
        <label
          htmlFor="search-bar"
          className="hidden-md-up search-label-mobile"
        >
          Search for bars in...
        </label>
        <div className="input-group input-group-lg">
          <span
            className="input-group-addon search-label hidden-sm-down"
            id="search-addon"
          >
            Bars in...
          </span>
          <input 
            type="text"
            id="search-bar"
            className="search-bar form-control"
            placeholder={previous || 'location'}
            ref={node => {
              this.input = node;
            }}
          />
          <span className="input-group-btn">
            <input
              type="submit"
              role="button"
              className="btn"
              value="&#xf002;"
              charSet="utf-8"
              onClick={() => {
                if (!this.input.value) {
                  return;
                }
                handleSubmit(this.input.value);
                this.input.value = '';
              }}
            />
          </span>
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  handleSubmit: PropTypes.func,
  previous: PropTypes.string,
};

export default SearchBar;
