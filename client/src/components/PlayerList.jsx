import React from 'react';
import PlayerCard from '../components/PlayerCard.jsx';

const PlayerList = ({players}) => (
  <div className="PlayerList--container">
    {
      players.map(({name, score, bid, tricks}, idx) => (
        <PlayerCard id={idx} key={idx} name={name} score={score} bid={bid} tricks={tricks} />
      ))
    }
  </div>
);

export default PlayerList;
