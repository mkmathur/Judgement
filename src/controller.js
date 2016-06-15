function onPlayerAdded(data) {
  // add score of 0
}

function onGameStarted(data) {
  deck = initializeDeck();
  shuffle(deck);
  roundNumber = 0;
  maxRoundNumber = floor(52 / numPlayers);
}

function onRoundStarted(data) {
  roundNumber = updateRoundNumber(roundNumber);
  
}

function onJudgementReceived(data) {

}

function onCardPlayed(data) {

}

