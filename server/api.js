import express from 'express';
import firebase from 'firebase';
import {generateUnique} from './id';

firebase.initializeApp({
  serviceAccount: "firebaseCredentials.json",
  databaseURL: "https://project-6638516275584701777.firebaseio.com/"
});

const db = firebase.database();
const api = express.Router();

api.get('/createGame', (req, res) => {
  const gamesListRef = db.ref('/games');
  generateUnique(gamesListRef).then(id => {
    gamesListRef.push(id);
    res.send(id);
  });
});

api.post('/addPlayer', (req, res) => {
  const playerName = req.body.playerName;
  const gameId = req.body.gameId;
  console.log(playerName)
  res.send(200);
});

export default api;
