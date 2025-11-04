// src/components/TaskForm.jsx
import React, { useState } from 'react';

function TaskForm({ onAdd }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const validateForm = () => {
    const trimmedName = name.trim();
    
    if (!trimmedName) {
      setError('Task name is required');
      return false;
    }
    
    if (trimmedName.length > 100) {
      setError('Task name must be less than 100 characters');
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();
    
    onAdd(trimmedName, trimmedDescription);
    
    // Reset form
    setName('');
    setDescription('');
    setError('');
  };

  const isSubmitDisabled = !name.trim();

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4" noValidate>
      {/* Task Name Field */}
      <div>
        <label 
          htmlFor="task-name" 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Task Name: <span className="text-red-600">*</span>
        </label>
        <input
          id="task-name"
          type="text"
          placeholder="Enter task name"
          value={name}
          onChange={handleNameChange}
          className={`w-full px-3 py-2 border rounded-lg shadow-sm transition-colors
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            ${error 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-300'
            }`}
          aria-required="true"
          aria-invalid={!!error}
          aria-describedby={error ? 'task-name-error' : undefined}
          maxLength={100}
        />
        {error && (
          <p 
            id="task-name-error" 
            className="mt-1 text-sm text-red-600 flex items-center gap-1"
            role="alert"
          >
            <svg 
              className="w-4 h-4" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
                clipRule="evenodd" 
              />
            </svg>
            {error}
          </p>
        )}
      </div>

      {/* Description Field */}
      <div>
        <label 
          htmlFor="task-desc" 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description <span className="text-gray-500 text-xs">(optional)</span>
        </label>
        <textarea
          id="task-desc"
          placeholder="Enter description"
          value={description}
          onChange={handleDescriptionChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
            resize-y min-h-[80px] transition-colors
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          maxLength={500}
        />
        <p className="mt-1 text-xs text-gray-500 text-right">
          {description.length}/500
        </p>
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        disabled={isSubmitDisabled}
        className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-medium 
          rounded-lg shadow-sm transition-all duration-200
          hover:bg-blue-700 hover:shadow-md
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:shadow-sm
          active:scale-95"
        aria-label="Add new task"
      >
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;