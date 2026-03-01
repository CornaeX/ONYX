import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { loginUser } from '../services/authService';
import { fetchProfile } from "../services/userService";
import { useStore } from "../store/useStore";


const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Added to handle errors

    const { setUser, setBalance, setRakeback } = useStore();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await loginUser(email, password);

            const profile = await fetchProfile();

            setUser({
                uid: profile.uid,
                username: profile.username,
                role: profile.role
            });

            setBalance(profile.balance);
            setRakeback(profile.rakeback);

            navigate('/');
        } catch (err) {
            console.error(err);
            setError("Failed to log in.");
        }
    };
    
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black px-6">

            {/* Glow Backgrounds */}
            <div className="absolute w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-indigo-700 rounded-full blur-[180px] opacity-20 -top-1/3 -left-1/3"></div>
            <div className="absolute w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] bg-purple-700 rounded-full blur-[180px] opacity-20 -bottom-1/3 -right-1/3"></div>
            <div className="absolute w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-pink-600 rounded-full blur-[200px] opacity-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-lg backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-[0_0_60px_rgba(99,102,241,0.25)] p-12"
            >
                <div className="mb-10 text-center">
                    <div className="w-14 h-14 mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                        <LogIn className="text-white" size={26} />
                    </div>
                    <h1 className="text-4xl font-semibold text-white tracking-tight">
                        Welcome Back
                    </h1>
                </div>

                {/* Added onSubmit handler here */}
                <form className="space-y-7" onSubmit={handleLogin}>
                    
                    {/* Error message display */}
                    {error && (
                        <div className="text-red-400 text-sm text-center bg-red-400/10 p-2 rounded-lg border border-red-400/20">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="block text-sm text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-5 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-300"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-5 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-300"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold tracking-wide shadow-lg hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                    >
                        Sign In
                    </button>
                </form>

                <p className="mt-10 text-center text-gray-400 text-sm">
                    Don’t have an account?{" "}
                    <span
                        onClick={() => navigate("/register")}
                        className="text-indigo-400 hover:text-indigo-300 cursor-pointer transition"
                    >
                        Create one
                    </span>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;