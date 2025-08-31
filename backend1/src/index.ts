import { WebSocketServer } from "ws";
import { GameManager } from "./GameManager.js";

const wss = new WebSocketServer({ port: 8080 });
console.log("server is listening at: 8080");

const gameManager = new GameManager();

wss.on("connection", function message(socket) {
    //after connecting the server add user
    gameManager.addUser(socket);

    //after disconnecting the server remove user
    socket.on("disconnect", () => { gameManager.removeUser(socket) })
})