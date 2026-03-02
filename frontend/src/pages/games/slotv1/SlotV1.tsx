import { useState, useMemo } from "react";
import { useStore } from "../../../store/useStore";
import placeBetSFX from "../../../assets/sounds/betplace.mp3";
import spinSFX from "../../../assets/sounds/cardswipe.mp3";
import winSFX from "../../../assets/sounds/win.mp3";
import loseSFX from "../../../assets/sounds/lose.mp3";

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
});

export function SlotV1() {
  const balance = useStore((state) => state.balance);
  const setBalance = useStore((state) => state.setBalance);
  const setRakeback = useStore((state) => state.setRakeback);

  const [currentBet, setCurrentBet] = useState<number>(0);
  const [reels, setReels] = useState<string[]>(["❓", "❓", "❓"]);
  const [gameState, setGameState] = useState<
    "betting" | "ready" | "spinning" | "result"
  >("betting");
  const [message, setMessage] = useState<string>("");

  const sounds = useMemo(
    () => ({
      bet: new Audio(placeBetSFX),
      spin: new Audio(spinSFX),
      win: new Audio(winSFX),
      lose: new Audio(loseSFX),
    }),
    []
  );

  const playSound = (type: keyof typeof sounds) => {
    const audio = sounds[type];
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  const addBet = (amount: number) => {
    if (balance >= amount) {
      setBalance(balance - amount);
      setCurrentBet((prev) => prev + amount);
      playSound("bet");

      if (gameState === "betting") {
        setGameState("ready");
      }
    }
  };

  const clearBet = () => {
    setBalance(balance + currentBet);
    setCurrentBet(0);
    setGameState("betting");
  };

  const allIn = () => {
    const amount = Math.floor(balance);
    if (amount > 0) {
      setCurrentBet((prev) => prev + amount);
      setBalance(balance - amount);
      setGameState("ready");
      playSound("bet");
    }
  };

  const spin = async () => {
    if (currentBet === 0 || gameState === "spinning") return;

    setGameState("spinning");
    setMessage("");
    playSound("spin");

    try {
      const res = await fetch(
        "https://onyxbackend.share.zrok.io/api/slot/spin",
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({ bet: currentBet }),
        }
      );

      const data = await res.json();

      // Fake visual spin animation
      let cycles = 0;
      const symbols = ["🍒", "🍋", "🔔", "💎", "7️⃣"];

      const interval = setInterval(() => {
        setReels([
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)],
        ]);
        cycles++;

        if (cycles > 15) {
          clearInterval(interval);

          setReels(data.result);
          setBalance(data.balance);
          setRakeback(data.rakebackAvailable);

          if (data.payout > 0) {
            playSound("win");
            setMessage(`You won $${data.payout.toFixed(2)}`);
          } else {
            playSound("lose");
            setMessage("You lost");
          }

          setGameState("result");
        }
      }, 100);
    } catch (err) {
      console.error(err);
    }
  };

  const resetGame = () => {
    if (gameState === "spinning") return; // Prevent reset during spin
    setGameState("betting");
    setCurrentBet(0);
    setReels(["❓", "❓", "❓"]);
    setMessage("");
  };

  return (
    <div className="flex flex-col items-center justify-between h-[650px] w-full max-w-4xl mx-auto bg-[#070E20] rounded-2xl border border-gray-800 p-8 shadow-2xl relative overflow-hidden text-white">

      {/* TOP BAR */}
      <div className="w-full flex justify-between items-center border-b border-gray-800 pb-4">
        <div className="text-gray-400 font-bold">
          Bankroll:
          <span className="text-green-400 text-xl ml-2">
            ${(balance || 0).toFixed(2)}
          </span>
        </div>
        <div className="text-gray-400 font-bold">
          Current Bet:
          <span className="text-yellow-400 text-xl ml-2">
            ${currentBet.toFixed(2)}
          </span>
        </div>
      </div>

      {/* CENTER STAGE */}
      <div className="flex-1 w-full flex flex-col items-center justify-center z-10 my-4">

        {gameState === "betting" || gameState === "ready" ? (
          <div className="flex flex-col items-center">

            <div className="w-32 h-32 rounded-full border-2 border-dashed border-blue-500/50 flex items-center justify-center mb-6">
              <span className="text-yellow-400 text-3xl font-bold">
                ${currentBet.toFixed(2)}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-gray-300">
              {currentBet > 0 ? "Ready to Spin" : "Place Your Bets"}
            </h2>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6">

            {message && (
              <div className="bg-blue-600 px-6 py-2 rounded-full font-bold shadow-lg">
                {message}
              </div>
            )}

            <div className="flex gap-6">
              {reels.map((symbol, index) => (
                <div
                  key={index}
                  className={`w-28 h-32 flex items-center justify-center text-4xl rounded-xl bg-gradient-to-br from-gray-200 to-white text-black shadow-inner transition-all duration-300
                  ${
                    message.includes("won")
                      ? "shadow-yellow-400/70 shadow-lg scale-105"
                      : ""
                  }`}
                >
                  {symbol}
                </div>
              ))}
            </div>
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
                  ${amt}
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
                onClick={spin}
                disabled={currentBet === 0}
                className="px-10 py-2 rounded bg-green-600 hover:bg-green-500 font-bold disabled:opacity-50"
              >
                Spin
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
            // Disable the button if the reels are currently spinning
            disabled={gameState === "spinning"}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-10 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {gameState === "spinning" ? "SPINNING..." : "NEW BET"}
          </button>
        )}
      </div>
    </div>
  );
}