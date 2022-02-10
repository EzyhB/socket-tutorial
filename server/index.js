const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());
const server = http.createServer(app);
server.listen(3000, () => {
  console.log("server running");
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("Join_Room", (data) => {
    console.log(`User with ${socket.id} has joined the room ${data}`);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});
