import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  BookOpenIcon, 
  ChatBubbleLeftRightIcon, 
  UserCircleIcon, 
  BoltIcon, 
  AcademicCapIcon, 
  ChatBubbleBottomCenterTextIcon,
  ShieldCheckIcon,
  BellIcon,
  SunIcon,
  MoonIcon,
  Bars3Icon,
  XMarkIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import { currentUser } from '../db';

interface LayoutProps {
  isDarkMode: boolean;
  setIsDarkMode: (v: boolean) => void;
  fontSize: number;
  setFontSize: (n: number) => void;
}

export const Layout: React.FC<LayoutProps> = ({ isDarkMode, setIsDarkMode, fontSize, setFontSize }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/app/dashboard', icon: HomeIcon },
    { name: 'Courses', href: '/app/learn/courses', icon: BookOpenIcon },
    { name: 'Lesson Notes', href: '/app/learn/notes', icon: DocumentTextIcon },
    { name: 'Community', href: '/app/community/feed', icon: ChatBubbleLeftRightIcon },
    { name: 'Skill Exchange', href: '/app/community/skills', icon: BoltIcon },
    { name: 'My Portfolio', href: '/app/user/portfolio', icon: UserCircleIcon },
    { name: 'EduMate AI', href: '/app/ai', icon: ChatBubbleBottomCenterTextIcon },
  ];

  if (currentUser.role === 'admin') {
    navigation.push({ name: 'Admin Panel', href: '/app/admin', icon: ShieldCheckIcon });
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <header className={`sticky top-0 z-50 w-full ${isDarkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-white/90 border-slate-200'} backdrop-blur-md border-b transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button onClick={toggleMenu} className={`lg:hidden p-2 rounded-xl transition-colors ${isDarkMode ? 'text-slate-400 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-100'}`}>
                {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
              </button>
              <Link to="/app/dashboard" className="flex items-center space-x-2">
                <AcademicCapIcon className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hidden sm:block">EduMate</span>
              </Link>
            </div>
            <nav className="hidden lg:flex space-x-1">
              {navigation.slice(0, 7).map((item) => {
                const isActive = location.pathname.startsWith(item.href);
                return (
                  <Link key={item.name} to={item.href} className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-blue-50 text-blue-600' : `${isDarkMode ? 'text-slate-400 hover:bg-slate-700 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}`}>
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-xl transition-colors ${isDarkMode ? 'text-yellow-400 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-100'}`}>
                {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              </button>
              <button onClick={() => setShowSettings(!showSettings)} className="flex items-center space-x-2 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-600">
                <img src={`https://picsum.photos/seed/${currentUser.id}/40/40`} className="h-8 w-8 rounded-full shadow-sm" />
              </button>
            </div>
          </div>
        </div>
        <div className={`lg:hidden absolute top-16 left-0 w-full overflow-hidden transition-all duration-300 ease-in-out z-50 ${isMenuOpen ? 'max-h-screen border-b shadow-xl' : 'max-h-0'} ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <nav className="p-4 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname.startsWith(item.href);
              return (
                <Link key={item.name} to={item.href} onClick={() => setIsMenuOpen(false)} className={`flex items-center p-4 rounded-2xl transition-all ${isActive ? 'bg-blue-600 text-white shadow-lg' : `${isDarkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-50'}`}`}>
                  <item.icon className="h-6 w-6 mr-4" />
                  <span className="font-bold">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      {showSettings && (
        <div className={`fixed top-16 right-4 z-[60] w-72 p-6 rounded-[2rem] shadow-2xl border animate-fade-in ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
           <div className="flex items-center space-x-4 mb-6">
              <img src={`https://picsum.photos/seed/${currentUser.id}/48/48`} className="h-12 w-12 rounded-2xl shadow-lg" />
              <div><p className="font-bold text-sm dark:text-white">{currentUser.name}</p><p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{currentUser.rank}</p></div>
           </div>
           <div className="space-y-6">
              <Link to="/app/user/profile" onClick={() => setShowSettings(false)} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors group">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg group-hover:bg-blue-100 transition-colors"><UserCircleIcon className="h-5 w-5 text-blue-600" /></div>
                <span className="text-xs font-bold dark:text-white">View Profile</span>
              </Link>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase"><span>Font Size</span><span>{fontSize}px</span></div>
                <input type="range" min="12" max="24" value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))} className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-700"><button className="w-full py-3 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl text-xs font-bold hover:bg-red-100 transition-colors">Sign Out</button></div>
           </div>
        </div>
      )}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8"><Outlet /></main>
      <footer className={`w-full py-10 border-t mt-auto ${isDarkMode ? 'bg-slate-800/50 border-slate-700 text-slate-500' : 'bg-white border-slate-200 text-slate-400'} text-center text-[10px] font-bold uppercase tracking-widest`}>EduMate &bull; Empowering the next generation of learners &bull; 2026</footer>
    </div>
  );
};
