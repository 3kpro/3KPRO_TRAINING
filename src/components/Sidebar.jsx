import React from 'react';
import { NavLink } from 'react-router-dom';
import { courseMap } from '../data/courseMap';
import { useProgress } from '../hooks/useProgress';
import { BookOpen, CheckCircle } from 'lucide-react';

export const Sidebar = () => {
  const { isCompleted } = useProgress();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4 overflow-y-auto">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <BookOpen className="text-primary-600" />
          3KPRO Training
        </h2>
      </div>
      
      <nav className="space-y-6">
        <div className="mb-4">
          <NavLink 
            to="/" 
            className={({isActive}) => `block px-3 py-2 rounded-md font-medium ${isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            Dashboard
          </NavLink>
        </div>

        {courseMap.map((module) => (
          <div key={module.id} className="space-y-1">
            <h3 className="px-3 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
              {module.title}
            </h3>
            {module.lessons.map((lesson) => {
              const lessonPath = `${module.id}/${lesson.id}`;
              const completed = isCompleted(lessonPath);
              return (
                <NavLink
                  key={lesson.id}
                  to={`/lesson/${lessonPath}`}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <span className="truncate">{lesson.title}</span>
                  {completed && <CheckCircle size={14} className="text-green-500 ml-2 shrink-0" />}
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
};
