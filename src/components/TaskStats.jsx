// src/components/TaskStats.jsx
import React, { useContext, useMemo } from 'react';
import { TaskStatsContext } from '../context/TaskStatsContext';

const TaskStats = () => {
  const stats = useContext(TaskStatsContext);

  const progress = useMemo(() => {
    return stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100);
  }, [stats]);

  return (
    <div className="task-stats">
      <p>Total Tasks: {stats.total}</p>
      <p>Completed: {stats.completed}</p>
      <p>Progress: {progress}%</p>
    </div>
  );
};

export default TaskStats;
