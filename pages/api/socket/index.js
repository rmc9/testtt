import { Server } from "socket.io";

//id430
import mobileRotation1Setup from "./id430/mobile-rotation-1";
import mobileRotation2Setup from "./id430/mobile-rotation-2";
import mobileLetterSetup from "./id430/mobile-letter";
import mobileScrollSetup from "./id430/mobile-scroll";

export default function handler(req, res) {
  if (res.socket.server.io) {
    console.log("socket already enabled");
    res.end();
    return;
  } else {
    console.log("socket enabled");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      //mobile rotation 1
      mobileRotation1Setup({ socket, io });
      //mobile rotation 2
      mobileRotation2Setup({ socket, io });
      //mobile letter
      mobileLetterSetup({ socket, io });
      //mobile scroll
      mobileScrollSetup({ socket, io });
    });
  }

  res.end();
}
