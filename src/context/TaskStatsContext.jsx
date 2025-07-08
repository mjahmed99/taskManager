// src/context/TaskStatsContext.jsx
import React, { createContext, useMemo } from 'react';

export const TaskStatsContext = createContext();

export const TaskStatsProvider = ({ tasks, children }) => {
  const value = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    return { total, completed };
  }, [tasks]);

  return (
    <TaskStatsContext.Provider value={value}>
      {children}
    </TaskStatsContext.Provider>
  );
};
