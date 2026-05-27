import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getLessonByPath } from '../data/courseMap';
import { useProgress } from '../hooks/useProgress';
import { CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';

// Using Vite's glob import to get all markdown content at build time
const markdownModules = import.meta.glob('../content/**/*.md', { query: '?raw', import: 'default' });

export const LessonViewer = () => {
  const { moduleId, lessonId } = useParams();
  const navigate = useNavigate();
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
            setContent('# Content not found\n\nThe requested lesson file could not be located.');
          }
        }
      } catch (error) {
        console.error('Error loading markdown:', error);
        setContent('# Error\n\nFailed to load content.');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [moduleId, lessonId, data]);

  if (!data || !data.lesson) {
    return <div className="p-8">Lesson not found.</div>;
  }

  const handleMarkComplete = () => {
    markComplete(lessonPath);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="max-w-4xl mx-auto px-8 py-10">
        
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <span>{data.module.title}</span>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-gray-900 font-medium">{data.lesson.title}</span>
        </div>

        {/* Content */}
        <div className="prose prose-blue max-w-none">
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ) : (
            <ReactMarkdown>{content}</ReactMarkdown>
          )}
        </div>

        {/* Actions */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between">
          <button
            onClick={handleMarkComplete}
            disabled={completed}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              completed
                ? 'bg-green-50 text-green-700 cursor-default'
                : 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm'
            }`}
          >
            <CheckCircle size={20} />
            {completed ? 'Completed' : 'Mark as Complete'}
          </button>
        </div>
        
      </div>
    </div>
  );
};
