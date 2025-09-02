import React from "react";
import chessBoard from '../assets/chessBoard.png'


export const Landing = () => {
    return (
        <div className="landing bg-black/90 text-white">
            <div className="landing-wrapper ">
                {/* top part of the page */}
                <div className="flex justify-center items-center ">
                    <div>
                        2390904
                        <span> Playing</span>
                    </div>
                    <div>
                        930744093
                        <span> Games Today </span>
                    </div>
                </div>

                {/* bottom part of the page */}
                <div className="landing-container flex items-center justify-center gap-10 w-[80vw] h-[100vh] m-auto">
                    <div
                        className="flex justify-between items-center w-[50%] h-full shadow-lg bg-cover bg-center"
                        style={{ backgroundImage: `url(${chessBoard})` }}
                    >
                        {/* Optional overlay for readability */}
                    </div>
                    <div className="bg-black/40 w-[50%] h-full flex items-center justify-center">
                        <div className="text-center text-white space-y-6">
                            <div className="content">
                                <h2 className="text-5xl font-bold tracking-wide">Play Chess</h2>
                                <h2 className="text-4xl opacity-90">Improve Your Game</h2>
                                <h2 className="text-4xl opacity-90">Have Fun!</h2>

                            </div>
                            <button className="bg-slate-800 w-[90%] hover:bg-slate-800/80 px-8 py-4 rounded-lg shadow-md transition duration-300">
                                Get Started
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}