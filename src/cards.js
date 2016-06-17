var Immutable = require('immutable');

const SUITS = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];

export const Suits = {
  CLUBS: 0,
  DIAMONDS: 1,
  HEARTS: 2,
  SPADES: 3
};

const VALUES = {
  1: 'Ace',
  11: 'Jack',
  12: 'Queen',
  13: 'King'
};

for (let i = 2; i < 11; i++) {
  VALUES[i] = i.toString();
}

Object.freeze(VALUES);

export class Card extends Immutable.Record({ suit: 0, value: 1 }) {
  toString() {
    return `${VALUES[this.value]} of ${SUITS[this.suit]}`;
  }
}

// Returns a deck containing all 52 cards.
export function initializeDeck() {

}

// Returns the shuffled deck.
export function shuffle(deck) {

}
