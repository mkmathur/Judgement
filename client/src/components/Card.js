import React from 'react';

const Card = ({rank, suit}) => (
  <div className="card">
    <p>{rank} of {suit}</p>
  </div>
);

export default Card;
