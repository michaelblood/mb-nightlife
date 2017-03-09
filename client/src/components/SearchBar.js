import React, { Component, PropTypes } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleSubmit, previous } = this.props;
    return (
      <div>
        <label
          htmlFor="search-bar"
          className="hidden-md-up"
        >
          Bars in...
        </label>
        <div className="input-group input-group-lg">
          <span className="input-group-addon hidden-sm-down bg-faded" id="search-addon">Bars in...</span>
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
              className="btn btn-secondary bg-faded"
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
