import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDB, currentUser, saveDB } from '../db';
import { ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export const LessonDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const db = getDB();
  const lesson = db.lessons.find((l: any) => l.id === id);

  if (!lesson) return <div>Lesson not found</div>;

  const handleComplete = () => {
    if (!currentUser.completedLessons.includes(lesson.id)) {
      currentUser.completedLessons.push(lesson.id);
      currentUser.points += lesson.points;
      saveDB({ ...db, users: db.users.map((u: any) => u.id === currentUser.id ? currentUser : u) });
      alert(`Congratulations! You earned ${lesson.points} XP!`);
    }
    navigate('/app/learn/courses');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <button onClick={() => navigate(-1)} className="flex items-center text-slate-500 hover:text-blue-600 transition-colors font-bold text-sm">
        <ArrowLeftIcon className="h-5 w-5 mr-2" /> Back to Catalog
      </button>
      <div className="bg-white dark:bg-slate-800 rounded-[3rem] border border-slate-100 dark:border-slate-700 overflow-hidden shadow-xl">
        <div className="h-64 bg-slate-900 relative">
           <img src={`https://picsum.photos/seed/${lesson.id}/1200/600`} className="w-full h-full object-cover opacity-50" />
           <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-4xl font-black text-white text-center px-6">{lesson.title}</h1>
           </div>
        </div>
        <div className="p-12 space-y-8">
           <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
              {lesson.content}
           </div>
           <button onClick={handleComplete} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold text-xl hover:bg-blue-700 shadow-xl shadow-blue-200 dark:shadow-none flex items-center justify-center transition-all">
              <CheckCircleIcon className="h-6 w-6 mr-2" /> Mark as Completed
           </button>
        </div>
      </div>
    </div>
  );
};
