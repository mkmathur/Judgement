import * as Cards from './Cards.js';
import * as Game from './game.js';
import * as Model from './model.js';

const DUMMY_GAME = 123;

export function makeGame() {
  // TODO: maybe move this to REST API?
}

export function addPlayer(gameID, name) {
  const model = new Model(DUMMY_GAME);
  model.addPlayer(name);
}

export function startGame(gameID) {
  const model = new Model(DUMMY_GAME);
  initializeDeck(model);
  model.roundNumber = 0;
  model.maxRoundNumber = Game.maxRoundNumber(model.numPlayers);
  startRound();
}

export function startRound(gameID) {
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

export function makeJudgement(gameID, playerID, judgement) {
  const model = new Model(DUMMY_GAME);
  const playerModel = model.getPlayer(playerID);
  if (playerModel.judgement != null) {
    playerModel.judgement = judgement;
    model.numJudgements = model.numJudgements + 1
    if (model.numJudgements == model.numPlayers) {
      model.state = Game.STATES.WAITING_FOR_CARD;
    }
  }
}

export function playCard(gameID, playerID, card) {
  const model = new Model(DUMMY_GAME);
  const playerModel = model.getPlayer(playerID);
  if (playerID == model.firstPlayer) {
    model.chaal = card.suit;
  }
  else {
    if (!Game.validateCard(card, playerModel.hand, model.table, model.chaal)) return;
  }
  addCardToTable(model, card);
  removeFromHand(playerModel, card);
  if (model.table.length == model.numPlayers) {
    endRound(model);
  }
}

function endRound(model) {
    const winner = Game.determineTrickWinner(model.table, model.chaal, model.trump);
    const winnerModel = model.getPlayer(winner);
    winnerModel.tricks = winnerModel.tricks + 1;
    if (winnerModel.hand.length == 0) {
      updateScores(model);
      startRound();
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

function addCardToTable(model, card) {
  // TODO
}

function removeFromHand(playerModel, card) {
  // TODO
}


function updateScores(model) {
  // TODO
}
