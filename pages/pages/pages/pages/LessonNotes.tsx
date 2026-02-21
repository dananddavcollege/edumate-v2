import React, { useState } from 'react';
import { getDB, saveDB, currentUser } from '../db';
import { GeminiService } from '../geminiService';
import { DocumentTextIcon, CalendarIcon, XMarkIcon, MagnifyingGlassIcon, ArrowUpTrayIcon, SparklesIcon } from '@heroicons/react/24/outline';

export const LessonNotes: React.FC = () => {
  const db = getDB();
  const [notes, setNotes] = useState(db.lessonNotes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newNote, setNewNote] = useState({ title: '', content: '', category: 'General' });

  const filteredNotes = notes.filter((note: any) => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) || note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleGenerateAINote = async (e: React.FormEvent) => {
    e.preventDefault(); if (!aiTopic || isGenerating) return;
    setIsGenerating(true);
    const gemini = GeminiService.getInstance();
    const content = await gemini.generateSummary(aiTopic);
    if (content) {
      const noteToAdd = { id: `n${Date.now()}`, userId: currentUser.id, userName: currentUser.name, title: `AI Note: ${aiTopic}`, content, category: 'General', createdAt: new Date().toISOString() };
      const updated = [noteToAdd, ...notes];
      setNotes(updated); saveDB({ ...db, lessonNotes: updated });
      setIsAIModalOpen(false); setAiTopic('');
    }
    setIsGenerating(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div><h1 className="text-4xl font-black text-slate-900 dark:text-white">Lesson Notes</h1><p className="text-slate-500 mt-1">Community-sourced summaries and expert study guides.</p></div>
        <div className="flex space-x-4"><button onClick={() => setIsAIModalOpen(true)} className="bg-indigo-600 text-white px-6 py-4 rounded-2xl font-bold flex items-center hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 dark:shadow-none whitespace-nowrap"><SparklesIcon className="h-5 w-5 mr-2" />AI Generator</button></div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredNotes.map((note: any) => (
          <div key={note.id} className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col h-full group">
             <div className="flex items-start justify-between mb-6"><div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-2xl text-blue-600 group-hover:scale-110 transition-transform"><DocumentTextIcon className="h-7 w-7" /></div><span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 dark:bg-slate-900 px-3 py-1 rounded-full">{note.category}</span></div>
             <h3 className="font-bold text-xl dark:text-white mb-4 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">{note.title}</h3>
             <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-grow line-clamp-6 whitespace-pre-wrap">{note.content}</p>
             <div className="mt-8 pt-6 border-t border-slate-50 dark:border-slate-700 flex items-center justify-between"><div className="flex items-center space-x-3"><img src={`https://picsum.photos/seed/${note.userId}/32/32`} className="h-8 w-8 rounded-full bg-slate-100" /><div><p className="text-xs font-bold dark:text-white">{note.userName}</p><div className="flex items-center text-[10px] text-slate-400 font-bold uppercase tracking-widest"><CalendarIcon className="h-3 w-3 mr-1" /><span>{new Date(note.createdAt).toLocaleDateString()}</span></div></div></div></div>
          </div>
        ))}
      </div>
      {isAIModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
           <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden">
             <div className="p-8 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between"><div className="flex items-center space-x-3"><SparklesIcon className="h-6 w-6 text-indigo-600" /><h3 className="text-2xl font-black dark:text-white">AI Note Generator</h3></div><button onClick={() => setIsAIModalOpen(false)} className="p-2 text-slate-400 hover:text-red-500"><XMarkIcon className="h-7 w-7" /></button></div>
             <form onSubmit={handleGenerateAINote} className="p-8 space-y-6"><input required type="text" value={aiTopic} onChange={e => setAiTopic(e.target.value)} className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="e.g. Photosynthesis, Machine Learning..." /><button disabled={isGenerating} type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-100 dark:shadow-none transition-all flex items-center justify-center">{isGenerating ? 'Generating...' : 'Generate Summary'}</button></form>
           </div>
        </div>
      )}
    </div>
  );
};
