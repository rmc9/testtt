export default function visitNowSetup({ socket, io }) {
  //init
  socket.on("mobile-rotation-1-mobile-init", () => {
    socket.join("mobile-rotation-1");
    socket.join("mobile-rotation-1-mobile");
  });

  socket.on("mobile-rotation-1-screen-init", () => {
    socket.join("mobile-rotation-1");
    socket.join("mobile-rotation-1-screen");
  });

  socket.on("mobile-rotation-1-new-orientation", (data) => {
    socket.to("mobile-rotation-1").emit("new-mobile-rotation-1-orientation", data);
  });
}
