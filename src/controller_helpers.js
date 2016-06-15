import * as Cards from './Cards.js';

export function initializeDeck(model) {
  const deck = Cards.initializeDeck();
  Cards.shuffle(deck);
  model.deck = deck;
}

export function shuffleDeck(model) {
  const deck = model.deck;
  Cards.shuffle(deck);
  model.deck = deck;
}

export function deal(model) {
  const players = model.players;
  for (player of players) {
    const hand = [];
    Cards.deal(deck, hand, nextRoundNumber);
    model.updatePlayerHand(playerID, hand);
  }
  model.deck = deck;
}
