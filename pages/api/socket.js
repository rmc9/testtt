import { Server } from "socket.io";

export default function handler(req, res) {
  if (res.socket.server.io) {
    console.log("socket already enabled");
    res.end();
    return;
  } else {
    console.log("socket enabled");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {});
  }

  res.end();
}
