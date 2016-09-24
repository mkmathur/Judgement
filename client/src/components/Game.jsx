import React from 'react';
import JudgementPicker from '../components/JudgementPicker.jsx';
import Hand from '../components/Hand.jsx';
import Table from '../components/Table.jsx';
import PlayerList from '../components/PlayerList.jsx';
import './Game.css';

class Game extends React.Component {
  render() {
    const {state, roundNum, hand, table, players} = this.props;
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
        <PlayerList players={players} />
      </div>
    );
  }
}

export default Game;
