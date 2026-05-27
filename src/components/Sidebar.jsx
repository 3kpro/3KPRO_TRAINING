import React from 'react';
import { NavLink } from 'react-router-dom';
import { courseMap } from '../data/courseMap';
import { useProgress } from '../hooks/useProgress';
import { Terminal, CheckCircle, Cpu } from 'lucide-react';

export const Sidebar = () => {
  const { isCompleted } = useProgress();

  return (
    <aside className="w-72 bg-dark-surface border-r border-dark-border min-h-screen p-6 overflow-y-auto relative">
      <div className="mb-10 flex flex-col items-center">
        <div className="w-16 h-16 bg-black border border-neon-cyan flex items-center justify-center rounded-lg shadow-[0_0_15px_rgba(0,243,255,0.4)] mb-4">
          <Terminal className="text-neon-cyan" size={32} />
        </div>
        <h2 className="text-sm font-bold text-neon-cyan tracking-[0.3em] text-center">
          3KPRO_CORE
        </h2>
        <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-tighter">System Training Interface</div>
      </div>
      
      <nav className="space-y-8">
        <div>
          <NavLink 
            to="/" 
            className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded border transition-all duration-300 ${isActive ? 'bg-neon-cyan/10 border-neon-cyan text-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.2)]' : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-dark-border'}`}
          >
            <Cpu size={18} />
            <span className="text-xs uppercase font-bold tracking-widest">Dashboard</span>
          </NavLink>
        </div>

        {courseMap.map((module) => (
          <div key={module.id} className="space-y-2">
            <h3 className="px-4 text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mb-3">
              // {module.title}
            </h3>
            {module.lessons.map((lesson) => {
              const lessonPath = `${module.id}/${lesson.id}`;
              const completed = isCompleted(lessonPath);
              return (
                <NavLink
                  key={lesson.id}
                  to={`/lesson/${lessonPath}`}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-2 text-[11px] border-l-2 transition-all duration-300 ${
                      isActive
                        ? 'border-neon-purple bg-neon-purple/5 text-neon-purple font-bold'
                        : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-700'
                    }`
                  }
                >
                  <span className="truncate uppercase tracking-wider">{lesson.title}</span>
                  {completed && <CheckCircle size={12} className="text-neon-cyan ml-2 shrink-0 animate-pulse" />}
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>
      
      {/* Decorative elements */}
      <div className="absolute bottom-4 left-6 right-6 opacity-20">
        <div className="h-[1px] bg-dark-border mb-1"></div>
        <div className="text-[8px] text-gray-500 flex justify-between font-mono">
          <span>SECURED_CHANNEL_01</span>
          <span>v2.0.26</span>
        </div>
      </div>
    </aside>
  );
};
