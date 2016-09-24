import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Button from './Button';
import Welcome from './Welcome';
import Card from '../components/Card';
import Hand from '../components/Hand';
import Table from '../components/Table.jsx';
import JudgementPicker from '../components/JudgementPicker';
import Game from '../components/Game';

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

storiesOf('Game', module)
  .add('waiting for judgement', () => (
    <Game state={"WAITING_FOR_JUDGEMENTS"} roundNum={3} hand={cards} />
  ))
  .add('waiting for card', () => (
    <Game state={"WAITING_FOR_CARD"} roundNum={3} hand={cards} table={[...cards, null]}/>
  ))
