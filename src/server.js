import http from 'http';
import SocketIO from 'socket.io';
import express from 'express';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (req, res) => res.render('home'));

const handleListen = () => console.log('Listening on http://localhost:3000');

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on('connection', (socket) => {
  socket.on('enter_room', (roomName, done) => {
    console.log(roomName);
    setTimeout(() => {
      done("hello from the backend");
    }, 1000);
  });
});

/* const sockets = [];
const wss = new WebSocket.Server({ server });
wss.on('connection', (socket) => {
  sockets.push(socket);
  socket['nickname'] = 'Anon';
  console.log('Connected to Browser ✔');
  socket.on('close', () => console.log('Disconnected from the browser'));
  socket.on('message', (msg) => {
    const message = JSON.parse(msg);
    console.log(message);
    switch (message.type) {
      case 'new_message':
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname}: ${message.payload}`),
        );
      case 'nickname':
        socket['nickname'] = message.payload;
    }
  });
}); */

httpServer.listen(3000, handleListen);
