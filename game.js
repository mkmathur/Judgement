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

firebaseRef.on('child_added', onPlayerAdded);
firebaseRef.on('game_started', onGameStarted);
firebaseRef.on('round_started', onRoundStarted);
firebaseRef.on('judgement_received', onJudgementReceived);
firebaseRef.on('card_played', onCardPlayed);
