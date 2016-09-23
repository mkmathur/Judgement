import express from 'express';
import firebase from 'firebase';
import {generateUnique} from './id';

firebase.initializeApp({
  serviceAccount: "firebaseCredentials.json",
  databaseURL: "https://project-6638516275584701777.firebaseio.com/"
});

const db = firebase.database();
const api = express.Router();

api.post('/games', (req, res) => {
  const playerName = req.body.playerName;
  const gamesListRef = db.ref('/games');
  generateUnique(gamesListRef).then(id => {
    db.ref(`/games/${id}/players`).child(0).set(playerName);
    res.send(id);
  });
});

api.post('/players', (req, res) => {
  const playerName = req.body.playerName;
  const gameId = req.body.gameId;

  db.ref(`/games/${gameId}/players`).transaction((players) => {
    if (players) {
      const playerId = Object.keys(players).length;
      players[playerId] = playerName;
    }
    return players;
  });

  res.send(200);
});

export default api;
