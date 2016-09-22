import React from 'react';
import {Router, Route, Link, browserHistory} from 'react-router';
import './App.css';

const Header = () => (
  <div className="Header">
    <h2>Judgement</h2>
  </div>
)

const Intro = () => (
  <div className="Intro">
    <Header />
    <Link to="/new">
      <button>New Game</button>
    </Link>
    <Link to="/join">
      <button>Join Game</button>
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

const NewGame = () => (
  <div className="NewGame">
    <Header />
    <input type="text" placeholder="Enter your name" />
    <button onClick={() => createGame("mom")}>Create</button>
    <Link to="/">
      <button>Back</button>
    </Link>
  </div>
);

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
  <Router history={browserHistory}>
    <Route path="/" component={Intro} />
    <Route path="/new" component={NewGame} />
    <Route path="/join" component={JoinGame} />
    <Route path="/play/:id" component={PlayGame} />
  </Router>
);

export default App;
