import * as Cards from './Cards.js';
import * as Game from './game.js';
import * as Model from './model.js';

export function makeGame(data) {
 Model.makeGame(123);
}

export function addPlayer(data) {
  Model.addPlayer(123, data.playerName);
}

export function startGame(data) {
  const gameID = data.gameID;
  const deck = Cards.initializeDeck();
  Cards.shuffle(deck);
  Model.setRoundNumber(0);
  const numPlayers = Model.getNumPlayers(gameID);
  Model.setMaxRoundNumber(Game.maxRoundNumber(numPlayers));
  Model.setDeck(deck);
  onStartRound(data);
}

export function startRound(data) {
  const currentRoundNumber = Model.getRoundNumber(data.gameID);
  const nextRoundNumber = Game.getNextRoundNumber(currentRoundNumber);

  if (nextRoundNumber == 0) {
    endGame();
    return;
  }

  Model.setRoundNumber(data.gameID, nextRoundNumber);

  Model.resetTricks(data.gameID);

  const deck = Model.getDeck();
  Cards.shuffle(deck);
  Model.setDeck(deck);

  const currentTrump = Model.getCurrentTrump();
  const nextTrump = Game.getNextTrump(currentTrump);
  Model.setTrump(nextTrump);

  const players = Model.getPlayers();
  const deck = Model.getDeck();
  for (player of players) {
    const hand = [];
    Cards.deal(deck, hand, nextRoundNumber);
    Model.setHand(playerID, hand);
  }
  Model.setDeck(deck);

  Model.setState(Game.STATES.WAITING_FOR_JUDGEMENTS);
}

export function makeJudgement(data) {

}

export function playCard(data) {

}

function endGame() {

}
