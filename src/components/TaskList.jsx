import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TaskList = ({ tasks, onToggle, onDelete, onEdit }) => {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleEditStart = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const handleEditSave = (id) => {
    if (editText.trim()) {
      onEdit(id, editText);
    }
    setEditingId(null);
    setEditText('');
  };

  return (
    <div className="task-list">
      {tasks.map(task => (
        <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
          {editingId === task.id ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={() => handleEditSave(task.id)}
              onKeyPress={(e) => e.key === 'Enter' && handleEditSave(task.id)}
              autoFocus
            />
          ) : (
            <>
              <div className="task-content">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggle(task.id)}
                />
                <span className="text">{task.text}</span>
              </div>
              <div className="task-actions">
                <button onClick={() => handleEditStart(task)}>Edit</button>
                <button onClick={() => onDelete(task.id)}>Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired
    })
  ).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default TaskList;