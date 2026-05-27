import { useState, useEffect } from 'react';

const PROGRESS_KEY = '3kpro_training_progress';

export const useProgress = () => {
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      const stored = localStorage.getItem(PROGRESS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading progress from LocalStorage', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(completedLessons));
    } catch (error) {
      console.error('Error saving progress to LocalStorage', error);
    }
  }, [completedLessons]);

  const markComplete = (lessonPath) => {
    setCompletedLessons((prev) => {
      if (!prev.includes(lessonPath)) {
        return [...prev, lessonPath];
      }
      return prev;
    });
  };

  const isCompleted = (lessonPath) => {
    return completedLessons.includes(lessonPath);
  };

  const getModuleProgress = (module) => {
    if (!module || !module.lessons.length) return 0;
    const completedCount = module.lessons.filter((l) =>
      isCompleted(`${module.id}/${l.id}`)
    ).length;
    return Math.round((completedCount / module.lessons.length) * 100);
  };

  const getOverallProgress = (courseMap) => {
    let totalLessons = 0;
    let totalCompleted = 0;
    
    courseMap.forEach((module) => {
      totalLessons += module.lessons.length;
      totalCompleted += module.lessons.filter((l) =>
        isCompleted(`${module.id}/${l.id}`)
      ).length;
    });

    if (totalLessons === 0) return 0;
    return Math.round((totalCompleted / totalLessons) * 100);
  };

  return {
    completedLessons,
    markComplete,
    isCompleted,
    getModuleProgress,
    getOverallProgress,
  };
};
