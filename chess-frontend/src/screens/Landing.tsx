import React from "react";
import chessBoard from "../assets/chessBoard.png";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="landing min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white flex flex-col">
            {/* Top stats bar */}
            <div className="flex justify-center items-center gap-10 py-6 text-gray-300 text-lg font-medium border-b border-white/10">
                <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-white">2,390,904</span>
                    <span className="text-sm tracking-wide uppercase">Playing Now</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-white">930,744,093</span>
                    <span className="text-sm tracking-wide uppercase">Games Today</span>
                </div>
            </div>

            {/* Main hero section */}
            <div className="flex flex-1 items-center justify-center w-[90%] mx-auto gap-10 py-12">
                {/* Left: background image */}
                <div
                    className="relative w-[50%] h-[500px] rounded-2xl shadow-2xl bg-cover bg-center overflow-hidden"
                    style={{ backgroundImage: `url(${chessBoard})` }}
                >
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent" />
                </div>

                {/* Right: content */}
                <div className="w-[50%] flex flex-col items-center justify-center text-center space-y-8">
                    <div className="space-y-3">
                        <h1 className="text-5xl font-extrabold tracking-tight drop-shadow-lg">
                            Play Chess
                        </h1>
                        <p className="text-xl text-gray-300">
                            Sharpen your mind, improve your strategy, and enjoy the game with
                            players worldwide.
                        </p>
                    </div>

                    <Button
                        onClick={() => navigate("/game")}
                    >
                        Play Online
                    </Button>
                </div>
            </div>
        </div>
    );
};
