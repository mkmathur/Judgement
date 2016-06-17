const DECK_SIZE = 52;

export const STATES = {
  WAITING_FOR_PLAYERS: 0,
  STARTING_GAME: 1,
  WAITING_FOR_JUDGEMENTS: 2,
  WAITING_FOR_CARD: 3,
  GAME_OVER: 4,
};

export function maxRoundNumber(numPlayers) {
  return Math.floor(DECK_SIZE / numPlayers);
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
