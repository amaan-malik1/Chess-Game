import type { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";

/* ChessBoard.tsx */
export const ChessBoard = ({
    board,
    socket,
}: {
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][];
    socket: WebSocket;
}) => {
    const [fromSquare, setFromSquare] = useState<null | Square>(null);
    const [toSquare, setToSquare] = useState<null | Square>(null);

    return (
        <div className="grid grid-rows-8 gap-0 border-4 border-gray-800 rounded-xl overflow-hidden shadow-lg">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-8">
                    {row.map((square, colIndex) => {
                        const isDark = (rowIndex + colIndex) % 2 === 1;
                        return (
                            <div
                                key={colIndex}
                                className={`flex items-center justify-center aspect-square text-2xl font-bold
                                    ${isDark ? "bg-green-700" : "bg-green-400"}
                                    text-white select-none transition-colors duration-300`}
                            >
                                {square ? (
                                    <span className={`drop-shadow-lg ${square.color === "w" ? "text-green-100" : "text-white"}`}>
                                        {square.type.toUpperCase()}
                                    </span>
                                ) : null}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};
