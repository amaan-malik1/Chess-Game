import WebSocket from "ws";
export declare class Games {
    player1: WebSocket;
    player2: WebSocket;
    moves: string[];
    private board;
    private moveCount;
    private startTime;
    constructor(player1: WebSocket, player2: WebSocket);
    makeMove(socket: WebSocket, move: {
        from: string;
        to: string;
    }): void;
}
//# sourceMappingURL=Games.d.ts.map