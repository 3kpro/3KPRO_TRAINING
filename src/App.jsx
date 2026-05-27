import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { LessonViewer } from './components/LessonViewer';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/lesson/:moduleId/:lessonId" element={<LessonViewer />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
