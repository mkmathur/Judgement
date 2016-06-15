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
  model.setDeck(deck);

  model.setRoundNumber(0);
  const numPlayers = model.getNumPlayers();
  model.setMaxRoundNumber(Game.maxRoundNumber(numPlayers));

  startRound(data);
}

export function startRound(data) {
  const model = new Model(DUMMY_GAME);

  const currentRoundNumber = model.getRoundNumber(data.gameID);
  const nextRoundNumber = Game.getNextRoundNumber(currentRoundNumber);

  if (nextRoundNumber == 0) {
    endGame();
    return;
  }

  model.setRoundNumber(nextRoundNumber);
  model.resetTricks();

  const deck = model.getDeck();
  Cards.shuffle(deck);
  model.setDeck(deck);

  const currentTrump = model.getCurrentTrump();
  const nextTrump = Game.getNextTrump(currentTrump);
  model.setTrump(nextTrump);

  const players = model.getPlayers();
  const deck = model.getDeck();
  for (player of players) {
    const hand = [];
    Cards.deal(deck, hand, nextRoundNumber);
    model.setHand(playerID, hand);
  }
  model.setDeck(deck);

  model.setState(Game.STATES.WAITING_FOR_JUDGEMENTS);
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
