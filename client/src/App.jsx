import React from 'react';
import {Router, Route, Link, browserHistory} from 'react-router';
import Firebase from 'firebase';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import './App.css';

injectTapEventPlugin();

Firebase.initializeApp({
  apiKey: "AIzaSyDTdcoqVfNhd8wcEoUPCLPzb7uEu4qx3To",
  authDomain: "project-6638516275584701777.firebaseapp.com",
  databaseURL: "https://project-6638516275584701777.firebaseio.com",
  storageBucket: "project-6638516275584701777.appspot.com",
});

const db = Firebase.database();

const buttonStyle = {
  margin: 5,
};

const Home = () => (
  <div className="intro-container">
    <h2>Judgement</h2>
    <div className="button-row">
      <Link to="/new">
        <RaisedButton label="New Game" primary style={buttonStyle} />
      </Link>
      <Link to="/join">
        <RaisedButton label="Join Game" primary style={buttonStyle} />
      </Link>
    </div>
  </div>
);

const createGame = (playerName) => {
  fetch("/api/games", {
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

const joinGame = (gameId, playerName) => {
  fetch("/api/players", {
    method: "POST",
    body: JSON.stringify({ playerName: playerName, gameId: gameId }),
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
  })
  .then(() => {
    browserHistory.push(`/play/${gameId}`);
  })
}

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
      <div className="intro-container">
        <h2>Judgement</h2>
        <TextField hintText="Enter your name" onChange={this.onChangeName} />
        <div className="button-row">
          <Link to="/">
            <RaisedButton label="Back" style={buttonStyle} />
          </Link>
          <RaisedButton label="Create" primary style={buttonStyle} onTouchTap={() => createGame(this.state.name)} />
        </div>
      </div>
    );
  }
}

class JoinGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessCode: "",
      name: "",
    };
    this.onChangeAccessCode = this.onChangeAccessCode.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
  }

  onChangeAccessCode(e) {
    this.setState({
      accessCode: e.target.value
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  render() {
    return (
      <div className="intro-container">
        <h2>Judgement</h2>
        <TextField hintText="Enter an access code" onChange={this.onChangeAccessCode} />
        <TextField hintText="Enter your name" onChange={this.onChangeName} />
        <div className="button-row">
          <Link to="/">
            <RaisedButton label="Back" style={buttonStyle} />
          </Link>
          <RaisedButton label="join" primary style={buttonStyle} onTouchTap={() => joinGame(this.state.accessCode, this.state.name)}/>
        </div>
      </div>
    );
  }
}

class WaitingForPlayers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: []
    };
  }

  componentWillMount() {
    this.playersRef = db.ref(`/games/${this.props.gameId}/players`);
    this.playersRef.on('child_added', (snapshot) => {
      this.state.players.push({
        id: snapshot.key,
        name: snapshot.val().name,
      });
      this.setState({
        players: this.state.players
      });
    }); 
  }

  render() {
    return (
      <div className="intro-container">
        <h2>Waiting for players...</h2>
        <p>Access code: <span className="code">{this.props.gameId}</span></p>
        <ul>
          {
            this.state.players.map(player => (
              <li key={player.id}>{player.name}</li>    
            ))
          }
        </ul>
        <div className="button-row">
          <RaisedButton label="Leave Game" style={buttonStyle} />
          <RaisedButton label="Start Game" primary style={buttonStyle} />
        </div>
      </div>
    );
  }
}

const PlayGame = ({params}) => (
  <WaitingForPlayers gameId={params.id} />
);

const App = () => (
  <MuiThemeProvider>
    <Router history={browserHistory}>
      <Route path="/" component={Home} />
      <Route path="/new" component={NewGame} />
      <Route path="/join" component={JoinGame} />
      <Route path="/play/:id" component={PlayGame} />
    </Router>
  </MuiThemeProvider>
);

export default App;
