import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Courses } from './pages/Courses';
import { Community } from './pages/Community';
import { SkillExchange } from './pages/SkillExchange';
import { Portfolio } from './pages/Portfolio';
import { Profile } from './pages/Profile';
import { AIChat } from './pages/AIChat';
import { Admin } from './pages/Admin';
import { Home } from './pages/Home';
import { LessonDetail } from './pages/LessonDetail';
import { LessonNotes } from './pages/LessonNotes';
import { CBTExam } from './pages/CBTExam';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    if (isDarkMode) { document.documentElement.classList.add('dark'); } 
    else { document.documentElement.classList.remove('dark'); }
  }, [isDarkMode]);

  return (
    <HashRouter>
      <div style={{ fontSize: `${fontSize}px` }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app" element={<Layout isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} setFontSize={setFontSize} fontSize={fontSize} />}>
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="learn">
              <Route index element={<Navigate to="/app/learn/courses" replace />} />
              <Route path="courses" element={<Courses />} />
              <Route path="courses/:id" element={<LessonDetail />} />
              <Route path="notes" element={<LessonNotes />} />
              <Route path="cbt" element={<CBTExam />} />
            </Route>
            <Route path="community">
              <Route index element={<Navigate to="/app/community/feed" replace />} />
              <Route path="feed" element={<Community />} />
              <Route path="skills" element={<SkillExchange />} />
            </Route>
            <Route path="user">
              <Route index element={<Navigate to="/app/user/profile" replace />} />
              <Route path="profile" element={<Profile />} />
              <Route path="portfolio" element={<Portfolio />} />
            </Route>
            <Route path="ai" element={<AIChat />} />
            <Route path="admin" element={<Admin />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
