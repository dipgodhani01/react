const { Server } = require("socket.io");

exports.io = new Server(8081, {
  cors: {
    origin: "*",
  },
});