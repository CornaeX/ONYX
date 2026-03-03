import { useState, useMemo } from "react";
import { useStore } from "../../../store/useStore";
import placeBetSFX from "../../../assets/sounds/betplace.mp3";
import cardSwipeSFX from "../../../assets/sounds/cardswipe.mp3";
import clearBetSFX from "../../../assets/sounds/clearbet.mp3";
import winSFX from "../../../assets/sounds/win.mp3";
import loseSFX from "../../../assets/sounds/lose.mp3";

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
});

export function MysteryDraw() {
    const balance = useStore((state) => state.balance);
    const setBalance = useStore((state) => state.setBalance);

    const [currentBet, setCurrentBet] = useState<number>(0);
    const [selectedCard, setSelectedCard] = useState<number | null>(null);
    const [revealedIndex, setRevealedIndex] = useState<number | null>(null);
    const [shuffledMultipliers, setShuffledMultipliers] = useState<number[]>([]);
    const [gameState, setGameState] = useState<
        "betting" | "ready" | "playing" | "revealed"
    >("betting");
    const [message, setMessage] = useState<string>("");

    const sounds = useMemo(() => ({
        bet: new Audio(placeBetSFX),
        swipe: new Audio(cardSwipeSFX),
        clear: new Audio(clearBetSFX),
        win: new Audio(winSFX),
        lose: new Audio(loseSFX),
    }), []);

    const playSound = (type: keyof typeof sounds) => {
        const audio = sounds[type];
        audio.currentTime = 0;
        audio.play().catch(() => { });
    };

    const addBet = (amount: number) => {
        if (balance >= amount) {
            setBalance(balance - amount);
            setCurrentBet(prev => prev + amount);
            playSound("bet");

            if (gameState === "betting") {
                setGameState("ready");
            }
        }
    };

    const clearBet = () => {
        setBalance(balance + currentBet);
        setCurrentBet(0);
        playSound("clear");
    };

    const allIn = () => {
        const amount = Math.floor(balance);
        if (amount > 0) {
            setCurrentBet((prev) => prev + amount);
            setBalance(balance - amount);
            playSound("bet");
        }
    };

    const startGame = async () => {
        if (currentBet === 0) return;

        const res = await fetch(
            "https://onyxbackend.share.zrok.io/api/luckycard/start",
            {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify({ bet: currentBet }),
            }
        );

        const data = await res.json();

        setBalance(data.balance);
        setShuffledMultipliers(data.multipliers);
        setGameState("playing");
    };

    const pickCard = async (index: number) => {
        if (selectedCard !== null) return;

        // 1️⃣ Lock selection immediately
        setSelectedCard(index);
        setRevealedIndex(index);

        try {
            const res = await fetch(
                "https://onyxbackend.share.zrok.io/api/luckycard/pick",
                {
                    method: "POST",
                    headers: getAuthHeaders(),
                    body: JSON.stringify({ index }),
                }
            );

            const data = await res.json();

            // 2️⃣ Small delay for flip animation feel
            setTimeout(() => {
                setBalance(data.balance);

                if (data.payout > 0) {
                    playSound("win");
                } else {
                    playSound("lose");
                }

                setMessage(
                    data.payout > 0
                        ? `You won $${data.payout.toFixed(2)}`
                        : "You lost"
                );

                setGameState("revealed");
            }, 500); // animation delay

        } catch (err) {
            console.error(err);
        }
    };

    const resetGame = () => {
        setGameState("betting");
        setCurrentBet(0);
        setSelectedCard(null);
        setRevealedIndex(null);
        setMessage("");
    };

    return (
        <div className="flex flex-col items-center justify-between h-[650px] w-full max-w-4xl mx-auto bg-[#070E20] rounded-2xl border border-gray-800 p-8 shadow-2xl relative overflow-hidden font-sans text-white">

            {/* TOP BAR */}
            <div className="w-full flex justify-between items-center border-b border-gray-800 pb-4">
                <div className="text-gray-400 font-bold">
                    Points:
                    <span className="text-green-400 text-xl ml-2">
                        {(balance || 0).toFixed(2)} ★
                    </span>
                </div>
                <div className="text-gray-400 font-bold">
                    Points Used:
                    <span className="text-yellow-400 text-xl ml-2">
                        {currentBet.toFixed(2)} ★
                    </span>
                </div>
            </div>

            {/* CENTER STAGE */}
            <div className="flex-1 w-full flex flex-col items-center justify-center z-10 my-4">

                {gameState === "betting" || gameState === "ready" ? (
                    <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">

                        {/* Bet Circle */}
                        <div className="w-32 h-32 rounded-full border-2 border-dashed border-blue-500/50 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                            <span className="text-yellow-400 text-3xl font-bold">
                                {currentBet.toFixed(2)} ★
                            </span>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-300">
                            {currentBet > 0 ? "Ready to Play" : "Choose Your Points"}
                        </h2>
                    </div>

                ) : (
                    <div className="flex flex-col items-center gap-8">

                        {message && (
                            <div className="bg-blue-600 px-6 py-2 rounded-full font-bold shadow-lg animate-bounce">
                                {message}
                            </div>
                        )}

                        {gameState === "playing" && (
                            <div className="grid grid-cols-3 gap-6">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <div
                                        key={index}
                                        onClick={() => pickCard(index)}
                                        className="w-28 h-40 cursor-pointer [perspective:1000px]"
                                    >
                                        <div
                                            className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d]
                                            ${revealedIndex === index ? "[transform:rotateY(180deg)]" : ""}`}
                                        >
                                            {/* FRONT */}
                                            <div className="absolute inset-0 flex items-center justify-center rounded-xl border border-gray-700 shadow-lg bg-gradient-to-br from-blue-900 to-blue-700 [backface-visibility:hidden]">
                                                🎴
                                            </div>

                                            {/* BACK */}
                                            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-white text-black text-2xl font-black
                                            [transform:rotateY(180deg)] [backface-visibility:hidden]">
                                                {shuffledMultipliers[index]}x
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                )}

            </div>

            {/* BOTTOM CONTROLS */}
            <div className="w-full p-4 bg-[#0B1426] rounded-xl border border-gray-800 flex justify-center mt-auto">

                {gameState === "betting" || gameState === "ready" ? (
                    <div className="flex flex-col items-center gap-4 w-full">
                        <div className="flex gap-4">
                            {[10, 25, 50, 100].map((amt) => (
                                <button
                                    key={amt}
                                    onClick={() => addBet(amt)}
                                    disabled={balance < amt}
                                    className="w-14 h-14 rounded-full font-bold text-sm border-2 border-dashed bg-[#112240] border-gray-600 hover:border-blue-400 hover:text-blue-400 transition-transform hover:scale-110 disabled:opacity-50"
                                >
                                    {amt} ★
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={clearBet}
                                disabled={currentBet === 0}
                                className="px-6 py-2 rounded border border-red-900/50 hover:bg-red-900/30 font-bold"
                            >
                                Clear
                            </button>

                            <button
                                onClick={startGame}
                                disabled={currentBet === 0}
                                className="px-10 py-2 rounded bg-green-600 hover:bg-green-500 font-bold disabled:opacity-50"
                            >
                                Play
                            </button>

                            <button
                                onClick={allIn}
                                disabled={balance < 1}
                                className="px-6 py-2 rounded border border-yellow-900/50 hover:bg-yellow-900/30 font-bold"
                            >
                                All In
                            </button>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={resetGame}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-10 rounded transition-all"
                    >
                        NEW GAME
                    </button>
                )}
            </div>
        </div>
    );
}