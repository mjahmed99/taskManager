// src/components/TaskInput.jsx
import React, { useState, useRef, useEffect } from 'react';

const TaskInput = ({ onAdd }) => {
  const [text, setText] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-input">
      <input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter new task"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TaskInput;
