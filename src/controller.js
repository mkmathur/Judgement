import * as Cards from './Cards.js';
import * as Game from './game.js';
import * as Model from './model.js';
import * as _ from './controller_helpers.js';

const DUMMY_GAME = 123;

export function makeGame(data) {
  // TODO: maybe move this to REST API?
}

export function addPlayer(data) {
  const model = new Model(DUMMY_GAME);
  model.addPlayer(data.playerName);
}

export function startGame(data) {
  const model = new Model(DUMMY_GAME);
  _.initializeDeck(model);
  model.roundNumber = 0;
  model.maxRoundNumber = Game.maxRoundNumber(model.numPlayers);
  startRound(data);
}

export function startRound(data) {
  const model = new Model(DUMMY_GAME);

  const nextRoundNumber = Game.nextRoundNumber(model.roundNumber, model.maxRoundNumber);
  if (nextRoundNumber == 0) {
    endGame();
    return;
  }

  _.shuffleDeck(model);
  model.roundNumber = nextRoundNumber;
  model.resetTricks();
  model.trump = Game.nextTrump(model.trump);
  _.deal(model);
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
