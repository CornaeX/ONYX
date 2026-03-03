import { useState } from 'react';
import { Gift, User } from 'lucide-react'; // Removed Search import
import { useStore } from '../store/useStore';
import WinnerPanel from './WinnerPanel';
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const user = useStore((state) => state.user);
  const balance = useStore((state) => state.balance);
  const navigate = useNavigate();
  const [showUsername, setShowUsername] = useState(true);

  const rakeback = useStore((state) => state.rakeback);

  const CLAIM_THRESHOLD = 50;

  const progressPercent = Math.min(
    (rakeback / CLAIM_THRESHOLD) * 100,
    100
  );

  return (
    <nav className="h-20 flex items-center justify-between px-6 w-full">
      
      {/* LEFT ZONE: Fixed Width */}
      <div className="flex items-center gap-4">
        {/* Search Bar Removed */}

        {/* Winner Panel - Adjusted padding since search is gone */}
        <div className="hidden lg:block">
          <WinnerPanel />
        </div>
      </div>

      {/* RIGHT ZONE: Fixed Width, Content Aligned Right */}
      <div className="flex items-center justify-end w-[450px]">
        {/* Rakeback Section */}
        <div className="flex items-center gap-3 mr-3 md:mr-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-[#00D166] uppercase tracking-wider mb-1">
              Rakeback
            </span>
            
            <div className="w-24 h-1.5 bg-[#121E36] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#00D166] to-[#00FFA3] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            <span className="text-[9px] text-gray-500 mt-1">
              ${(rakeback || 0).toFixed(2)} / ${CLAIM_THRESHOLD}
            </span>
          </div>

          <button
            disabled={rakeback < CLAIM_THRESHOLD}
            onClick={async () => {
              try {
                const res = await fetch("https://onyxbackend.share.zrok.io/api/user/claim-rakeback", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                  }
                });

                if (res.ok) {
                  const data = await res.json();
                  alert(`Claimed $${data.claimed.toFixed(2)}`);
                  
                  useStore.getState().setRakeback(data.newRakeback);
                  useStore.getState().setBalance(data.newBalance);
                }
              } catch (e) {
                console.error("Failed to claim rakeback", e);
              }
            }}
            className={`p-2 rounded-xl border transition
              ${
                rakeback >= CLAIM_THRESHOLD
                  ? "bg-[#121E36] hover:bg-[#1E2D4A] border-[#1E2D4A]"
                  : "bg-[#0B1426] border-[#1E2D4A] opacity-40 cursor-not-allowed"
              }`}
          >
            <Gift className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
          </button>
        </div>

        <div className="h-8 w-px bg-[#1E2D4A] mx-2 hidden md:block"></div>

        {/* Wallet & Profile */}
        <div className="flex items-center gap-4 pl-4">
          {user ? (
            <>
              <div className="flex items-center bg-[#0B1426] border border-[#1E2D4A] rounded-xl p-1 pr-4">
                <button 
                  onClick={() => navigate("/Bank")}
                  className="bg-[#007AFF] hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm transition-all mr-3">
                  Wallet
                </button>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-gray-500 font-bold uppercase">
                    {user.role}
                  </span>
                  <span className="text-white font-mono font-bold leading-none">
                    ${balance.toLocaleString()}
                  </span>
                </div>
              </div>

              {showUsername && (
                <div className="flex flex-col items-end mr-2 animate-fadeIn">
                  <span className="text-xs text-gray-400">
                    {user.username}
                  </span>
                </div>
              )}

              <button
                onClick={() => setShowUsername(!showUsername)}
                className="w-10 h-10 rounded-xl bg-[#121E36] border border-[#1E2D4A] flex items-center justify-center hover:bg-[#1E2D4A] transition"
              >
                <User className="w-5 h-5 text-gray-400" />
              </button>
            </>
          ) : (
            <div className="flex gap-3">
              <button 
                onClick={() => navigate("/login")}
                className="text-gray-400 hover:text-white font-bold text-sm px-2">Sign In</button>
              
              <button 
                onClick={() => navigate("/register")}
                className="bg-[#007AFF] text-white px-6 py-2.5 rounded-xl font-bold text-sm">
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};