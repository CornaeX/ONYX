import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout, BankLayout } from './components/Layout';
import { AuthLayout } from './components/AuthLayout';
import { useEffect } from 'react';
import { useStore } from './store/useStore';
import { fetchProfile } from './services/userService';

// 1. These are NAMED exports (Keep the curly braces)
import { Home } from './pages/Home';
import { TwentyOneChallenge } from './pages/games/twentyonechallenge/TwentyOneChallenge';
import { MysteryDraw } from './pages/games/mysterydraw/MysteryDraw';
import { SpinQuestV1 } from './pages/games/spinquestv1/SpinQuestV1';
import { MultiplierRush } from "./pages/games/multiplierrush/MultiplierRush";

// 2. These are DEFAULT exports (Remove the curly braces)
import Login from './pages/Login';
import Register from './pages/Register';

import BankPage from './pages/Bank';

function App() {
  // 1. ADD setRakeback HERE
  const { setUser, setBalance, setRakeback, logout } = useStore();

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const profile = await fetchProfile();

        setUser({
          uid: profile.uid,
          username: profile.username,
          role: profile.role
        });

        setBalance(profile.balance);
        
        // 2. ADD THIS LINE TO SAVE RAKEBACK ON PAGE REFRESH
        setRakeback(profile.rakeback);

      } catch (err) {
        console.error("Session expired:", err);
        logout();
      }
    };

    loadUser();
  }, [setUser, setBalance, setRakeback, logout]); // 3. Add setRakeback to dependency array

  return (
    <Routes>
      {/* Auth Layout Branch */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Main Layout Branch */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/twentyonechallenge" element={<TwentyOneChallenge />} />
        <Route path="/mysterydraw" element={<MysteryDraw />} />
        <Route path="/spinquestv1" element={<SpinQuestV1 />} />
        <Route path="/multiplierrush" element={<MultiplierRush />} />
      </Route>

      <Route element={<BankLayout />}>
        <Route path="/Bank" element={<BankPage />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;