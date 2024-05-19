export default function visitNowSetup({ socket, io }) {
  //init
  socket.on("mobile-rotation-2-mobile-init", () => {
    socket.join("mobile-rotation-2");
    socket.join("mobile-rotation-2-mobile");
  });

  socket.on("mobile-rotation-2-screen-init", () => {
    socket.join("mobile-rotation-2");
    socket.join("mobile-rotation-2-screen");
  });

  socket.on("mobile-rotation-2-new-orientation", (data) => {
    socket.to("mobile-rotation-2").emit("new-mobile-rotation-2-orientation", data);
  });
}
