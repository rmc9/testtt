export default function visitNowSetup({ socket, io }) {
  //init
  socket.on("mobile-audio-mobile-init", () => {
    socket.join("mobile-audio");
    socket.join("mobile-audio-mobile");
  });

  socket.on("mobile-audio-screen-init", () => {
    socket.join("mobile-audio");
    socket.join("mobile-audio-screen");
  });

  socket.on("mobile-audio-new-data", (data) => {
    socket.to("mobile-audio").emit("new-mobile-audio-data", data);
  });
}
