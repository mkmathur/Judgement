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
  let deck = new Array();
  for (let s = 0; s < 4; s++) {
    for (let v = 1; v <= 13; v++) {
      deck[deck.length] = new Card({suit: SUITS[s], value: VALUES[v]});
    }
  }
  return deck;
}

// Returns the shuffled deck.
export function shuffle(deck) {
  var copy = [], n = deck.length, i;

  // While there remain elements to shuffle…
  while (n) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * deck.length);

    // If not already shuffled, move it to the new array.
    if (i in deck) {
      copy.push(deck[i]);
      delete deck[i];
      n--;
    }
  }

  return copy;
}
