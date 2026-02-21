import { User, Lesson, Quiz, Post, SkillExchangeEntry, LessonNote } from './types';

const STORAGE_KEY = 'edumate_data';

const INITIAL_DATA = {
  users: [{ id: '1', name: 'Adam Mahmud', email: 'adam@example.com', role: 'admin', points: 1250, streak: 5, badges: ['First Step', 'Explorer'], rank: 'Explorer', completedLessons: ['l1', 'l2'], savedLessons: ['l3'] }],
  lessons: [
    { id: 'l1', title: 'Introduction to React', category: 'Technology', difficulty: 'Beginner', points: 100, content: 'React is a JavaScript library for building user interfaces...' },
    { id: 'l2', title: 'Trading Basics 101', category: 'Trading', difficulty: 'Beginner', points: 150, content: 'Trading involves the exchange of assets...' }
  ],
  quizzes: [{ id: 'q1', lessonId: 'l1', questions: [{ question: 'Who developed React?', options: ['Google', 'Meta', 'Microsoft', 'Apple'], correctAnswer: 1, explanation: 'React was created by Facebook.' }] }],
  posts: [],
  skillExchange: [],
  chats: [],
  lessonNotes: []
};

export const getDB = () => {
  const data = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
  return data ? JSON.parse(data) : INITIAL_DATA;
};

export const saveDB = (db: any) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
};

export const currentUser = getDB().users[0];
