import React, { useState } from 'react';
import { getDB, saveDB } from '../db';
import { UsersIcon, BookOpenIcon, ShieldCheckIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

export const Admin: React.FC = () => {
  const db = getDB();
  const [lessons, setLessons] = useState(db.lessons);
  const [posts, setPosts] = useState(db.posts);

  const handleDeletePost = (id: string) => {
    const updated = posts.filter((p: any) => p.id !== id);
    setPosts(updated); saveDB({ ...db, posts: updated });
  };

  return (
    <div className="space-y-10 animate-fade-in relative pb-20">
      <header><div><h1 className="text-3xl font-bold dark:text-white">Admin Command Center</h1><p className="text-slate-500">Manage lessons and community content</p></div></header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[ { name: 'Total Users', value: db.users.length, icon: UsersIcon, color: 'text-blue-600' }, { name: 'Active Courses', value: db.lessons.length, icon: BookOpenIcon, color: 'text-indigo-600' }, { name: 'Reports', value: 0, icon: ShieldCheckIcon, color: 'text-red-600' } ].map(stat => (
          <div key={stat.name} className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700"><div className={`p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 ${stat.color} w-fit mb-4`}><stat.icon className="h-6 w-6" /></div><p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.name}</p><p className="text-3xl font-black dark:text-white mt-1">{stat.value}</p></div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <section className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm">
           <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between"><h3 className="font-bold text-lg dark:text-white">Course Catalog</h3><button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center"><PlusIcon className="h-4 w-4 mr-2" />New Lesson</button></div>
           <div className="divide-y divide-slate-50 dark:divide-slate-700 max-h-[600px] overflow-y-auto custom-scrollbar">
              {lessons.map((l: any) => (<div key={l.id} className="p-6 flex items-center justify-between group"><div><p className="font-bold text-sm dark:text-slate-200">{l.title}</p><p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{l.category} • {l.difficulty}</p></div><button className="p-2 text-slate-400 hover:text-red-500 transition-colors"><TrashIcon className="h-5 w-5" /></button></div>))}
           </div>
        </section>
        <section className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm">
           <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between"><h3 className="font-bold text-lg dark:text-white">Community Posts</h3></div>
           <div className="divide-y divide-slate-50 dark:divide-slate-700 max-h-[600px] overflow-y-auto custom-scrollbar">
              {posts.map((p: any) => (<div key={p.id} className="p-6"><div className="flex items-center justify-between mb-2"><p className="font-bold text-sm dark:text-slate-200">{p.title}</p><button onClick={() => handleDeletePost(p.id)} className="text-red-400 hover:text-red-600 transition-colors"><TrashIcon className="h-5 w-5" /></button></div><p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{p.content}</p></div>))}
           </div>
        </section>
      </div>
    </div>
  );
};
