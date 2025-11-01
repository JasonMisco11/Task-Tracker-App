// src/hooks/useTasks.js
import { useState } from 'react';
const STORAGE_KEY = 'task-tracker-tasks';

export function useTasks() {
    const [tasks, setTasks] = useState(() => {
        // Initialize state AND load from localStorage in one go
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            try {
                return JSON.parse(raw);
            } catch (e) {
                console.error('Failed to parse tasks', e);
            }
        }
        return [];
    });

    // Single source of truth: update state AND save to localStorage
    const updateTasks = (updater) => {
        setTasks((prev) => {
            const next = typeof updater === 'function' ? updater(prev) : updater;
            // Save side effect — happens immediately after state update
            localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
            console.log('Tasks saved:', next); // Learning
            return next;
        });
    };

    const addTask = (name, description = '') => {
        const newTask = {
            id: crypto.randomUUID(),
            name: name.trim(),
            description: description.trim(),
            completed: false,
            createdAt: new Date().toISOString(),
        };
        updateTasks((prev) => [...prev, newTask]);
    };

    const toggleTask = (id) => {
        updateTasks((prev) =>
            prev.map((t) => (t.id === id ? {...t, completed: !t.completed } : t))
        );
    };

    const deleteTask = (id) => {
        updateTasks((prev) => prev.filter((t) => t.id !== id));
    };

    return { tasks, addTask, toggleTask, deleteTask };
}