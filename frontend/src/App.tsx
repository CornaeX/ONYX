import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AuthLayout } from './components/AuthLayout';

// 1. These are NAMED exports (Keep the curly braces)
import { Home } from './pages/Home';
import { Game } from './pages/Game';

// 2. These are DEFAULT exports (Remove the curly braces)
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
      {/* Auth Layout Branch (Login/Register) */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Main Layout Branch (Home/Game) */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;