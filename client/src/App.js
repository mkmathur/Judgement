import React from 'react';
import {Router, Route, Link, browserHistory} from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import './App.css';

injectTapEventPlugin();

const Header = () => (
  <div className="Header">
    <h2>Judgement</h2>
  </div>
)

const buttonStyle = {
  margin: 5,
};

const Intro = () => (
  <div className="Intro">
    <Header />
    <Link to="/new">
      <RaisedButton label="New Game" primary style={buttonStyle} />
    </Link>
    <Link to="/join">
      <RaisedButton label="Join Game" primary style={buttonStyle} />
    </Link>
  </div>
);

const createGame = (playerName) => {
  fetch("/api/createGame", {
    method: "POST",
    body: JSON.stringify({ playerName: playerName }),
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
  })
  .then(response => {
    return response.text();
  })
  .then(gameId => {
    browserHistory.push(`/play/${gameId}`);
  })
};

class NewGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
    this.onChangeName = this.onChangeName.bind(this);
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  render() {
    return (
      <div className="NewGame">
        <Header />
        <TextField hintText="Enter your name" onChange={this.onChangeName} />
        <div className="NewGame--buttons">
          <Link to="/">
            <RaisedButton label="Back" style={buttonStyle} />
          </Link>
          <RaisedButton label="Create" primary style={buttonStyle} onTouchTap={() => createGame(this.state.name)} />
        </div>
      </div>
    );
  }
}

const JoinGame = () => (
  <div className="JoinGame">
    <Header />
    <input type="text" placeholder="Enter an access code" />
    <input type="text" placeholder="Enter your name" />
    <button>Join</button>
    <Link to="/">
      <button>Back</button>
    </Link>
  </div>
);

const PlayGame = () => (
  <div className="PlayGame">
    <Header />
  </div>
);

const App = () => (
  <MuiThemeProvider>
    <Router history={browserHistory}>
      <Route path="/" component={Intro} />
      <Route path="/new" component={NewGame} />
      <Route path="/join" component={JoinGame} />
      <Route path="/play/:id" component={PlayGame} />
    </Router>
  </MuiThemeProvider>
);

export default App;
