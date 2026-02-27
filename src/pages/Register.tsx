import React from 'react';
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black px-6">

            {/* Large Responsive Glow Backgrounds */}
            <div className="absolute w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-indigo-700 rounded-full blur-[180px] opacity-20 -top-1/3 -left-1/3"></div>
            
            <div className="absolute w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] bg-purple-700 rounded-full blur-[180px] opacity-20 -bottom-1/3 -right-1/3"></div>

            <div className="absolute w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-pink-600 rounded-full blur-[200px] opacity-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

            {/* Card */}
            <div className="relative w-full max-w-lg backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-[0_0_60px_rgba(99,102,241,0.25)] p-12">

                <h2 className="text-4xl font-semibold text-center text-white mb-10 tracking-tight">
                    Create Account
                </h2>

                <form className="space-y-7">

                    <div className="space-y-2">
                        <label className="block text-sm text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
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
                            className="w-full px-5 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-300"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm text-gray-300">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-5 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-300"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold tracking-wide shadow-lg hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                    >
                        Register
                    </button>
                </form>

                <p className="text-sm text-gray-400 text-center mt-8">
                    Already have an account?{" "}
                    <span 
                    onClick={() => navigate("/login")}
                    className="text-indigo-400 hover:text-indigo-300 cursor-pointer transition">
                        Sign in
                    </span>
                </p>

            </div>
        </div>
    );
};

export default Register;