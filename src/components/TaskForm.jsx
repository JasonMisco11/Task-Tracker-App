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
      <button className=' py-2 px-4 rounded-md border-none transition-all duration-500 hover:shadow-[0_0_15px_rgba(255,255,255,1.5)] cursor-pointer' type="submit">Add Task</button>  
    </form>
  );
}


export default TaskForm;
