import React from 'react';
import Card from './Card.jsx';
import "./Hand.css";

const Hand = ({cards}) => (
  <div className="Hand--container">
    {
      cards.map(({rank, suit}) => (
        <Card rank={rank} suit={suit} key={`${rank}${suit}`}/>
      ))
    }
  </div>
);

export default Hand;
