import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GeminiService } from '../geminiService';
import { ArrowLeftIcon, ClockIcon, AcademicCapIcon, CheckCircleIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { currentUser, getDB, saveDB } from '../db';

export const CBTExam: React.FC = () => {
  const location = useLocation(); const navigate = useNavigate();
  const topic = location.state?.topic || "General Knowledge";
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    const fetchQuestions = async () => {
      const gemini = GeminiService.getInstance();
      const generated = await gemini.generateQuiz(topic);
      if (generated) setQuestions(generated);
      setLoading(false);
    };
    fetchQuestions();
  }, [topic]);

  useEffect(() => {
    if (loading || isFinished) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => { if (prev <= 1) { clearInterval(timer); setIsFinished(true); return 0; } return prev - 1; });
    }, 1000);
    return () => clearInterval(timer);
  }, [loading, isFinished]);

  const handleFinish = () => {
    setIsFinished(true);
    const correctCount = questions.reduce((acc, q, idx) => selectedAnswers[idx] === q.correctAnswer ? acc + 1 : acc, 0);
    if (correctCount === questions.length) {
      const db = getDB(); currentUser.points += 50;
      saveDB({ ...db, users: db.users.map((u: any) => u.id === currentUser.id ? currentUser : u) });
    }
  };

  if (loading) return <div className="flex flex-col items-center justify-center h-96 text-center space-y-4"><div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div><p className="text-slate-500 font-bold animate-pulse">AI is crafting your CBT exam...</p></div>;

  if (isFinished) {
    const correctCount = questions.reduce((acc, q, idx) => selectedAnswers[idx] === q.correctAnswer ? acc + 1 : acc, 0);
    const scorePercent = Math.round((correctCount / questions.length) * 100);
    return (
      <div className="max-w-2xl mx-auto space-y-8 animate-fade-in py-12">
        <div className="bg-white dark:bg-slate-800 p-12 rounded-[3rem] shadow-xl text-center border border-slate-100 dark:border-slate-700">
           <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${scorePercent >= 70 ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}><TrophyIcon className="h-12 w-12" /></div>
           <h2 className="text-3xl font-black dark:text-white mb-2">Exam Results</h2>
           <p className="text-slate-500 mb-8">You scored {correctCount} out of {questions.length} correct</p>
           <button onClick={() => navigate('/app/ai')} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700">Back to AI Tutor</button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center justify-between"><button onClick={() => navigate(-1)} className="flex items-center text-slate-500 hover:text-blue-600"><ArrowLeftIcon className="h-5 w-5 mr-2" />Quit Practice</button><div className="flex items-center space-x-4"><div className="flex items-center bg-blue-50 dark:bg-blue-900/30 text-blue-600 px-4 py-2 rounded-xl text-sm font-bold"><ClockIcon className="h-5 w-5 mr-2" />{Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}</div></div></div>
      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-xl overflow-hidden">
        <div className="p-10 lg:p-16 space-y-12">
           <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white leading-tight">{currentQ.question}</h2>
           <div className="grid grid-cols-1 gap-4">{currentQ.options.map((opt: any, idx: any) => (<button key={idx} onClick={() => setSelectedAnswers({ ...selectedAnswers, [currentIndex]: idx })} className={`w-full text-left p-6 rounded-2xl border-2 transition-all ${selectedAnswers[currentIndex] === idx ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30' : 'border-slate-100 dark:border-slate-700 hover:border-blue-200'}`}><span className={`font-bold ${selectedAnswers[currentIndex] === idx ? 'text-blue-600' : 'text-slate-600 dark:text-slate-300'}`}>{opt}</span></button>))}</div>
           <div className="flex items-center justify-between pt-8 border-t border-slate-50 dark:border-slate-700"><button disabled={currentIndex === 0} onClick={() => setCurrentIndex(prev => prev - 1)} className="px-8 py-3 rounded-xl font-bold text-slate-400 hover:text-blue-600 disabled:opacity-30">Previous</button>{currentIndex === questions.length - 1 ? (<button onClick={handleFinish} className="bg-green-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-green-700 shadow-xl">Submit Exam</button>) : (<button onClick={() => setCurrentIndex(prev => prev + 1)} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 shadow-xl">Next Question</button>)}</div>
        </div>
      </div>
    </div>
  );
};
