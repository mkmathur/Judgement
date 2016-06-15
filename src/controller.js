import * as Cards from './Cards.js';
import * as Game from './game.js';
import * as Model from './model.js';

const DUMMY_GAME = 123;

export function makeGame(data) {
  // TODO
}

export function addPlayer(data) {
  const model = new Model(DUMMY_GAME);
  model.addPlayer(data.playerName);
}

export function startGame(data) {
  const model = new Model(DUMMY_GAME);

  const deck = Cards.initializeDeck();
  Cards.shuffle(deck);
  model.deck = deck;

  model.roundNumber = 0;
  model.maxRoundNumber = Game.maxRoundNumber(model.numPlayers);

  startRound(data);
}

export function startRound(data) {
  const model = new Model(DUMMY_GAME);

  const nextRoundNumber = Game.nextRoundNumber(model.roundNumber);

  if (nextRoundNumber == 0) {
    endGame();
    return;
  }

  model.roundNumber = nextRoundNumber;
  model.resetTricks();

  const deck = model.deck;
  Cards.shuffle(deck);
  model.deck = deck;

  model.trump = Game.nextTrump(model.trump);

  const players = model.players;
  for (player of players) {
    const hand = [];
    Cards.deal(deck, hand, nextRoundNumber);
    model.updatePlayerHand(playerID, hand);
  }
  model.deck = deck;

  model.state = Game.STATES.WAITING_FOR_JUDGEMENTS;
}

export function makeJudgement(data) {
  const model = new Model(DUMMY_GAME);

}

export function playCard(data) {
  const model = new Model(DUMMY_GAME);

}

function endGame() {
  const model = new Model(DUMMY_GAME);

}
