import React from 'react';
import Card from './Card.jsx';
import Placeholder from './Placeholder.jsx';
import './Table.css';

const Table = ({cards}) => (
  <div className="Table--container">
    {
      cards.map((card, idx) => {
        return (card != null) ? <Card key={idx} rank={card.rank} suit={card.suit} /> : <Placeholder key={idx} />
      })
    }
  </div>
);

export default Table;
