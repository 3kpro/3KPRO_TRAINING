import React from 'react';
import { Link } from 'react-router-dom';
import { courseMap } from '../data/courseMap';
import { useProgress } from '../hooks/useProgress';
import { ProgressBar } from './ProgressBar';

export const Dashboard = () => {
  const { getModuleProgress, getOverallProgress } = useProgress();
  const overallProgress = getOverallProgress(courseMap);

  return (
    <div className="p-8 max-w-6xl mx-auto w-full">
      <div className="mb-10 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
        <p className="text-gray-600 mb-6">Continue your journey to mastering DevOps and Cloud Technologies.</p>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm font-bold text-primary-600">{overallProgress}%</span>
          </div>
          <ProgressBar progress={overallProgress} />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">Course Modules</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courseMap.map((module) => {
          const progress = getModuleProgress(module);
          return (
            <div key={module.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{module.title}</h3>
              <p className="text-gray-600 text-sm mb-6 flex-grow">{module.description}</p>
              
              <div className="mt-auto">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500">{module.lessons.length} Lessons</span>
                  <span className="text-xs font-semibold text-primary-600">{progress}%</span>
                </div>
                <ProgressBar progress={progress} />
                
                <Link
                  to={`/lesson/${module.id}/${module.lessons[0].id}`}
                  className="mt-4 block w-full text-center bg-primary-50 text-primary-700 hover:bg-primary-100 font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  {progress > 0 ? 'Continue' : 'Start'} Module
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
