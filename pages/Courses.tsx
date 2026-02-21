import React from 'react';
import { Link } from 'react-router-dom';
import { getDB } from '../db';
import { AcademicCapIcon, StarIcon } from '@heroicons/react/24/outline';

export const Courses: React.FC = () => {
  const db = getDB();
  const categories = ['All', 'Technology', 'Science', 'Trading', 'Digital Skills'];

  return (
    <div className="space-y-10 animate-fade-in">
      <header>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white">Course Catalog</h1>
        <p className="text-slate-500 mt-1">Choose a path and start mastering new skills today.</p>
      </header>

      <div className="flex flex-wrap gap-3">
        {categories.map(cat => (
          <button key={cat} className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${cat === 'All' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white dark:bg-slate-800 text-slate-500 hover:bg-slate-50'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {db.lessons.map((lesson: any) => (
          <Link key={lesson.id} to={`/app/learn/courses/${lesson.id}`} className="bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700 overflow-hidden hover:shadow-2xl transition-all group">
            <div className="h-48 bg-slate-100 dark:bg-slate-900 relative">
               <img src={`https://picsum.photos/seed/${lesson.id}/600/400`} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
               <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-800/90 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-600">{lesson.category}</div>
            </div>
            <div className="p-8">
               <h3 className="text-xl font-bold dark:text-white mb-2">{lesson.title}</h3>
               <div className="flex items-center space-x-4 text-xs text-slate-400 font-bold uppercase tracking-widest mb-6">
                  <span className="flex items-center"><StarIcon className="h-4 w-4 mr-1 text-yellow-500" /> {lesson.difficulty}</span>
                  <span>{lesson.points} XP</span>
               </div>
               <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-slate-700">
                  <span className="text-blue-600 font-bold text-sm">Start Lesson</span>
                  <AcademicCapIcon className="h-5 w-5 text-slate-300 group-hover:text-blue-600 transition-colors" />
               </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
