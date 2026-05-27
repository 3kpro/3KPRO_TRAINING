import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { LessonViewer } from './components/LessonViewer';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-dark-bg font-mono overflow-hidden selection:bg-neon-cyan selection:text-black">
        {/* Animated Background Grid */}
        <div className="fixed inset-0 pointer-events-none opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a2e_1px,transparent_1px),linear-gradient(to_bottom,#1a1a2e_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-bg to-dark-bg"></div>
        </div>

        <Sidebar />
        
        <main className="flex-1 flex flex-col h-full overflow-hidden relative border-l border-dark-border">
          {/* Top Decorative bar */}
          <div className="h-1 w-full bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan bg-[length:200%_100%] animate-[border-glow_4s_linear_infinite] opacity-50"></div>
          
          <div className="flex-1 overflow-hidden relative">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/lesson/:moduleId/:lessonId" element={<LessonViewer />} />
            </Routes>
          </div>
          
          {/* Bottom decorative elements */}
          <div className="absolute bottom-0 left-0 right-0 h-10 border-t border-dark-border bg-dark-surface/80 flex items-center px-6 justify-between text-[8px] text-gray-600 font-mono pointer-events-none">
            <div className="flex gap-4">
              <span className="flex items-center gap-1"><div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div> SYSTEM_STATUS: OPERATIONAL</span>
              <span>UPLINK: ACTIVE_ENCRYPTED</span>
            </div>
            <div className="flex gap-4">
              <span>LATENCY: 12ms</span>
              <span>STREAMS: 104_ACTIVE</span>
            </div>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
