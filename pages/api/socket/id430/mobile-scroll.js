export default function visitNowSetup({ socket, io }) {
  //init
  socket.on("mobile-scroll-mobile-init", () => {
    socket.join("mobile-scroll");
    socket.join("mobile-scroll-mobile");
  });

  socket.on("mobile-scroll-screen-init", () => {
    socket.join("mobile-scroll");
    socket.join("mobile-scroll-screen");
  });

  socket.on("mobile-scroll-new-scroll", (data) => {
    socket.to("mobile-scroll").emit("new-mobile-scroll-scroll", data);
  });
}
