const DECK_SIZE = 52;

export const STATES = {
  WAITING_FOR_PLAYERS: 0,
  WAITING_FOR_JUDGEMENTS: 1,
  WAITING_FOR_CARD: 2,
  GAME_OVER: 3,
};

export function maxRoundNumber(numPlayers) {
  return floor(DECK_SIZE / numPlayers);
}

export function nextRoundNumber(num, max) {

}

export function nextTrump(suit) {

}

export function nextPlayer(playerID) {

}

export function validateCard(card, hand, table, chaal) {

}

export function determineTrickWinner(table, chaal, trump) {

}
