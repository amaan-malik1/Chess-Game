import { Chess } from "chess.js";
import { GAME_OVER, INIT_GAME, MOVE } from "./Messages.js";
export class Games {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.moves = [];
        this.moveCount = 0;
        this.board = new Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "black"
            }
        }));
    }
    makeMove(socket, move) {
        console.log("inside makeMove");
        // validate the type of move or who made the move
        if (this.moveCount % 2 === 0 && socket !== this.player1) {
            console.error("Invalid move attempt by player1");
            return;
        }
        if (this.moveCount % 2 === 1 && socket !== this.player2) {
            console.error("Invalid move attempt by player2");
            return;
        }
        console.log("did not early return");
        //trying to update the board
        const result = this.board.move(move);
        if (!result) {
            console.error("Invalid move:", move);
            return; // stop execution for invalid move
        }
        this.moveCount++;
        console.log("move successful in try block");
        //check the game is over?
        if (this.board.isGameOver()) {
            this.player1.send(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() === 'w' ? 'black' : 'white'
                }
            }));
            this.player2.send(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() === 'w' ? 'black' : 'white'
                }
            }));
            return;
        }
        //if not over
        console.log(this.moveCount % 2);
        if (this.moveCount % 2 === 0) {
            console.log("sent1");
            this.player2.send(JSON.stringify({
                type: MOVE,
                move: move,
            }));
        }
        else {
            console.log("sent2");
            this.player1.send(JSON.stringify({
                type: MOVE,
                move: move,
            }));
            return;
        }
    }
}
//# sourceMappingURL=Games.js.map