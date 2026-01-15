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

function App() {
  const { themeColor } = useProfileStore();

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
          <Route path="/calendar" element={<div className="p-8">Calendar Page (Coming Soon)</div>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
