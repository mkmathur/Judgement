const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

import * as Controller from './controller.js';

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
  socket.on('addPlayer', (msg) => {
    Controller.addPlayer(msg.gameID, msg.name);
  });

  socket.on('startGame', (msg) => {
    Controller.startGame(msg.gameID);
  });

  socket.on('startRound', (msg) => {
    Controller.startRound(msg.gameID);
  });

  socket.on('makeJudgement', (msg) => {
    Controller.makeJudgement(msg.gameID, msg.playerID, msg.judgement);
  });

  socket.on('playCard', (msg) => {
    Controller.playCard(msg.gameID, msg.playerID, msg.card);
  });

});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

