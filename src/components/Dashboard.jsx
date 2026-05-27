import React from 'react';
import { Link } from 'react-router-dom';
import { courseMap } from '../data/courseMap';
import { useProgress } from '../hooks/useProgress';
import { ProgressBar } from './ProgressBar';
import { Activity, Zap, Box } from 'lucide-react';

export const Dashboard = () => {
  const { getModuleProgress, getOverallProgress } = useProgress();
  const overallProgress = getOverallProgress(courseMap);

  return (
    <div className="p-10 max-w-7xl mx-auto w-full relative z-10 pb-24">
      <div className="scanline"></div>
      
      <div className="mb-12 glow-border p-8 border border-neon-cyan/20 bg-dark-surface/80 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Activity size={120} className="text-neon-cyan" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2 text-neon-cyan animate-pulse">
            <Zap size={16} />
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase">System Online // User Authorized</span>
          </div>
          <h1 className="text-4xl mb-2 font-black text-white tracking-tighter">Command Center</h1>
          <p className="text-gray-500 text-sm max-w-2xl font-mono mb-8 border-l-2 border-neon-purple pl-4 italic">
            "The grid. A digital frontier. I tried to picture clusters of information as they moved through the computer..."
          </p>
          
          <div className="max-w-md">
            <div className="flex justify-between items-end mb-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Global Sync Status</span>
              <span className="text-lg font-black text-neon-cyan">{overallProgress}%</span>
            </div>
            <ProgressBar progress={overallProgress} />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-8">
        <Box className="text-neon-purple" size={20} />
        <h2 className="text-xl font-black tracking-[0.2em] text-white uppercase">Operational Modules</h2>
        <div className="h-[1px] flex-1 bg-dark-border ml-4"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courseMap.map((module) => {
          const progress = getModuleProgress(module);
          return (
            <div key={module.id} className="glow-border bg-dark-surface/50 p-6 flex flex-col group transition-all duration-500 hover:bg-dark-surface/80 border border-dark-border hover:border-neon-purple/50">
              <div className="flex justify-between items-start mb-4">
                <div className="text-[10px] text-gray-600 font-mono">MOD_ID: {module.id.toUpperCase()}</div>
                <div className={`h-2 w-2 rounded-full shadow-[0_0_8px] ${progress > 0 ? 'bg-neon-cyan shadow-neon-cyan animate-pulse' : 'bg-gray-800 shadow-transparent'}`}></div>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors tracking-wider">{module.title}</h3>
              <p className="text-gray-500 text-xs mb-8 flex-grow leading-relaxed font-mono">{module.description}</p>
              
              <div className="mt-auto">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] text-gray-600 font-bold uppercase tracking-tighter">{module.lessons.length} Sub-Processes</span>
                  <span className="text-[10px] font-black text-neon-purple uppercase">{progress}% complete</span>
                </div>
                <ProgressBar progress={progress} />
                
                <Link
                  to={`/lesson/${module.id}/${module.lessons[0].id}`}
                  className="mt-6 block w-full text-center border border-dark-border text-gray-400 hover:border-neon-cyan hover:text-neon-cyan hover:bg-neon-cyan/5 font-black py-3 px-4 transition-all duration-300 text-[10px] uppercase tracking-[0.3em]"
                >
                  {progress > 0 ? 'Resume Execution' : 'Initialize Module'}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
