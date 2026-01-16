import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/App.css'
import Header from './components/organisms/Header';
import DashboardTemplate from './components/templates/DashboardTemplate';
import { useProfileStore } from './store/useProfileStore';

import TaskTemplate from './components/templates/TaskTemplate';
import PodomoroTemplate from './components/templates/PodomoroTemplate';
import JournalTemplate from './components/templates/JournalTemplate';
import MemoTemplate from './components/templates/MemoTemplate';
import CalendarTemplate from './components/templates/CalendarTemplate';
import MuslimTemplate from './components/templates/MuslimTemplate';
import MiniTimerTemplate from './components/templates/MiniTimerTemplate';

function App() {
  const { themeColor } = useProfileStore();
  const [isMiniMode, setIsMiniMode] = useState(window.innerWidth < 450);

  useEffect(() => {
    const handleResize = () => {
      setIsMiniMode(window.innerWidth < 450);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleExpand = () => {
    // Send IPC to Main process to resize window
    window.electron?.ipcRenderer?.send('app:main-mode');
  };

  if (isMiniMode) {
    return <MiniTimerTemplate onExpand={handleExpand} />;
  }

  return (
    <div
      className="h-screen flex flex-col overflow-hidden transition-colors duration-700 ease-in-out"
      style={{
        background: `linear-gradient(135deg, #ffffff 0%, #ffffff 60%, ${themeColor}90 100%)`
      }}
    >
      <Header />
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardTemplate />} />
          <Route path="/task" element={<TaskTemplate />} />
          <Route path="/pomodoro" element={<PodomoroTemplate />} />
          <Route path="/journal" element={<JournalTemplate />} />
          <Route path="/memo" element={<MemoTemplate />} />
          {/* Calendar route placeholder if needed, or mapped to existing templates */}
          <Route path="/calendar" element={<CalendarTemplate />} />
          <Route path="/muslim" element={<MuslimTemplate />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
