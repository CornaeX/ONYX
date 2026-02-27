import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AuthLayout } from './components/AuthLayout';
import { useEffect } from 'react';
import { useStore } from './store/useStore';
import { fetchProfile } from './services/userService';

// 1. These are NAMED exports (Keep the curly braces)
import { Home } from './pages/Home';
import { Blackjack } from './pages/games/blackjack/Blackjack';

// 2. These are DEFAULT exports (Remove the curly braces)
import Login from './pages/Login';
import Register from './pages/Register';

function App() {

  const { setUser, setBalance, logout } = useStore();

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

      } catch (err) {
        console.error("Session expired:", err);
        logout();
      }
    };

    loadUser();
  }, [setUser, setBalance, logout]);

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
        <Route path="/blackjack" element={<Blackjack />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;