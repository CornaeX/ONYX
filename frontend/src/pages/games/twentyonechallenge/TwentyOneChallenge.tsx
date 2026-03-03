import { useState, useMemo, useEffect } from 'react'; // 🔥 ADDED useEffect
import { useStore } from "../../../store/useStore";
import { PlayingCard, type CardType } from './PlayingCard';
import placeBetSFX from '../../../assets/sounds/betplace.mp3';
import cardSwipeSFX from '../../../assets/sounds/cardswipe.mp3';
import clearBetSFX from '../../../assets/sounds/clearbet.mp3';
import winSFX from '../../../assets/sounds/win.mp3';
import loseSFX from '../../../assets/sounds/lose.mp3';
// import { fetchProfile } from "../../../services/userService";

// Setup your auth headers here (assuming Bearer token from localStorage)
const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
});

// Helper to translate Backend string "10♥" to Frontend object {suit: '♥', value: '10'}
const suitMap: Record<string, string> = {
  '♥': '🔥',
  '♦': '💎',
  '♣': '⚡',
  '♠': '🧶'
};

const parseCard = (cardStr: string): CardType => ({
  suit: suitMap[cardStr.slice(-1)] || cardStr.slice(-1),
  value: cardStr.slice(0, -1)
});

const calculateScore = (hand: CardType[]): number => {
  let score = 0;
  let aces = 0;
  hand.forEach((card) => {
    if (['J', 'Q', 'K'].includes(card.value)) score += 10;
    else if (card.value === 'A') { score += 11; aces += 1; }
    else score += parseInt(card.value);
  });
  while (score > 21 && aces > 0) { score -= 10; aces -= 1; }
  return score;
};

export function TwentyOneChallenge() {
  const balance = useStore((state) => state.balance);
  const setBalance = useStore((state) => state.setBalance);

  const [currentBet, setCurrentBet] = useState<number>(0);
  const [playerHand, setPlayerHand] = useState<CardType[]>([]);
  const [dealerHand, setDealerHand] = useState<CardType[]>([]);
  const [splitHand, setSplitHand] = useState<CardType[]>([]);
  const [activeHand, setActiveHand] = useState<number>(0); 
  const [gameState, setGameState] = useState<string>('betting'); 
  const [message, setMessage] = useState<string>('');

  // 🔥 ADDED THIS USEEFFECT TO UPDATE NAVBAR WHEN GAME ENDS
  useEffect(() => {
  const restoreSession = async () => {
    try {
      const res = await fetch(
        'https://onyxbackend.share.zrok.io/api/TwentyOneChallenge/session',
        { headers: getAuthHeaders() }
      );

      if (!res.ok) {
        console.error("Session restore failed:", res.status);
        return;
      }

      const data = await res.json();

      if (!data.active) return;

      const session = data.data;

      setCurrentBet(session.betAmount);
      setPlayerHand(session.playerHands[0].cards.map(parseCard));

      if (session.playerHands.length > 1) {
        setSplitHand(session.playerHands[1].cards.map(parseCard));
      }

      setDealerHand(session.dealerHand.map(parseCard));
      setActiveHand(session.activeHandIndex);

      if (session.status === "PLAYER_TURN") {
        setGameState("playerTurn");
      } else if (session.status === "DEALER_TURN") {
        setGameState("dealerTurn");
      }

    } catch (err) {
      console.error("Restore failed", err);
    }
  };

  restoreSession();
}, []);

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
    audio.play().catch(e => console.log('Audio blocked:', e));
  };

  const addBet = (amount: number) => {
    if (balance >= amount) {
      setBalance(balance - amount);
      setCurrentBet(prev => prev + amount);
      playSound('bet');
    }
  };

  const clearBet = () => {
    setBalance(balance + currentBet);
    playSound('clear');
    setCurrentBet(0);
  };

  const allIn = () => {
    // Grab only the whole dollars (e.g., 25.75 becomes 25)
    const allInAmount = Math.floor(balance); 

    if (allInAmount > 0) { 
      setCurrentBet(prev => prev + allInAmount);
      setBalance(balance - allInAmount); // This leaves the cents in the balance
      playSound('bet');
    }
  };

  const handleGameOver = (msg: string, payout: number) => {
    setGameState('gameOver');
    setMessage(msg);
    if (payout > currentBet * (splitHand.length > 0 ? 2 : 1)) playSound('win');
    else if (payout > 0) playSound('swipe'); 
    else playSound('lose');
    
    // We can comment out or leave this since the useEffect will handle the official balance update
    // setBalance((typeof balance === 'number' ? balance : 0) + payout); 
  };

  // Centralized resolution for when the game ends
  const resolveDealerPlayAndGameOver = (data: any) => {
    setGameState('dealerTurn');
    const finalDealerHand = data.dealerHand.map(parseCard);
    
    setDealerHand([finalDealerHand[0], finalDealerHand[1]]);
    
    // Animate additional dealer draws to mimic your old useEffect
    let delay = 1000;
    for (let i = 2; i < finalDealerHand.length; i++) {
        setTimeout(() => {
            setDealerHand(prev => [...prev, finalDealerHand[i]]);
            playSound('swipe');
        }, delay);
        delay += 1000;
    }

    setTimeout(() => {
        let msg = "";
        const pPayout = data.payout;
        if (pPayout > currentBet * (splitHand.length > 0 ? 2 : 1)) msg = "You Win! 🏆";
        else if (pPayout > 0) msg = "Push / Partial Win";
        else msg = "Dealer Wins.";
        
        // Override for total bust purely for visual feedback
        const pScore = calculateScore(playerHand);
        if (pScore > 21 && splitHand.length === 0) msg = "Bust! Over 21.";

        handleGameOver(msg, pPayout);
    }, delay + 500);
  };

  const startRound = async () => {
    if (currentBet === 0) return;
    setGameState('dealing');
    setMessage('');
    setPlayerHand([]);
    setSplitHand([]); 
    setActiveHand(0); 
    setDealerHand([]);

    try {
      const res = await fetch('https://onyxbackend.share.zrok.io/api/TwentyOneChallenge/start', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ bet: currentBet })
      });
      const data = await res.json();
      if (typeof data.balance === "number") {
        setBalance(data.balance);
      }
      if (typeof data.rakebackAvailable === "number") {
        useStore.getState().setRakeback(data.rakebackAvailable);
      }
      
      const pCards = data.playerHands[0].cards.map(parseCard);
      const dCards = data.dealerHand.map(parseCard);

      // Realistic dealing animation
      setTimeout(() => { setPlayerHand([pCards[0]]); playSound('swipe'); }, 600);
      setTimeout(() => { setDealerHand([dCards[0]]); playSound('swipe'); }, 1200);
      setTimeout(() => { setPlayerHand([pCards[0], pCards[1]]); playSound('swipe'); }, 1800);
      
      setTimeout(async () => {
        setDealerHand([dCards[0], dCards[1]]);
        playSound('swipe'); 
        
        // Check if the backend instantly resolved a Blackjack
        if (data.status === 'FINISHED') {
            resolveDealerPlayAndGameOver(data);
        } else {
            setGameState('playerTurn');
        }
      }, 2400);

    } catch (e) {
      console.error(e);
      setMessage("Error starting game");
      setGameState('betting');
    }
  };

  const hit = async () => {
    try {
      const res = await fetch('https://onyxbackend.share.zrok.io/api/TwentyOneChallenge/hit', { method: 'POST', headers: getAuthHeaders() });
      const data = await res.json();
      if (typeof data.balance === "number") {
        setBalance(data.balance);
      }
      if (typeof data.rakebackAvailable === "number") {
        useStore.getState().setRakeback(data.rakebackAvailable);
      }

      playSound('swipe');

      const hands = data.playerHands;
      const currentCards = hands[data.activeHandIndex].cards.map(parseCard);
      const score = calculateScore(currentCards);
      
      setPlayerHand(hands[0].cards.map(parseCard));
      if (hands.length > 1) {
        setSplitHand(hands[1].cards.map(parseCard));
      }
      setActiveHand(data.activeHandIndex);

      // Realistic Auto-Stand: If dealer turn forced OR player hits exactly 21
      if (data.status === 'DEALER_TURN' || score === 21) {
        setTimeout(() => stand(), 800); 
      }
    } catch (e) { console.error(e); }
  };

  const stand = async () => {
    try {
      const res = await fetch(
        'https://onyxbackend.share.zrok.io/api/TwentyOneChallenge/stand',
        { method: 'POST', headers: getAuthHeaders() }
      );

      const data = await res.json();

      // 🔥 UPDATE BALANCE FROM DB
      if (typeof data.balance === "number") {
        setBalance(data.balance);
      }
      if (typeof data.rakebackAvailable === "number") {
        useStore.getState().setRakeback(data.rakebackAvailable);
      }

      // 🔥 FIX: Rely on the game status rather than payout being undefined.
      // If the backend says it's still the player's turn, we just move to the next split hand.
      if (data.status === "PLAYER_TURN") {
        setActiveHand(data.activeHandIndex);
      } else {
        // Only resolve the dealer and end the game if the status is DEALER_TURN or FINISHED
        resolveDealerPlayAndGameOver(data);
      }

    } catch (e) {
      console.error(e);
    }
  };

  const doubleDown = async () => {
    if (balance < currentBet) return;
    try {
      const res = await fetch('https://onyxbackend.share.zrok.io/api/TwentyOneChallenge/double', { method: 'POST', headers: getAuthHeaders() });
      const data = await res.json();
      
      playSound('bet');
      if (typeof data.balance === "number") {
        setBalance(data.balance);
      }
      if (typeof data.rakebackAvailable === "number") {
        useStore.getState().setRakeback(data.rakebackAvailable);
      }
      setCurrentBet(prev => prev * 2);

      const hands = data.playerHands;
      setPlayerHand(hands[0].cards.map(parseCard));
      if (hands.length > 1) setSplitHand(hands[1].cards.map(parseCard));
      
      playSound('swipe');

      setTimeout(() => {
        if (data.status === 'DEALER_TURN' || (data.activeHandIndex === 0 && hands.length === 1)) {
          stand(); // Last hand doubled, trigger dealer resolution
        } else {
          setActiveHand(data.activeHandIndex); // Move to next split hand
        }
      }, 800);
    } catch(e) { console.error(e); }
  };

  const split = async () => {
    if (balance < currentBet) return;
    try {
      const res = await fetch('https://onyxbackend.share.zrok.io/api/TwentyOneChallenge/split', { method: 'POST', headers: getAuthHeaders() });
      const data = await res.json();
      
      playSound('bet');
      if (typeof data.balance === "number") {
        setBalance(data.balance);
      }
      if (typeof data.rakebackAvailable === "number") {
        useStore.getState().setRakeback(data.rakebackAvailable);
      }
      
      setPlayerHand(data.playerHands[0].cards.map(parseCard));
      setSplitHand(data.playerHands[1].cards.map(parseCard));
      setActiveHand(data.activeHandIndex);
    } catch(e) { console.error(e); }
  };

  const hideDealerCard = gameState === 'dealing' || gameState === 'playerTurn';
  const visibleDealerScore = hideDealerCard && dealerHand.length > 0 
    ? calculateScore(dealerHand.slice(1))
    : calculateScore(dealerHand);

  const canDouble = playerHand.length === 2 && splitHand.length === 0 && balance >= currentBet;
  const canSplit = playerHand.length === 2 && splitHand.length === 0 && balance >= currentBet && playerHand[0]?.value === playerHand[1]?.value;

  // --- EXACT SAME UI RENDER BELOW THIS LINE ---
  return (
    <div className="flex flex-col items-center justify-between h-[650px] w-full max-w-4xl mx-auto bg-[#070E20] rounded-2xl border border-gray-800 p-8 shadow-2xl relative overflow-hidden font-sans text-white">
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none"></div>

      {/* TOP BAR */}
      <div className="w-full flex justify-between items-center z-10 border-b border-gray-800 pb-4">
        <div className="text-gray-400 font-bold">Points: <span className="text-green-400 text-xl ml-2">{(balance || 0).toFixed(2)} ★</span></div>
        <div className="text-gray-400 font-bold">
         {splitHand.length > 0 ? "Total Bet:" : "Points Used:"} 
         <span className="text-yellow-400 text-xl ml-2">{(currentBet * (splitHand.length > 0 ? 2 : 1)).toFixed(2)} ★</span>
        </div>
      </div>

      {/* CENTER STAGE */}
      <div className="flex-1 w-full flex flex-col items-center justify-center z-10 my-4">
        {gameState === 'betting' ? (
           <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
             <div className="w-32 h-32 rounded-full border-2 border-dashed border-blue-500/50 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
               <span className="text-yellow-400 text-3xl font-bold">{currentBet} ★</span>
             </div>
             <h2 className="text-2xl font-bold text-gray-300">Choose Your Points</h2>
           </div>
        ) : (
          <div className="w-full flex flex-col items-center gap-8 relative">
            
            {/* Dealer Hand */}
            <div className="text-center relative min-h-[160px]">
              {gameState !== 'dealing' && (
                <h3 className="text-gray-500 font-bold tracking-widest text-xs mb-3">
                  DEALER {dealerHand.length > 0 && `- ${visibleDealerScore}`}
                </h3>
              )}
              <div className="flex justify-center -space-x-12">
                {dealerHand.map((card, i) => (
                  <PlayingCard key={`${card.suit}-${card.value}-${i}`} card={card} hidden={hideDealerCard && i === 1} />
                ))}
              </div>
            </div>

            {/* Middle Message Bubble */}
            <div className="h-10 flex items-center justify-center absolute top-1/2 -translate-y-1/2 z-20">
               {message && (
                 <div className="bg-blue-600 text-white px-8 py-2 rounded-full font-black shadow-lg animate-bounce border border-blue-400 text-center max-w-sm leading-tight">
                   {message}
                 </div>
               )}
            </div>

            {/* Player Hands */}
            <div className="flex gap-8">
              
              {/* Hand 1 */}
              <div className={`text-center transition-all ${activeHand === 0 && splitHand.length > 0 && gameState !== 'gameOver' ? 'scale-110 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]' : splitHand.length > 0 && activeHand !== 0 ? 'opacity-50 scale-90' : ''}`}>
                <div className="flex justify-center -space-x-12 mb-3">
                  {playerHand.map((card, i) => (
                    <PlayingCard key={`p1-${card.suit}-${card.value}-${i}`} card={card} hidden={false} />
                  ))}
                </div>
                {gameState !== 'dealing' && playerHand.length > 0 && <h3 className="text-blue-400 font-bold tracking-widest text-xs">SCORE: {calculateScore(playerHand)}</h3>}
              </div>

              {/* Hand 2 (Only shows if split) */}
              {splitHand.length > 0 && (
                 <div className={`text-center transition-all ${activeHand === 1 && gameState !== 'gameOver' ? 'scale-110 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]' : gameState !== 'gameOver' && activeHand !== 1 ? 'opacity-50 scale-90' : ''}`}>
                   <div className="flex justify-center -space-x-12 mb-3">
                     {splitHand.map((card, i) => (
                       <PlayingCard key={`p2-${card.suit}-${card.value}-${i}`} card={card} hidden={false} />
                     ))}
                   </div>
                   {splitHand.length > 0 && <h3 className="text-blue-400 font-bold tracking-widest text-xs">SCORE: {calculateScore(splitHand)}</h3>}
                 </div>
              )}

            </div>

          </div>
        )}
      </div>

      {/* BOTTOM CONTROLS */}
      <div className="w-full z-10 p-4 bg-[#0B1426] rounded-xl border border-gray-800 flex justify-center mt-auto">
        
        {gameState === 'betting' ? (
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="flex gap-4">
              {[10, 25, 50, 100].map(amt => (
                <button 
                  key={amt} onClick={() => addBet(amt)} disabled={balance < amt}
                  className="w-14 h-14 rounded-full font-bold text-sm border-2 border-dashed transition-transform hover:scale-110 active:scale-95 disabled:opacity-50 flex items-center justify-center bg-[#112240] border-gray-600 hover:border-blue-400 hover:text-blue-400"
                >
                  {amt} ★
                </button>
              ))}
            </div>
            
            <div className="flex gap-4 w-full justify-center">
              <button onClick={clearBet} disabled={currentBet === 0} className="px-6 py-2 rounded border border-red-900/50 hover:bg-red-900/30 text-gray-400 hover:text-red-400 font-bold transition-colors">Clear</button>
              <button onClick={startRound} disabled={currentBet === 0} className="px-10 py-2 rounded bg-green-600 hover:bg-green-500 text-white font-bold transition-colors disabled:opacity-50">PLAY</button>
              <button 
                onClick={allIn} 
                disabled={balance < 1} // 🔥 Changed this so they need at least $1 to go all in
                className="px-6 py-2 rounded border border-yellow-900/50 hover:bg-yellow-900/30 text-gray-400 hover:text-yellow-400 font-bold transition-colors"
              >
                All In
              </button>
            </div>
          </div>
        ) : gameState === 'dealing' ? (
          <div className="text-gray-400 font-bold animate-pulse py-2">Dealing...</div>
        ) : gameState === 'playerTurn' ? (
          <div className="flex gap-3">
            <button onClick={hit} className="bg-[#112240] border border-blue-500/50 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded transition-all">HIT</button>
            <button onClick={stand} className="bg-[#112240] border border-red-500/50 hover:bg-red-600 text-white font-bold py-2 px-6 rounded transition-all">STAND</button>
            {canDouble && <button onClick={doubleDown} className="bg-[#112240] border border-yellow-500/50 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded transition-all">DOUBLE</button>}
            {canSplit && <button onClick={split} className="bg-[#112240] border border-purple-500/50 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded transition-all">SPLIT</button>}
          </div>
        ) : gameState === 'gameOver' ? (
          <button onClick={() => { setGameState('betting'); setCurrentBet(0); setMessage(''); }} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-10 rounded transition-all">
            NEW GAME
          </button>
        ) : (
          <div className="text-gray-400 font-bold animate-pulse py-2">Dealer Turn...</div>
        )}

      </div>
    </div>
  );
}