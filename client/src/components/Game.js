import React from 'react';
import JudgementPicker from '../components/JudgementPicker';
import Hand from '../components/Hand';
import Table from '../components/Table.jsx';
import './Game.css';

class Game extends React.Component {
  render() {
    const {state, roundNum, hand, table} = this.props;
    return (
      <div className="Game--container">
        {
          (state === "WAITING_FOR_JUDGEMENTS") &&
            <JudgementPicker max={roundNum} />
        }
        {
          (state == "WAITING_FOR_CARD") &&
            <Table cards={table} />
        }
        <Hand cards={hand} />
      </div>
    );
  }
}

export default Game;
