const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

import * as Controller from './controller.js';

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
  socket.on('makeGame', Controller.onMakeGame);
  socket.on('addPlayer', Controller.onAddPlayer);
  socket.on('startGame', Controller.onStartGame);
  socket.on('startRound', Controller.onStartRound);
  socket.on('makeJudgement', Controller.onMakeJudgement);
  socket.on('playCard', Controller.onPlayCard);
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

