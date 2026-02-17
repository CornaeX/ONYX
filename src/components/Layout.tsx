import React from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Footer } from './Footer'; // 1. Import the Footer

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen bg-[#040B1C] text-white font-sans selection:bg-blue-500/30">
      
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-[280px] bg-[#0B1426] border-r border-[#1E2D4A] hidden xl:flex flex-col shadow-2xl shadow-black/50">
        <Sidebar />
      </aside>

      {/* Main Wrapper */}
      <div className="flex-1 xl:ml-[280px] flex flex-col min-h-screen relative">
        
        {/* Navbar */}
        <header className="sticky top-0 z-40 h-[90px] w-full bg-[#040B1C]/80 backdrop-blur-xl border-b border-[#1E2D4A] shadow-sm">
          <Navbar />
        </header>

        {/* Content + Footer */}
        <main className="flex-1 overflow-y-auto scroll-smooth">
          
          {/* Main Content Area */}
          <div className="p-6 lg:p-8 max-w-[1600px] mx-auto min-h-[calc(100vh-300px)]">
             {children}
          </div>

          {/* 2. Add Footer Here (At the bottom of scroll) */}
          <Footer />
          
        </main>
        
      </div>
    </div>
  );
};