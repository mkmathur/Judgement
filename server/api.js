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
  const gamesRef = db.ref('/games');
  generateUnique(gamesRef).then(id => {
    const playersRef = db.ref(`/games/${id}/players`);
    playersRef.child(0).child("name").set(playerName);
    res.send(id);
  });
});

api.post('/players', (req, res) => {
  const playerName = req.body.playerName;
  const gameId = req.body.gameId;
  const playersRef = db.ref(`/games/${gameId}/players`);

  playersRef.transaction(currentData => {
    const playerId = currentData ? Object.keys(currentData).length : 0;
    const newData = currentData || {};
    newData[playerId] = {
      name: playerName
    };
    return newData;
  });

  res.send(200);
});

export default api;
