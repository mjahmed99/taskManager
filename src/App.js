import React, { useCallback } from 'react';
import './App.css';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import TaskStats from './components/TaskStats';
import Timer from './components/Timer';
import { ThemeProvider } from './context/ThemeContext';
import { TaskStatsProvider } from './context/TaskStatsContext';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);

  // Memoize task operations for better performance
  const addTask = useCallback((text) => {
    if (!text?.trim()) return;

    setTasks(prevTasks => [...prevTasks, {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    }]);
  }, [setTasks]);

  const toggleTask = useCallback((id) => {
    setTasks(prevTasks => 
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, [setTasks]);

  const deleteTask = useCallback((id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }, [setTasks]);

  // Add edit functionality
  const editTask = useCallback((id, newText) => {
    if (!newText?.trim()) return;

    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, text: newText.trim() } : task
      )
    );
  }, [setTasks]);

  return (
    <ThemeProvider>
      <TaskStatsProvider tasks={tasks}>
        <div className="app-container">
          <h1>Smart Task Manager</h1>
          <TaskInput onAdd={addTask} />
          <TaskList 
            tasks={tasks} 
            onToggle={toggleTask} 
            onDelete={deleteTask}
            onEdit={editTask}
          />
          <TaskStats />
          <Timer />
        </div>
      </TaskStatsProvider>
    </ThemeProvider>
  );
}

export default App;