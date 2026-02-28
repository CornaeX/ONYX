import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import BankPage from '../pages/Bank';

export const Layout = () => {
  // 1. Add state to manage mobile sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex min-h-screen bg-[#040B1C] text-white font-sans selection:bg-blue-500/30">
      
      {/* 2. Mobile Overlay Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm xl:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* 3. Sidebar (Updated for sliding animation and width) */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-[#0B1426] border-r border-[#1E2D4A] flex flex-col shadow-2xl shadow-black/50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } xl:translate-x-0`}
      >
        <Sidebar />
      </aside>

      {/* Main Wrapper */}
      {/* Added w-full so it doesn't shrink weirdly on mobile */}
      <div className="flex-1 xl:ml-[280px] flex flex-col min-h-screen relative w-full overflow-x-hidden">
        
        {/* Navbar */}
        <header className="sticky top-0 z-30 h-[90px] w-full bg-[#040B1C]/80 backdrop-blur-xl border-b border-[#1E2D4A] shadow-sm flex items-center px-4 lg:px-8">
          
          {/* Hamburger Menu Button */}
          <button 
            onClick={toggleSidebar}
            className="xl:hidden mr-4 p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md shrink-0" 
            aria-label="Toggle sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Wrapper for Navbar - Added overflow-x-auto and custom scrollbar hiding */}
          <div className="flex-1 h-full flex items-center overflow-x-auto scrollbar-hide">
            <Navbar />
          </div>
        </header>

        {/* Content + Footer */}
        <main className="flex-1 overflow-y-auto scroll-smooth">
          {/* Adjusted padding on mobile (p-4) vs desktop (lg:p-8) */}
          <div className="p-4 lg:p-8 max-w-[1600px] mx-auto min-h-[calc(100vh-300px)]">
             {/* THE MAGIC HAPPENS HERE: Outlet renders the child route */}
             <Outlet /> 
          </div>
          <Footer />
        </main>
        
      </div>
    </div>
  );
};

export const BankLayout = () => {
  return (
    // Changed: Removed flex/center classes and made it full width with the dark background
    <div className="w-full bg-slate-950">
      <BankPage />
    </div>
  );
}