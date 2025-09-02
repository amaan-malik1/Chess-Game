import { Games } from "./Games.js";
import { INIT_GAME, MOVE } from "./Messages.js";
export class GameManager {
    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }
    // adding the user
    addUser(socket) {
        this.users.push(socket);
        console.log("Current users:", this.users.length);
        this.addHandler(socket);
    }
    // removing the user
    removeUser(socket) {
        this.users = this.users.filter(user => user !== socket);
        console.log("User removed, remaining:", this.users.length);
    }
    addHandler(socket) {
        socket.on('message', (data) => {
            const message = JSON.parse(data.toString());
            // if the message is of init_game type
            if (message.type === INIT_GAME) {
                if (this.pendingUser) {
                    // starting the game
                    const game = new Games(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                }
                else {
                    this.pendingUser = socket; // this is the user that is waiting 
                }
            }
            // if the message is of move type
            if (message.type === MOVE) {
                // find the relevant game
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                game?.makeMove(socket, message.move);
            }
        });
    }
}
//# sourceMappingURL=GameManager.js.map