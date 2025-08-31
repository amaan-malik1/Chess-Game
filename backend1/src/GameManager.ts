import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./message.js";
import { Games } from "./Games.js";

export class GameManager {
    private games: Games[];
    private pendingUser: WebSocket | null;     // for making the game player connection
    private users: WebSocket[];  //ARRAY OF USERS    

    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }

    addUser(socket: WebSocket) {
        this.users.push(socket);

    }
    removeUser(socket: WebSocket) {
        this.users.filter(user => user !== socket);     //here the user is the current user and cheking it witth the socket user 
        this.addHandler(socket);
    }

    private addHandler(socket: WebSocket) {
        socket.on('message', (data) => {
            const message = JSON.parse(data.toString());

            //if the message is of init_game type
            if (message.type == INIT_GAME) {
                if (this.pendingUser) {
                    //starting the game
                    const game = new Games(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                }
                else {
                    this.pendingUser = socket;  //this is the user that is waiting 
                }
            }

            //if the message is of move type
            if (message.type == MOVE) {
                //finding the relevant game
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket)

                //making the moves
                if (game) {
                    game.makeMove(socket, message.move);
                }
            }
        })


    }

}