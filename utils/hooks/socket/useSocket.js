import io from "socket.io-client";

import { useEffect, useRef } from "react";

export default function useSocketInit() {
  const socket = useRef(null);
  useEffect(() => {
    socketInitializer();
    return () => {
      if (socket.current) {
        socket.current.off("connect");
      }
    };
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket.current = io();

    socket.current.on("connect", () => {
      console.log("socket connected");
    });

    socket.current.on("test", () => {
      console.log("20");
      console.log("test");
    });
  };

  return socket;
}
