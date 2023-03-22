const express = require("express");
const socket = require("socket.io");

// App setup
const PORT = 5000;
const app = express();
const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

// Static files
app.use(express.static("public"));

// Socket setup
const io = socket(server);

io.on("connection", function (socket) {
   console.log('a user connected: ' + socket.handshake.auth.username);
   io.emit('broadcast', {user: socket.handshake.auth.username, msg: 'hi'});

   socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('chat message', (data) => {
      io.emit('chat message', {user: data.user, msg: data.msg});
      console.log(`${data.user} sent message: ${data.msg}`);
    });
});
