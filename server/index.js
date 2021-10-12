const express = require("express");
const path = require("path");
const cors = require('cors')

const PORT = process.env.PORT || 3001;
const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server);

app.use(cors())
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

io.on('connection', socket => {
  console.log(`Socket connect: ${socket.id}`);

  socket.on('video.set', (urlVideo) => {
    socket.broadcast.emit('video.set', urlVideo);
  })

  socket.on('video.paused', () => {
    socket.broadcast.emit('video.paused');
  })

  socket.on('video.started', () => {
    socket.broadcast.emit('video.started');
  })
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});