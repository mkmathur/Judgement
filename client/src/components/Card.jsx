import React from 'react';

const styles = {
  height: 200
};

const Card = ({rank, suit}) => (
  <div className="card">
    <img src={require(`../../assets/cards/${rank}${suit}.svg`)} style={styles} />
  </div>
);

export default Card;
