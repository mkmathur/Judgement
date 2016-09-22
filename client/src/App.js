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

const NewGame = () => (
  <div className="NewGame">
    <Header />
    <input type="text" placeholder="Enter your name" />
    <button>Create</button>
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

const App = () => (
  <Router history={browserHistory}>
    <Route path="/" component={Intro} />
    <Route path="/new" component={NewGame} />
    <Route path="/join" component={JoinGame} />
  </Router>
);

export default App;
