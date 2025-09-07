import { useEffect, useState } from "react";
import { useSocket } from "../hook/useSocket";
import { Chess } from "chess.js";
import { Button } from "../components/Button";
import { ChessBoard } from "../components/ChessBoard";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export const Game = () => {
    const socket = useSocket();
    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 700);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!socket) return;

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            switch (message.type) {
                case INIT_GAME:
                    const newChess = new Chess();
                    setChess(newChess);
                    setBoard(newChess.board());
                    break;

                case MOVE:
                    const move = message.move;
                    chess.move(move);
                    setBoard(chess.board());
                    break;

                case GAME_OVER:
                    console.log("Game Over");
                    break;

                default:
                    console.log("Unknown message type:", message);
            }
        };

        return () => {
            socket.onmessage = null;
        };
    }, [socket]);

    if (!socket || loading) {
        return (
            <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
                <div className="relative w-20 h-20">
                    <div className="absolute inset-0 rounded-full border-4 border-purple-500 animate-ping"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-purple-400 opacity-75"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-6 gap-6 p-4 md:p-6">
                
                {/* Chessboard */}
                <div className="md:col-span-4 bg-gray-900 rounded-2xl shadow-lg p-4 flex items-center justify-center">
                    <ChessBoard socket={socket} board={board} />
                </div>

                {/* Sidebar */}
                <div className="md:col-span-2 bg-gray-800 rounded-2xl shadow-lg flex flex-col items-center justify-center gap-6 p-6">
                    <h2 className="text-xl md:text-2xl font-semibold text-center">
                        Game Controls
                    </h2>
                    <Button
                        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 transition rounded-lg text-lg font-medium w-full md:w-auto"
                        onClick={() => {
                            socket.send(JSON.stringify({ type: INIT_GAME }));
                        }}
                    >
                        Play New Game
                    </Button>
                </div>
            </div>
        </div>
    );
};
