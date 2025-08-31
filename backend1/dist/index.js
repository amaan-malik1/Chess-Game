import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8080 });
console.log("server is listening at: 8080");
wss.on("connection", function message(socket) {
    console.log("user connected");
    socket.on('error', console.error);
    socket.on('message', (msg) => {
        console.log(msg);
    });
});
//# sourceMappingURL=index.js.map