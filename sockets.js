let readyPlayerCount = 0;

function listen(socketIo) {
  const pongNamespace = socketIo.of('/pong');
  pongNamespace.on('connection', (socket) => {
    let room;
    console.log('A user connected...', socket.id);

      socket.on('ready', () => {
        room = 'room' + Math.floor(readyPlayerCount / 2);
        socket.join(room);

        console.log('Player is Ready', socket.id, room);

        readyPlayerCount++;

        if (readyPlayerCount % 2 === 0) {
          pongNamespace.in(room).emit('startGame', socket.id);
        }
      });

        // Handle paddle movement
      socket.on('paddleMove', (paddleData) => {
        socket.to(room).emit('paddleMove', paddleData);
      });

        // Handle ball movement
      socket.on('ballMove', (ballData) => {
        socket.to(room).emit('ballMove', ballData);
      });

        // Handle disconnection
      socket.on('disconnect', (reason) => {
        console.log(`Client ${socket.id} disconnected: ${reason}`);
        socket.leave(room);
          // readyPlayerCount = Math.max(0, readyPlayerCount - 1); // Prevent negative ready count
      });
  });
}

module.exports = {
  listen,
};
