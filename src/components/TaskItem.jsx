// src/components/TaskItem.jsx
import React from 'react';
import PropTypes from 'prop-types';

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark "${task.name}" as completed`}
      />
      <div style={{ flex: 1, textDecoration: task.completed ? 'line-through' : 'none' }}>
        <strong>{task.name}</strong>
        {task.description && <p>{task.description}</p>}
      </div>
      <button
        onClick={() => onDelete(task.id)}
        style={{ color: 'red' }}
        aria-label={`Delete task "${task.name}"`}
      >
        Delete
      </button>
    </li>
  );
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TaskItem;