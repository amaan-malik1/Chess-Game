import { useEffect, useState } from "react";
import { ChessChess } from "../components/ChessChess";
import { useSocket } from "../hook/useSocket";
import { Chess } from "chess.js";

//TODO: Move tpgether, there is the code repitation here
export const INIT_GAME = "init_game"
export const MOVE = "move"
export const GAME_OVER = "game_over"


export const Game = () => {
    const socket = useSocket();
    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState("");

    useEffect(() => {
        if (!socket) {
            return;

        };
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log(message);

            switch (message.type) {
                case INIT_GAME:
                    setChess(new Chess());
                    setBoard(message.board);
                    console.log("Game initialized");
                    break;

                case MOVE:
                    const move = message.move;
                    chess.move(move);
                    setBoard(chess.board());
                    console.log("User making moves");
                    break;
                case GAME_OVER:
                    console.log("Game Over");
                    break;
            }

        }
    }, [socket])

    if (!socket) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="flex justify-center">
                <div className="pt-8 max-w-screen-lg ">
                    <div className="grid grid-cols-6 gap-4 mg:grid-col-2">
                        <div className="col-span-4 bg-red-20 w-full ">
                            <ChessChess />
                        </div>
                        <div className="col-span-2 bg-red-200">
                            <button onClick={() => socket.send(JSON.stringify({
                                type: INIT_GAME,

                            }))}>
                                Play
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}