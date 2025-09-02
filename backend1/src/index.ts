import { WebSocketServer } from "ws";
import { GameManager } from "./GameManager.js";

const wss = new WebSocketServer({ port: 8080 });
console.log("server is listening at: ws://localhost:8080");

const gameManager = new GameManager();

wss.on("connection", function message(socket) {
    console.log("A new client connected!");
    //after connecting the server add user
    gameManager.addUser(socket);

    //after disconnecting the server remove user
    socket.on("close", () => gameManager.removeUser(socket))
})