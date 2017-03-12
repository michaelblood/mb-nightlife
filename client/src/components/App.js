import React, { Component, PropTypes } from 'react';

import PageTitle from './PageTitle';
import Results from './Results';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: props.previous || '',
      results: [],
      fetching: false,
    };
  }

  componentDidMount() {
    if (!localStorage.getItem('previousSearch')) return;
    this.handleSubmit(localStorage.getItem('previousSearch'));
  }

  handleSubmit(text) {
    this.setState({
      search: text,
      fetching: true,
    });
    window.localStorage.setItem('previousSearch', text);
    fetch(`/api/search?location=${text}`)
      .then(response => response.json())
      .then(json => {
        this.setState({
          results: json.bars,
          fetching: false
        });
      }).catch(console.log);
  }

  toggleVisiting(id) {
    console.log(`toggling visiting for ${id}`);
  }

  render() {
    const { search, results, } = this.state;
    return (
      <div>
        <PageTitle
          handleSubmit={(text) => this.handleSubmit(text)}
          defaultSearch={search}
        />
        <Results
          bars={results}
          onClick={(id) => this.toggleVisiting(id)}
        />
      </div>
    );
  }
}

App.propTypes = {
  previous: PropTypes.string,
};

export default App;
