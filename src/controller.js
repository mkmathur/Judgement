import * as Cards from './Cards.js';
import * as Game from './game.js';
import * as Model from './model.js';

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
  initializeDeck(model);
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

  shuffleDeck(model);
  model.roundNumber = nextRoundNumber;
  model.resetTricks();
  model.trump = Game.nextTrump(model.trump);
  deal(model);
  model.firstPlayer = Game.nextPlayer(model.firstPlayer);
  model.state = Game.STATES.WAITING_FOR_JUDGEMENTS;
}

export function makeJudgement(data) {
  const model = new Model(DUMMY_GAME);
  if (!model.hasJudgement(data.playerID)) {
    model.setJudgement(data.playerID, data.judgement);
  }

  if (model.players.every(player => model.hasJudgement(player))) {
    model.state = Game.STATES.WAITING_FOR_CARD;
  }
}

export function playCard(data) {
  const model = new Model(DUMMY_GAME);
  if (data.playerID == model.firstPlayer) {
    model.chaal = data.card.suit;
  }
  else {
    if (!Game.validateCard(data.card, model.getPlayerHand(data.playerID), model.table, model.chaal)) return;
  }
}

function endGame() {
  const model = new Model(DUMMY_GAME);

}

function initializeDeck(model) {
  const deck = Cards.initializeDeck();
  Cards.shuffle(deck);
  model.deck = deck;
}

function shuffleDeck(model) {
  const deck = model.deck;
  Cards.shuffle(deck);
  model.deck = deck;
}

function deal(model) {
  const players = model.players;
  for (player of players) {
    const hand = [];
    Cards.deal(deck, hand, nextRoundNumber);
    model.updatePlayerHand(playerID, hand);
  }
  model.deck = deck;
}
