import React from 'react';
import { useTasks } from './hooks/useTasks';
import TaskForm from './components/TaskForm';

function App() {
  const { tasks, addTask } = useTasks();  // Get data/actions from hook.

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Task Tracker</h1>
      <TaskForm onAdd={addTask} />  
      <ul>  
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name} {task.description && ` - ${task.description}`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;