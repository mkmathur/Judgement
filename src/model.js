export class Model {
  constructor(db, gameID) {
    this.gameRef = db.ref('games/${gameID}');
  }

  addPlayer(name) {
    this.gameRef.ref('players').push(name);
  }

  // get list of player IDs
  get players() {

  }

  getPlayer(playerID) {
    return new PlayerModel(gameRef, playerID);
  }

  get numPlayers() {

  }

  set deck(deck) {

  }

  get deck() {

  }

  set roundNumber(num) {

  }

  get roundNumber() {

  }

  set maxRoundNumber(num) {

  }

  set trump(suit) {

  }

  get trump() {

  }

  set state(state) {

  }

  get state() {

  }

  set table(cards) {

  }

  get table() {

  }

  set chaal(suit) {

  }

  get chaal() {

  }

  set firstPlayer(playerID) {

  }

  get firstPlayer() {

  }

  set numJudgements(num) {

  }

  get numJudgements() {

  }

}

class PlayerModel {
  constructor(gameRef, playerID) {

  }

  set hand(cards) {

  }

  get hand() {

  }

  set score(num) {

  }

  get score() {

  }

  set tricks(num) {

  }

  get tricks() {

  }

  set judgement(num) {

  }

  get judgement() {

  }
}
