import React from 'react';

const Card = ({rank, suit}) => (
  <div className="card">
    <img src={require(`../../assets/cards/${rank}${suit}.svg`)} />
  </div>
);

export default Card;
