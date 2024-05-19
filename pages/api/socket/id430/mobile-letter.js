export default function visitNowSetup({ socket, io }) {
  //init
  socket.on("mobile-letter-mobile-init", () => {
    socket.join("mobile-letter");
    socket.join("mobile-letter-mobile");
  });

  socket.on("mobile-letter-screen-init", () => {
    socket.join("mobile-letter");
    socket.join("mobile-letter-screen");
  });

  socket.on("mobile-letter-new-text", (data) => {
    socket.to("mobile-letter").emit("new-mobile-letter-text", data);
  });

  socket.on("mobile-letter-new-orientation", (data) => {
    socket.to("mobile-letter").emit("new-mobile-letter-orientation", data);
  });
}
