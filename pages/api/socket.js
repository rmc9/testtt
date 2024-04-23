import { Server } from "socket.io";

//h1 2024
import selfIntroductionSetup from "./socketSetups/term1/selfIntroductionSetup";

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
