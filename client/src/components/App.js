import React, { Component, PropTypes } from 'react';

import PageTitle from './PageTitle';
import Results from './Results';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: props.previous || '',
      current: null,
      results: [],
    };
  }

  handleSubmit(text) {
    this.setState({ search: text });
    window.localStorage.setItem('previousSearch', text);
    this.setState(prevState => {
      return {
        results: [
          ...prevState.results,
          {
            _id: 'the_bar_thing',
            name: 'The Bar Thing',
            description: 'sample bar thing text and stuff',
            thumbnail: null,
            rating: 5,
            visitors: ['justone'],
          }
        ]
      }
    })
  }

  render() {
    const { search, results, current } = this.state;
    return (
      <div>
        <PageTitle
          handleSubmit={(text) => this.handleSubmit(text)}
          defaultSearch={search}
        />
        <Results
          data={results}
          current={current}
        />
      </div>
    );
  }
}

App.propTypes = {
  previous: PropTypes.string,
};

export default App;
