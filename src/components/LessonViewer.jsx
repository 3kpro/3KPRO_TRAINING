import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { getLessonByPath } from '../data/courseMap';
import { useProgress } from '../hooks/useProgress';
import { CheckCircle, ChevronRight, Terminal, Shield, FlaskConical } from 'lucide-react';
import { LabEnvironment } from './LabEnvironment';

const markdownModules = import.meta.glob('../content/**/*.md', { query: '?raw', import: 'default' });

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
};

export const LessonViewer = () => {
  const { moduleId, lessonId } = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  
  const { markComplete, isCompleted } = useProgress();
  const lessonPath = `${moduleId}/${lessonId}`;
  const completed = isCompleted(lessonPath);

  const data = getLessonByPath(moduleId, lessonId);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        if (data && data.lesson) {
          const filePath = `../content/${data.lesson.file}`;
          const importer = markdownModules[filePath];
          if (importer) {
            const markdownContent = await importer();
            setContent(markdownContent);
          } else {
            setContent('# [!] ERROR: SECTOR_NOT_FOUND\n\nThe requested data stream could not be localized.');
          }
        }
      } catch (error) {
        console.error('Error loading markdown:', error);
        setContent('# [!] CRITICAL_FAILURE\n\nFailed to establish connection to data bank.');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [moduleId, lessonId, data]);

  if (!data || !data.lesson) {
    return (
      <div className="p-20 flex flex-col items-center justify-center text-center">
        <Shield size={64} className="text-red-500 mb-6 animate-pulse" />
        <h1 className="text-2xl font-black text-white uppercase tracking-[0.5em]">Access Denied</h1>
        <p className="text-gray-500 font-mono mt-4 text-xs uppercase">Unauthorized access attempt logged. Redirecting to home...</p>
      </div>
    );
  }

  const handleMarkComplete = () => {
    markComplete(lessonPath);
  };

  return (
    <motion.div 
      key={lessonPath}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex-1 bg-dark-bg relative min-h-full"
    >
      <div className="scanline"></div>
      
      <div className="max-w-4xl mx-auto px-10 py-12 relative z-10 pb-24">
        
        {/* Header / Breadcrumb */}
        <div className="flex items-center gap-2 mb-10 border-b border-dark-border pb-6">
          <div className="p-2 bg-neon-cyan/10 border border-neon-cyan/30 rounded">
            <Terminal size={14} className="text-neon-cyan" />
          </div>
          <div className="flex items-center text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500">
            <span>{data.module.title}</span>
            <ChevronRight size={12} className="mx-2 text-neon-purple" />
            <span className="text-white">{data.lesson.title}</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-dark-surface/30 border border-dark-border/50 rounded-lg p-10 backdrop-blur-sm shadow-2xl mb-12">
          <article className="prose prose-invert prose-neon max-w-none">
            {loading ? (
              <div className="animate-pulse space-y-8">
                <div className="h-10 bg-dark-border rounded w-1/3"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-dark-border rounded w-full"></div>
                  <div className="h-4 bg-dark-border rounded w-5/6"></div>
                  <div className="h-4 bg-dark-border rounded w-4/6"></div>
                </div>
                <div className="h-48 bg-dark-border rounded w-full"></div>
              </div>
            ) : (
              <ReactMarkdown>{content}</ReactMarkdown>
            )}
          </article>
        </div>

        {/* Interactive Lab Section */}
        {data.lesson.lab && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <FlaskConical className="text-neon-cyan animate-bounce" size={20} />
              <h3 className="text-lg font-black tracking-[0.2em] text-white uppercase">Hands-on Lab</h3>
              <div className="h-[1px] flex-1 bg-dark-border ml-4"></div>
            </div>
            <LabEnvironment 
              labData={data.lesson.lab} 
              onComplete={handleMarkComplete} 
            />
          </div>
        )}

        {/* Manual Mark Complete (if no lab or lab done) */}
        {(!data.lesson.lab || completed) && (
          <div className="mt-20 pt-10 border-t border-dark-border flex flex-col items-center">
            <div className="text-[10px] font-mono text-gray-600 mb-4 uppercase tracking-[0.4em]">Finalize Instruction Block</div>
            <button
              onClick={handleMarkComplete}
              disabled={completed}
              className={`group relative flex items-center gap-3 px-10 py-4 font-black transition-all duration-500 uppercase tracking-[0.3em] text-xs ${
                completed
                  ? 'bg-transparent border border-neon-cyan/20 text-neon-cyan/50 cursor-default shadow-[0_0_10px_rgba(0,243,255,0.1)]'
                  : 'bg-transparent border border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white shadow-[0_0_20px_rgba(188,19,254,0.3)]'
              }`}
            >
              <CheckCircle size={18} className={completed ? '' : 'group-hover:animate-spin'} />
              {completed ? 'Success: Logged' : 'Execute: Complete'}
              
              {!completed && (
                <>
                  <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-neon-purple"></div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-neon-purple"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-neon-purple"></div>
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-neon-purple"></div>
                </>
              )}
            </button>
          </div>
        )}
        
        {/* Footer info */}
        <div className="mt-12 text-center opacity-20">
          <div className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">End of Stream // Authorized 3KPRO Personnel Only</div>
        </div>
        
      </div>
    </motion.div>
  );
};
