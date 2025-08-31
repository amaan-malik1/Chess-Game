import WebSocket from "ws";
import { Chess } from 'chess'
import { GAME_OVER, MOVE } from "./message.js";

export class Games {
    public player1: WebSocket;
    public player2: WebSocket;
    public moves: string[];
    private board: Chess;
    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.moves = [];
        this.board = new Chess();
        this.startTime = new Date();
    }

    makeMove(socket: WebSocket, move: { from: string, to: string }) {
        // validate the type of move or who made the move
        if (this.board.move.length % 2 === 0 && socket !== this.player1) {
            return;
        }
        if (this.board.move.length % 2 === 0 && socket !== this.player2) {
            return;
        }

        //trying to update the board
        try {
            this.board.move(move);
        } catch (error) {
            console.error("Invalid move:", error);
        }

        //check the game is over?
        if (this.isGameOver()) {
            this.player1.emit(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() === 'w' ? 'black' : 'white'
                }
            }));
            this.player2.emit(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() === 'w' ? 'black' : 'white'
                }
            }));
            return;
        }

        //if not over
        if (this.board.move.length % 2 === 0) {
            this.player2.emit(JSON.stringify({
                type: MOVE,
                payload: move,
            }));
        }
        else {
            this.player1.emit(JSON.stringify({
                type: MOVE,
                payload: move,
            }));
            return;
        }

    }