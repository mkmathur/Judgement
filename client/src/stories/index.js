import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Button from './Button';
import Welcome from './Welcome';
import Card from '../components/Card';
import Hand from '../components/Hand';
import JudgementPicker from '../components/JudgementPicker';

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
