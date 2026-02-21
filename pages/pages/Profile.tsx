import React from 'react';
import { currentUser } from '../db';
import { UserIcon, EnvelopeIcon, TrophyIcon, FireIcon, StarIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';

export const Profile: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
        <div className="relative"><img src={`https://picsum.photos/seed/${currentUser.id}/200/200`} className="h-32 w-32 md:h-40 md:w-40 rounded-[2.5rem] shadow-xl border-4 border-white dark:border-slate-700" alt={currentUser.name} /><div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-xl shadow-lg"><CheckBadgeIcon className="h-6 w-6" /></div></div>
        <div className="flex-1 text-center md:text-left space-y-4">
          <div><h1 className="text-3xl font-black text-slate-900 dark:text-white">{currentUser.name}</h1><p className="text-blue-600 font-bold uppercase tracking-widest text-xs mt-1">{currentUser.rank}</p></div>
          <div className="flex flex-wrap justify-center md:justify-start gap-4"><div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 text-sm"><EnvelopeIcon className="h-4 w-4" /><span>{currentUser.email}</span></div></div>
          <div className="flex justify-center md:justify-start space-x-6 pt-4"><div className="text-center"><p className="text-2xl font-black text-slate-900 dark:text-white">{currentUser.points}</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Total Points</p></div><div className="text-center border-x border-slate-100 dark:border-slate-700 px-6"><p className="text-2xl font-black text-slate-900 dark:text-white">{currentUser.streak}</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Day Streak</p></div><div className="text-center"><p className="text-2xl font-black text-slate-900 dark:text-white">{currentUser.badges.length}</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Badges</p></div></div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center space-x-3 mb-6"><div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl"><TrophyIcon className="h-6 w-6 text-yellow-600" /></div><h2 className="text-xl font-bold dark:text-white">Achievements</h2></div>
          <div className="grid grid-cols-2 gap-4">{currentUser.badges.map((badge, idx) => (<div key={idx} className="flex items-center space-x-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600"><StarIcon className="h-8 w-8 text-yellow-500" /><span className="text-sm font-bold dark:text-slate-200">{badge}</span></div>))}</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center space-x-3 mb-6"><div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-xl"><FireIcon className="h-6 w-6 text-orange-600" /></div><h2 className="text-xl font-bold dark:text-white">Learning Stats</h2></div>
          <div className="space-y-4"><div><div className="flex justify-between text-xs font-bold mb-2"><span className="text-slate-500">Course Completion</span><span className="text-blue-600">65%</span></div><div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden"><div className="h-full bg-blue-600 rounded-full" style={{ width: '65%' }}></div></div></div></div>
        </div>
      </div>
    </div>
  );
};
