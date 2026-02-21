import React, { useState, useRef, useEffect } from 'react';
import { GeminiService } from '../geminiService';
import { PaperAirplaneIcon, AcademicCapIcon, UserCircleIcon, ChatBubbleLeftRightIcon, LightBulbIcon, DocumentTextIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';
import { currentUser, getDB, saveDB } from '../db';
import { useNavigate, useLocation } from 'react-router-dom';

export const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = async (text: string = input) => {
    const messageToSend = text.trim(); if (!messageToSend || isLoading) return;
    const userMsg = { role: 'user', content: messageToSend, id: Date.now().toString(), timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]); setInput(''); setIsLoading(true);
    const gemini = GeminiService.getInstance();
    const responseText = await gemini.chat(messageToSend, messages.map(m => ({ role: m.role, parts: [{ text: m.content }] })));
    const modelMsg = { role: 'model', content: responseText || "Error", id: (Date.now() + 1).toString(), timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, modelMsg]); setIsLoading(false);
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col max-w-5xl mx-auto bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-xl overflow-hidden animate-fade-in">
      <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between"><div className="flex items-center space-x-4"><div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg"><AcademicCapIcon className="h-7 w-7" /></div><div><h2 className="font-bold text-slate-900 dark:text-white text-xl uppercase tracking-tight">EduMate AI</h2><p className="text-[10px] text-green-500 font-black uppercase tracking-widest flex items-center"><span className="h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>AI Tutor Online</p></div></div></div>
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-8">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[90%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start`}>
              <div className={`p-2.5 rounded-2xl mt-1 ${m.role === 'user' ? 'ml-4' : 'mr-4'} bg-slate-100 dark:bg-slate-700 flex-shrink-0 shadow-sm border border-slate-200 dark:border-slate-600`}>{m.role === 'user' ? <UserCircleIcon className="h-6 w-6 text-slate-400" /> : <AcademicCapIcon className="h-6 w-6 text-blue-600" />}</div>
              <div className={`px-8 py-5 rounded-[2rem] text-sm leading-relaxed whitespace-pre-wrap font-medium shadow-sm ${m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white dark:bg-slate-700 dark:text-white rounded-tl-none border border-slate-100 dark:border-slate-600'}`}>{m.content}</div>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>
      <div className="p-8 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700">
        <div className="relative max-w-4xl mx-auto"><input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask me anything..." className="w-full pl-8 pr-16 py-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-blue-500 outline-none transition-all shadow-inner text-lg font-medium" /><button onClick={() => handleSend()} disabled={!input.trim() || isLoading} className={`absolute right-2.5 top-1/2 -translate-y-1/2 p-4 rounded-[1.5rem] transition-all ${!input.trim() || isLoading ? 'bg-slate-200 text-slate-400' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl'}`}><PaperAirplaneIcon className="h-6 w-6" /></button></div>
      </div>
    </div>
  );
};
