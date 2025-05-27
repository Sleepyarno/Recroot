import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/Dashboard';
import SetupPage from './pages/Setup';
import NewTaskPage from './pages/NewTask';
import ReviewQueuePage from './pages/ReviewQueue';
import CalendarPage from './pages/Calendar';
import TaskDetailPage from './pages/TaskDetailPage';
import AdvancedPromptManagementPage from './pages/AdvancedPromptManagementPage';
import Navbar from './components/Navbar';
import './App.css'

function App() {
  return (
    <Router>
      <div className="bg-[#0D1117] text-white min-h-screen flex flex-col">
        <Navbar appName="Recroot" />
        <main className="flex-grow container mx-auto p-6 md:p-8">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/setup" element={<SetupPage />} />
            <Route path="/new-task" element={<NewTaskPage />} />
            <Route path="/review-queue" element={<ReviewQueuePage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/task/:taskId" element={<TaskDetailPage />} />
            <Route path="/admin/prompts" element={<AdvancedPromptManagementPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
