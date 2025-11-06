import React, { useState } from 'react';  
import PropTypes from 'prop-types';
function TaskForm({ onAdd }) { 
  const [name, setName] = useState('');  
  const [description, setDescription] = useState(''); 

  const handleSubmit = (e) => {  
    e.preventDefault();  
    if (!name.trim()) {  
      alert('Task name is required!');  
      return;  
    }
    onAdd(name.trim(), description.trim()); 
    setName('');  
    setDescription('');  
  };

  return (  
    <form onSubmit={handleSubmit}>  
      <div> 
        <label htmlFor="task-name">Task Name:</label> 
        <input
          id="task-name"  
          type="text"  
          placeholder="Enter task name"  
          value={name}  
          onChange={(e) => setName(e.target.value)}  
        />
      </div>
      <div>  
        <label htmlFor="task-desc">Description (optional):</label>  
        <textarea
          id="task-desc" 
          placeholder="Enter description" 
          value={description}  
          onChange={(e) => setDescription(e.target.value)}  
          rows={3}
        />
      </div>
      <button type="submit">Add Task</button>  
    </form>
  );
}
TaskForm.propTypes = {
  onAdd: PropTypes.func.isRequired,  // 'onAdd' is a function and required
};

export default TaskForm;
