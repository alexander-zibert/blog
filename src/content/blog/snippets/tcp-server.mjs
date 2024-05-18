import net from "node:net";

const server = net.createServer((socket) => {
  // 'connection' listener.
  console.log(
    "client connected",
    socket.remoteAddress,
    socket.remotePort,
    socket.remoteFamily
  );
  socket.on("end", () => {
    console.log("client disconnected");
  });

  socket.on("data", (data) => {
    console.log(data.toString("utf-8"));
  });
});

server.listen(8080, "localhost");
