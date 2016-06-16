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
  resetTricks();
  model.trump = Game.nextTrump(model.trump);
  deal(model);
  model.firstPlayer = Game.nextPlayer(model.firstPlayer);
  model.numJudgements = 0;
  model.state = Game.STATES.WAITING_FOR_JUDGEMENTS;
}

export function makeJudgement(data) {
  const model = new Model(DUMMY_GAME);
  const playerModel = model.getPlayer(data.playerID);
  if (playerModel.judgement != null) {
    playerModel.judgement = data.judgement;
    model.numJudgements = model.numJudgements + 1
  }

  if (model.numJudgements == model.numPlayers) {
    model.state = Game.STATES.WAITING_FOR_CARD;
  }
}

export function playCard(data) {
  const model = new Model(DUMMY_GAME);
  const playerModel = model.getPlayer(data.playerID);
  if (data.playerID == model.firstPlayer) {
    model.chaal = data.card.suit;
  }
  else {
    if (!Game.validateCard(data.card, playerModel.hand, model.table, model.chaal)) return;
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
    const playerModel = model.getPlayer(player);
    playerModel.hand = hand;
  }
  model.deck = deck;
}

function resetTricks(model) {
  for (player of model.players) {
    const playerModel = model.getPlayer(player);
    playerModel.tricks = 0;
  }
}
