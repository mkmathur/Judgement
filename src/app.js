const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

import * as Controller from './controller.js';

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
  socket.on('makeGame', Controller.makeGame);
  socket.on('addPlayer', Controller.addPlayer);
  socket.on('startGame', Controller.startGame);
  socket.on('startRound', Controller.startRound);
  socket.on('makeJudgement', Controller.makeJudgement);
  socket.on('playCard', Controller.playCard);
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

