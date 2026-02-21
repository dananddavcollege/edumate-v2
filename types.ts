export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  points: number;
  streak: number;
  badges: string[];
  avatar?: string;
  rank: 'Beginner' | 'Explorer' | 'Scholar' | 'Master';
  completedLessons: string[];
  savedLessons: string[];
}

export interface Lesson {
  id: string;
  title: string;
  category: string;
  difficulty: Difficulty;
  content: string;
  points: number;
  isLocked?: boolean;
}

export interface LessonNote {
  id: string;
  userId: string;
  userName: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  lessonId: string;
  questions: QuizQuestion[];
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  title: string;
  content: string;
  likes: number;
  replies: number;
  createdAt: string;
  category: string;
}

export interface SkillExchangeEntry {
  id: string;
  userId: string;
  userName: string;
  skillOffered: string;
  skillWanted: string;
  description: string;
}

export interface PortfolioProject {
  id: string;
  userId: string;
  title: string;
  description: string;
  link: string;
  completedAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}
