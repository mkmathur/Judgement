import React from 'react';
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
  <IntroView />    
);

export default App;
