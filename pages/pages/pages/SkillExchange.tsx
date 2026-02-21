import React, { useState } from 'react';
import { getDB, currentUser, saveDB } from '../db';
import { BoltIcon, ArrowsRightLeftIcon, PlusIcon, ChatBubbleLeftRightIcon, MapPinIcon } from '@heroicons/react/24/outline';

export const SkillExchange: React.FC = () => {
  const db = getDB();
  const [entries, setEntries] = useState(db.skillExchange);
  const [showForm, setShowForm] = useState(false);
  const [offering, setOffering] = useState('');
  const [wanting, setWanting] = useState('');
  const [description, setDescription] = useState('');

  const handlePost = () => {
    if (!offering || !wanting || !description) return;
    const newEntry = { id: Date.now().toString(), userId: currentUser.id, userName: currentUser.name, skillOffered: offering, skillWanted: wanting, description: description };
    const updated = [newEntry, ...entries];
    setEntries(updated);
    saveDB({ ...db, skillExchange: updated });
    setShowForm(false); setOffering(''); setWanting(''); setDescription('');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div><h1 className="text-3xl font-bold dark:text-white">Skill Exchange Board</h1><p className="text-slate-500">I teach you this, you teach me that.</p></div>
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold flex items-center shadow-lg"><PlusIcon className="h-5 w-5 mr-2" />Post a Skill</button>
      </header>
      {showForm && (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border-2 border-blue-100 dark:border-slate-700 animate-fade-in shadow-xl">
           <h3 className="text-xl font-bold mb-6 dark:text-white">Offer Your Expertise</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
             <input value={offering} onChange={e => setOffering(e.target.value)} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:border-blue-400 dark:text-white" placeholder="What can you teach?" />
             <input value={wanting} onChange={e => setWanting(e.target.value)} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:border-blue-400 dark:text-white" placeholder="What do you want to learn?" />
           </div>
           <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:border-blue-400 resize-none dark:text-white mb-6" placeholder="Share your experience level..." />
           <div className="flex justify-end space-x-3"><button onClick={() => setShowForm(false)} className="px-6 py-2 font-bold text-slate-400 hover:text-slate-600">Cancel</button><button onClick={handlePost} className="px-10 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700">Submit Offer</button></div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {entries.map((entry: any) => (
          <div key={entry.id} className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all">
             <div className="flex items-center space-x-4 mb-6"><img src={`https://picsum.photos/seed/${entry.userId}/48/48`} className="h-12 w-12 rounded-2xl shadow-md" /><div><h4 className="font-bold text-slate-900 dark:text-white">{entry.userName}</h4><p className="text-xs text-slate-400 flex items-center"><MapPinIcon className="h-3 w-3 mr-1" /> Remote Exchange</p></div></div>
             <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl mb-6"><div className="text-center"><p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Teaches</p><p className="font-bold text-slate-900 dark:text-white">{entry.skillOffered}</p></div><ArrowsRightLeftIcon className="h-6 w-6 text-slate-300" /><div className="text-center"><p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-1">Wants</p><p className="font-bold text-slate-900 dark:text-white">{entry.skillWanted}</p></div></div>
             <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-8">"{entry.description}"</p>
             <button className="w-full flex items-center justify-center py-4 bg-white dark:bg-slate-700 border border-blue-100 dark:border-slate-600 text-blue-600 dark:text-blue-300 font-bold rounded-2xl hover:bg-blue-50 dark:hover:bg-slate-600 transition-all"><ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />Send Collaboration Request</button>
          </div>
        ))}
      </div>
    </div>
  );
};
