import React from 'react';
import {Router, Route, browserHistory} from 'react-router';
import './App.css';

const IntroView = () => (
  <div className="IntroView">
    <div className="IntroView-header">
      <h2>Judgement</h2>
    </div>
    <button>Create Game</button>
    <button>Join Game</button>
  </div>
);

const App = () => (
  <Router history={browserHistory}>
    <Route path="/" component={IntroView} />
  </Router>
);

export default App;
