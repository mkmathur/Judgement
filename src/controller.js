import * as Cards from './Cards.js';
import * as Game from './game.js';
import * as Model from './model.js';

export function onMakeGame(data) {
 Model.makeGame(123);
}

export function onAddPlayer(data) {
  Model.addPlayer(123, data.playerName);
}

export function onStartGame(data) {
  deck = initializeDeck();
  shuffle(deck);
  roundNumber = 0;
  maxRoundNumber = floor(deck.length / numPlayers);
}

export function onStartRound(data) {
  roundNumber = updateRoundNumber(roundNumber);

}

export function onMakeJudgement(data) {

}

export function onPlayCard(data) {

}

