import React, { Component, PropTypes } from 'react';

import PageTitle from './PageTitle';
import Results from './Results';
import LoginModal from './LoginModal';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: props.previous || '',
      results: [],
      fetching: false,
      user: null,
      loginModal: false,
    };
  }

  determineLogin() {
    if (this.state.user) {
      return;
    }
    this.setState({
      fetching: true
    });
    let app = this;
    fetch('/api/is-logged-in', {
      credentials: 'same-origin'
    }).then(response => response.json())
      .then(json => {
        if (json.error) {
          app.setState({
            fetching: false,
            user: null
          });
          return;
        }
        app.setState({
          fetching: false,
          user: json.user
        });
        return;
      })
      .catch(err => console.log(err));
  }

  destroyModal() {
    this.setState({ loginModal: false });
  }

  componentDidMount() {
    this.determineLogin();
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

  toggleVisiting(index) {
    if (!this.state.user) {
      this.setState({ loginModal: true });
      return;
    }
    const bar = this.state.results[index];
    if (!bar) {
      return;
    }
    const self = this;
    fetch(`/api/toggle`, {
      method: 'POST',
      body: JSON.stringify({ barId: bar._id }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
    }).then(response => response.json())
      .then(bar => {
        if (bar.error) {
          return console.log(bar.error);
        }
        self.setState(previous => {
          let bars = previous.results.slice();
          bars[index].visitors = bar.bar.visitors;
          return {
            ...previous,
            results: bars,
          };
        });
      }).catch(console.log);
  }

  render() {
    const { search, results, loginModal } = this.state;
    return (
      <div>
        {loginModal && <LoginModal onClick={() => this.destroyModal()}/>}
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
