import React from 'react';
import { currentUser, getDB } from '../db';
import { TrophyIcon, AcademicCapIcon, CheckBadgeIcon, BriefcaseIcon, ArrowDownTrayIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export const Portfolio: React.FC = () => {
  const db = getDB();
  const completedLessons = db.lessons.filter((l: any) => currentUser.completedLessons.includes(l.id));

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-fade-in">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-[40px] border border-slate-100 dark:border-slate-700 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <img src={`https://picsum.photos/seed/${currentUser.id}/120/120`} className="h-32 w-32 rounded-[32px] shadow-2xl border-4 border-white dark:border-slate-700" />
          <div className="flex-1 text-center md:text-left">
             <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2 justify-center md:justify-start"><h1 className="text-3xl font-black text-slate-900 dark:text-white">{currentUser.name}</h1><span className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{currentUser.rank}</span></div>
             <p className="text-slate-500 max-w-lg mb-6">Passionate learner exploring technology, trading, and digital creation. Currently on a {currentUser.streak}-day streak!</p>
             <div className="flex flex-wrap gap-4 justify-center md:justify-start"><div className="text-center px-6 border-r border-slate-100 dark:border-slate-700 last:border-0"><p className="text-2xl font-black text-slate-900 dark:text-white">{currentUser.points}</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total XP</p></div><div className="text-center px-6 border-r border-slate-100 dark:border-slate-700 last:border-0"><p className="text-2xl font-black text-slate-900 dark:text-white">{completedLessons.length}</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mastery</p></div></div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <section>
          <div className="flex items-center space-x-2 mb-8"><div className="h-10 w-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600"><CheckBadgeIcon className="h-6 w-6" /></div><h2 className="text-2xl font-bold dark:text-white">Completed Courses</h2></div>
          <div className="space-y-4">
            {completedLessons.map((lesson: any) => (
              <div key={lesson.id} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 flex items-center justify-between group">
                 <div className="flex items-center space-x-4"><div className="h-12 w-12 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all"><AcademicCapIcon className="h-6 w-6" /></div><div><h4 className="font-bold text-slate-900 dark:text-white">{lesson.title}</h4><p className="text-xs text-slate-400">Successfully completed</p></div></div>
                 <button className="p-3 bg-slate-50 dark:bg-slate-700 rounded-xl text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all"><ArrowDownTrayIcon className="h-5 w-5" /></button>
              </div>
            ))}
          </div>
        </section>
        <section>
          <div className="flex items-center space-x-2 mb-8"><div className="h-10 w-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600"><TrophyIcon className="h-6 w-6" /></div><h2 className="text-2xl font-bold dark:text-white">Learning Projects</h2></div>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl text-white relative overflow-hidden group"><div className="relative z-10"><h4 className="text-xl font-bold mb-2">Build a Decentralized App</h4><p className="text-sm text-slate-400 mb-6">Master project created during the Blockchain Foundations course.</p></div><DocumentTextIcon className="absolute bottom-4 right-4 h-24 w-24 text-white/5 -rotate-12 group-hover:rotate-0 transition-transform duration-500" /></div>
        </section>
      </div>
    </div>
  );
};
