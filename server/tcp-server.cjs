// tcp-server.js
// Simple TCP echo server for testing Electron socket calls

const net = require("net");

const PORT = 12345; // must match the port you pass to sendTcp()
const HOST = "127.0.0.1"; // localhost

const server = net.createServer((socket) => {
  console.log("Client connected:", socket.remoteAddress, socket.remotePort);

  socket.on("data", (data) => {
    console.log("Received from client:", data.toString());
    // optional: send a reply
    socket.write("ACK from server\n");
  });

  socket.on("end", () => {
    console.log("Client disconnected");
  });

  socket.on("error", (err) => {
    console.error("Socket error:", err);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`✅ TCP server listening on ${HOST}:${PORT}`);
});
