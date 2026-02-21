import React from 'react';
import { Link } from 'react-router-dom';
import { RocketLaunchIcon, AcademicCapIcon, CpuChipIcon, CircleStackIcon, GlobeAltIcon, ChatBubbleBottomCenterIcon, CheckCircleIcon, LightBulbIcon, HeartIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export const Home: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen">
      <nav className="fixed w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2"><AcademicCapIcon className="h-8 w-8 text-blue-600" /><span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">EduMate</span></div>
          <Link to="/app/dashboard" className="bg-blue-600 text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-blue-700 shadow-xl shadow-blue-200 dark:shadow-none transition-all">Get Started</Link>
        </div>
      </nav>
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-6xl font-extrabold text-slate-900 dark:text-white leading-tight">Master New Skills <br /><span className="text-blue-600">The Modern Way.</span></h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-lg">Unlock your potential with gamified learning, global community support, and a personal AI assistant. Free, for everyone.</p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4"><Link to="/app/dashboard" className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 shadow-2xl shadow-blue-300/50 dark:shadow-none transition-all flex items-center justify-center">Start Learning Now<RocketLaunchIcon className="h-6 w-6 ml-2" /></Link></div>
          </div>
          <div className="relative"><img src="https://picsum.photos/seed/edu/800/600" className="rounded-[40px] shadow-2xl relative z-10 border-8 border-white dark:border-slate-800" /></div>
        </div>
      </section>
    </div>
  );
};
