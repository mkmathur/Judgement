import * as Cards from './Cards.js';
import * as Game from './game.js';
import * as Model from './model.js';

const DUMMY_GAME = 'rysE3FxS';

function makeGame() {
  // TODO: maybe move this to REST API?
}

export function addPlayer(db, gameID, name) {
  const model = new Model(db, DUMMY_GAME);
  if (model.state == Game.STATES.WAITING_FOR_PLAYERS) {
    model.addPlayer(name);
  }
}

export function startGame(db, gameID) {
  const model = new Model(db, DUMMY_GAME);
  if (model.state != Game.STATES.WAITING_FOR_PLAYERS) {
    return;
  }

  model.state = Game.STATES.STARTING_GAME;
  initializeDeck(model);
  model.roundNumber = 0;
  model.maxRoundNumber = Game.maxRoundNumber(model.numPlayers);
  startRound(model);
}

export function makeJudgement(db, gameID, playerID, judgement) {
  const model = new Model(db, DUMMY_GAME);
  if (model.state != Game.STATES.WAITING_FOR_JUDGEMENTS) {
    return;
  }

  const playerModel = model.getPlayer(playerID);
  if (playerModel.judgement != null) {
    playerModel.judgement = judgement;
    model.numJudgements = model.numJudgements + 1
    if (model.numJudgements == model.numPlayers) {
      model.state = Game.STATES.WAITING_FOR_CARD;
    }
  }
}

export function playCard(db, gameID, playerID, card) {
  const model = new Model(db, DUMMY_GAME);
  if (model.state != Game.STATES.WAITING_FOR_CARD || model.nextTurn != playerID) {
    return;
  }

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
    endTrick(model);
  }
}


// HELPERS

function startRound(model) {
  const nextRoundNumber = Game.nextRoundNumber(model.roundNumber, model.maxRoundNumber);
  if (nextRoundNumber == 0) {
    endGame(model);
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

function endTrick(model) {
    const winner = Game.determineTrickWinner(model.table, model.chaal, model.trump);
    const winnerModel = model.getPlayer(winner);
    winnerModel.tricks = winnerModel.tricks + 1;
    if (winnerModel.hand.length == 0) {
      updateScores(model);
      startRound();
    }
}

function endGame(model) {

}

function initializeDeck(model) {
  const deck = Cards.initializeDeck();
  model.deck = Cards.shuffle(deck);
}

function shuffleDeck(model) {
  const deck = model.deck;
  model.deck = Cards.shuffle(deck);
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
