import { useState, useEffect, useMemo } from "react";
import { useStore } from "../../../store/useStore";
import placeBetSFX from "../../../assets/sounds/betplace.mp3";
import winSFX from "../../../assets/sounds/win.mp3";
import loseSFX from "../../../assets/sounds/lose.mp3";
import clearBetSFX from "../../../assets/sounds/clearbet.mp3";

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
});

export function MultiplierRush() {
  const balance = useStore((s) => s.balance);
  const setBalance = useStore((s) => s.setBalance);
  const setRakeback = useStore((s) => s.setRakeback);

  const [currentBet, setCurrentBet] = useState(0);
  const [serverCrashPoint, setServerCrashPoint] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [crashed, setCrashed] = useState(false);
  const [message, setMessage] = useState("");

  const sounds = useMemo(() => ({
    bet: new Audio(placeBetSFX),
    win: new Audio(winSFX),
    lose: new Audio(loseSFX),
    clear: new Audio(clearBetSFX),
  }), []);

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
    }
  };

  const clearBet = () => {
    setBalance(balance + currentBet);
    setCurrentBet(0);
    playSound("clear");
  };

  const allIn = () => {
    const amt = Math.floor(balance);
    if (amt > 0) {
      setBalance(balance - amt);
      setCurrentBet((prev) => prev + amt);
      playSound("bet");
    }
  };

  const startGame = async () => {
    if (currentBet === 0) return;

    const res = await fetch(
      "https://onyxbackend.share.zrok.io/api/crash/start",
      {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(currentBet),
      }
    );

    const data = await res.json();

    setBalance(data.balance);
    setRakeback(data.rakebackAvailable);
    setServerCrashPoint(data.crashPoint);

    setMultiplier(1);
    setCrashed(false);
    setPlaying(true);
    setMessage("");
  };

  useEffect(() => {
    if (!playing || !serverCrashPoint) return;

    const interval = setInterval(() => {
        setMultiplier((prev) => {
        const next = prev + 0.0005; // Smooth increment

        // Check if we hit the server's crash point
        if (next >= serverCrashPoint) {
            clearInterval(interval);
            setCrashed(true);
            setPlaying(false);
            setMessage(`CRASHED AT ${serverCrashPoint.toFixed(4)}x 💥`);
            setCurrentBet(0);
            playSound("lose");
            return serverCrashPoint; // Lock it at the exact crash point
        }

        return next;
        });
    }, 100); // Lower interval = smoother animation

    return () => clearInterval(interval);
    }, [playing, serverCrashPoint]);

  const cashOut = async () => {
    setPlaying(false);
  const res = await fetch("https://onyxbackend.share.zrok.io/api/crash/cashout", {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(multiplier)
  });

  const data = await res.json();

  setBalance(data.balance);
  setRakeback(data.rakebackAvailable);

  setPlaying(false);
  setCurrentBet(0); // <--- Add this to reset bet on win
  setMessage(`Cashed out at ${multiplier.toFixed(4)}x`);
  playSound("win");
};

  // const resetGame = () => {
  //   setCurrentBet(0);
  //   setMultiplier(1);
  //   setPlaying(false);
  //   setCrashed(false);
  //   setMessage("");
  // };

  return (
    <div className="flex flex-col items-center justify-between h-[650px] w-full max-w-4xl mx-auto bg-[#070E20] rounded-2xl border border-gray-800 p-8 shadow-2xl relative overflow-hidden text-white">

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
<div className="flex-1 flex flex-col items-center justify-center">
  {/* The Multiplier */}
  <div className={`text-6xl font-black transition-all duration-200 ${
    crashed ? "text-red-500" : "text-green-400"
  }`}>
    {multiplier.toFixed(4)}x
  </div>

  {/* Real-time Profit Display */}
  {playing && !crashed && (
    <div className="mt-2 text-2xl font-bold text-gray-300">
      Profit: <span className="text-green-500">+${(currentBet * multiplier - currentBet).toFixed(2)}</span>
    </div>
  )}

  {message && (
    <div className="mt-6 bg-blue-600 px-6 py-2 rounded-full font-bold animate-bounce shadow-lg">
      {message}
    </div>
  )}
</div>

      {/* BOTTOM CONTROLS */}
      <div className="w-full p-4 bg-[#0B1426] rounded-xl border border-gray-800 flex justify-center mt-auto">

        {!playing ? (
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
                START
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
            onClick={cashOut}
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-10 rounded"
          >
            CASH OUT
          </button>
        )}
      </div>
    </div>
  );
}