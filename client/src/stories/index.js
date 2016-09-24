import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Button from './Button';
import Welcome from './Welcome';
import Card from '../components/Card.jsx';
import Hand from '../components/Hand.jsx';
import Table from '../components/Table.jsx';
import JudgementPicker from '../components/JudgementPicker.jsx';
import PlayerCard from '../components/PlayerCard.jsx';
import PlayerList from '../components/PlayerList.jsx';
import Game from '../components/Game.jsx';

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')}/>
  ));

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ));

storiesOf('Card', module)
  .add('with number', () => (
    <Card rank="2" suit="C" />
  ))
  .add('face card', () => (
    <Card rank="Q" suit="H" />
  ))

const cards = [
  { rank: "Q", suit: "H" },
  { rank: "2", suit: "C" },
  { rank: "5", suit: "D" }
]

storiesOf('Hand', module)
  .add('with multiple cards', () => (
    <Hand cards={cards} />
  ))
  .add('with no cards', () => (
    <Hand cards={[]} />
  ))

storiesOf('Table', module)
  .add('with some cards', () => (
    <Table cards={[...cards, null]}/>
  ))
  .add('with no cards', () => (
    <Table cards={[null, null, null, null]} />
  ))

storiesOf('JudgementPicker', module)
  .add('for 1-card round', () => (
    <JudgementPicker max={1} />
  ))
  .add('for 5-card round', () => (
    <JudgementPicker max={5} />
  ))
  .add('for 13-card round', () => (
    <JudgementPicker max={13} />
  ))

const players = [
  { name: "Mallika", score: "10", bid: "3", tricks: "2" },
  { name: "Pranav", score: "0", bid: "2", tricks: "0" },
  { name: "Atul", score: "0", bid: "0", tricks: "0" },
  { name: "Kanchan", score: "21", bid: "2", tricks: "1" },
];

storiesOf('PlayerCard', module)
  .add('player', () => (
    <PlayerCard name="Mallika" score="10" bid="3" tricks="2" />
  ))

storiesOf('PlayerList', module)
  .add('player list', () => (
    <PlayerList players={players} />
  ))

storiesOf('Game', module)
  .add('waiting for judgement', () => (
    <Game state={"WAITING_FOR_JUDGEMENTS"} roundNum={3} hand={cards} players={players} />
  ))
  .add('waiting for card', () => (
    <Game state={"WAITING_FOR_CARD"} roundNum={3} hand={cards} table={[...cards, null]} players={players} />
  ))
