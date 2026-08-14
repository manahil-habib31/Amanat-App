import React, { useState } from 'react';
import { 
  ShieldCheck, 
  PlusCircle, 
  ListTodo, 
  Search, 
  LifeBuoy, 
  Menu, 
  X,
  AlertCircle
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'report' | 'tracker' | 'community' | 'safety';
  setActiveTab: (tab: 'home' | 'report' | 'tracker' | 'community' | 'safety') => void;
  activeItemsCount: number;
  onOpenSafetyModal: () => void;
  onStartNewReport: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  activeItemsCount,
  onOpenSafetyModal,
  onStartNewReport
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: 'home' | 'report' | 'tracker' | 'community' | 'safety') => {
    if (tab === 'report') {
      onStartNewReport();
    } else {
      setActiveTab(tab);
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
        {/* Top announcement bar for Hackathon Demo & Trust notice */}
        <div className="bg-emerald-900 text-emerald-100 text-xs px-4 py-1.5 font-medium flex items-center justify-between">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span><strong>AMANAT (امانت)</strong> — Pakistan's Lost Document Recovery Assistant</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-2 text-emerald-200">
              <span>🔒 100% Private local session (No sensitive CNIC/OTP requested)</span>
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo */}
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 group text-left focus:outline-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-md shadow-emerald-700/20 group-hover:bg-emerald-800 transition-colors">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold tracking-tight text-slate-900 font-heading">AMANAT</span>
                  <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-semibold">امانت</span>
                </div>
                <p className="text-xs text-slate-500 hidden sm:block">Kho gaya hai? Agla qadam hum batayenge.</p>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              <button
                onClick={() => handleNavClick('home')}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'home'
                    ? 'bg-slate-100 text-emerald-900 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => handleNavClick('tracker')}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  activeTab === 'tracker'
                    ? 'bg-slate-100 text-emerald-900 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <ListTodo className="w-4 h-4 text-emerald-600" />
                <span>My Recovery</span>
                {activeItemsCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-emerald-600 text-white font-bold">
                    {activeItemsCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => handleNavClick('community')}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  activeTab === 'community'
                    ? 'bg-slate-100 text-emerald-900 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Search className="w-4 h-4 text-slate-500" />
                <span>Lost & Found</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('safety');
                  setMobileMenuOpen(false);
                }}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  activeTab === 'safety'
                    ? 'bg-slate-100 text-emerald-900 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <LifeBuoy className="w-4 h-4 text-amber-600" />
                <span>Safety & Helplines</span>
              </button>
            </nav>

            {/* Header Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={onOpenSafetyModal}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 hover:bg-amber-100 transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>Pehle Kya Karein?</span>
              </button>

              <button
                onClick={() => handleNavClick('report')}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 active:scale-98 transition-all shadow-sm shadow-emerald-700/25 flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Report Lost Item</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => handleNavClick('report')}
                className="p-2 rounded-lg bg-emerald-700 text-white"
                aria-label="Report Lost Item"
              >
                <PlusCircle className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-2 animate-fade-in shadow-lg">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium flex items-center justify-between ${
                activeTab === 'home' ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-slate-700'
              }`}
            >
              <span>Home</span>
            </button>
            <button
              onClick={() => handleNavClick('report')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium flex items-center justify-between ${
                activeTab === 'report' ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-slate-700'
              }`}
            >
              <span className="flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-emerald-600" />
                <span>Report Lost Item</span>
              </span>
              <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">New Plan</span>
            </button>
            <button
              onClick={() => handleNavClick('tracker')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium flex items-center justify-between ${
                activeTab === 'tracker' ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-slate-700'
              }`}
            >
              <span className="flex items-center gap-2">
                <ListTodo className="w-4 h-4 text-emerald-600" />
                <span>My Recovery Tracker</span>
              </span>
              {activeItemsCount > 0 && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-600 text-white font-bold">
                  {activeItemsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => handleNavClick('community')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium flex items-center gap-2 ${
                activeTab === 'community' ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-slate-700'
              }`}
            >
              <Search className="w-4 h-4 text-slate-500" />
              <span>Community Lost & Found</span>
            </button>
            <button
              onClick={() => handleNavClick('safety')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium flex items-center gap-2 ${
                activeTab === 'safety' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-700'
              }`}
            >
              <LifeBuoy className="w-4 h-4 text-amber-600" />
              <span>Safety & Emergency Helplines</span>
            </button>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation Bar for rapid one-thumb access */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-lg flex items-center justify-around">
        <button
          onClick={() => handleNavClick('home')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-xs font-medium ${
            activeTab === 'home' ? 'text-emerald-700 font-bold' : 'text-slate-500'
          }`}
        >
          <ShieldCheck className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => handleNavClick('report')}
          className="flex flex-col items-center -mt-5 py-1 px-3"
        >
          <div className="w-12 h-12 rounded-full bg-emerald-700 text-white flex items-center justify-center shadow-lg shadow-emerald-700/30 border-2 border-white active:scale-95 transition-transform">
            <PlusCircle className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-bold text-emerald-800 mt-0.5">Report</span>
        </button>

        <button
          onClick={() => handleNavClick('tracker')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-xs font-medium relative ${
            activeTab === 'tracker' ? 'text-emerald-700 font-bold' : 'text-slate-500'
          }`}
        >
          <div className="relative">
            <ListTodo className="w-5 h-5 mb-0.5" />
            {activeItemsCount > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-emerald-600 text-white text-[9px] font-bold flex items-center justify-center">
                {activeItemsCount}
              </span>
            )}
          </div>
          <span>Tracker</span>
        </button>

        <button
          onClick={() => handleNavClick('community')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-xs font-medium ${
            activeTab === 'community' ? 'text-emerald-700 font-bold' : 'text-slate-500'
          }`}
        >
          <Search className="w-5 h-5 mb-0.5" />
          <span>Board</span>
        </button>
      </div>
    </>
  );
};
