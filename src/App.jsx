import React from 'react';
import { useTasks } from './hooks/useTasks';

function App() {
  const { tasks, addTask } = useTasks();

  // Debug: show tasks in UI (temporary)
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>Task Tracker</h1>
      <p>Open DevTools → Console to see logs</p>

      <h2>Tasks ({tasks.length})</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name} {task.completed ? '✓' : '○'}
          </li>
        ))}
      </ul>

      {/* Test: Add a task on load */}
      <button onClick={() => addTask('Test Task ' + Date.now())}>
        Add Test Task
      </button>
    </div>
  );
}

export default App;