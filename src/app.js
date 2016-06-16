const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const firebase = require("firebase");

import * as Controller from './controller.js';

firebase.initializeApp({
  serviceAccount: "firebaseCredentials.json",
  databaseURL: "https://project-6638516275584701777.firebaseio.com/"
});

const db = firebase.database();

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
  socket.on('addPlayer', (msg) => {
    console.log('add player');
    Controller.addPlayer(db, msg.gameID, msg.name);
  });

  socket.on('startGame', (msg) => {
    Controller.startGame(db, msg.gameID);
  });

  socket.on('makeJudgement', (msg) => {
    Controller.makeJudgement(db, msg.gameID, msg.playerID, msg.judgement);
  });

  socket.on('playCard', (msg) => {
    Controller.playCard(db, msg.gameID, msg.playerID, msg.card);
  });

});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

