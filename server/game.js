const DECK_SIZE = 52;

// const card = {
//   suit: "Spades",
//   rank: "Q"
// };

export const STATES = {
  WAITING_FOR_PLAYERS: 0,
  STARTING_GAME: 1,
  WAITING_FOR_JUDGEMENTS: 2,
  WAITING_FOR_CARD: 3,
  GAME_OVER: 4,
};

// returns a list a, where a[i] is the number of cards in each hand in round i
// for 4 players, should return: [1, 2, 3, ... , 12, 13, 12, ..., 2, 1]
export function rounds(numPlayers) {

}

export function nextTrump(currentTrump) {

}

export function nextPlayer(currentPlayerIndex, numPlayers) {

}

// hand is a list of cards
// table is a list of cards, indexed by player id
// i.e. table[0] = {'Q', 'Diamonds'} means that player 0 put down the Queen of Diamonds
export function validateCard(card, hand, table, chaal) {

}

// return id of the player who wins the trick
export function determineTrickWinner(table, chaal, trump) {

}
