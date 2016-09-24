import React from 'react';
import Card from './Card.jsx';
import Placeholder from './Placeholder.jsx';
import './Table.css';

const Table = ({cards}) => (
  <div className="Table--container">
    {
      cards.map(card => {
        return (card != null) ? <Card rank={card.rank} suit={card.suit} /> : <Placeholder />
      })
    }
  </div>
);

export default Table;
