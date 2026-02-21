import React from 'react';
import { Link } from 'react-router-dom';
import { AcademicCapIcon, BoltIcon, TrophyIcon, ChatBubbleLeftRightIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { currentUser } from '../db';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-10 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white">Welcome back, {currentUser.name.split('')[0]}!</h1>
          <p className="text-slate-500 mt-1">You're on a {currentUser.streak} day learning streak. Keep it up!</p>
        </div>
        <div className="flex items-center space-x-4">
           <div className="bg-white dark:bg-slate-800 px-6 py-3 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Your XP</p>
              <p className="text-xl font-black text-blue-600">{currentUser.points}</p>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
             <div className="relative z-10">
               <h2 className="text-3xl font-bold mb-4">Ready for your next lesson?</h2>
               <p className="text-blue-100 mb-8 max-w-md">Continue your journey in "Blockchain Foundations" or explore new topics in our catalog.</p>
               <Link to="/app/learn/courses" className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-2xl font-bold hover:bg-blue-50 transition-all">
                 Continue Learning <ArrowRightIcon className="h-5 w-5 ml-2" />
               </Link>
             </div>
             <AcademicCapIcon className="absolute -bottom-10 -right-10 h-64 w-64 text-white/10 -rotate-12" />
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <Link to="/app/ai" className="p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all group">
                <div className="h-12 w-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform"><BoltIcon className="h-6 w-6" /></div>
                <h3 className="text-xl font-bold dark:text-white mb-2">Ask EduMate AI</h3>
                <p className="text-sm text-slate-500">Get instant help with any topic or homework question.</p>
             </Link>
             <Link to="/app/community/skills" className="p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all group">
                <div className="h-12 w-12 bg-orange-50 dark:bg-orange-900/30 rounded-xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform"><ChatBubbleLeftRightIcon className="h-6 w-6" /></div>
                <h3 className="text-xl font-bold dark:text-white mb-2">Skill Exchange</h3>
                <p className="text-sm text-slate-500">Trade your knowledge with other students globally.</p>
             </Link>
          </div>
        </div>

        <aside className="space-y-8">
           <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
              <h3 className="font-bold text-lg dark:text-white mb-6 flex items-center"><TrophyIcon className="h-5 w-5 mr-2 text-yellow-500" /> Recent Badges</h3>
              <div className="space-y-4">
                 {currentUser.badges.map(badge => (
                   <div key={badge} className="flex items-center space-x-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">★</div>
                      <p className="text-sm font-bold dark:text-white">{badge}</p>
                   </div>
                 ))}
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
};
