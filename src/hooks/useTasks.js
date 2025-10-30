import { useState, useEffect } from 'react';

const STORAGE_KEY = 'task-tracker-tasks';

export function useTasks() {
    const [tasks, setTasks] = useState([]);

    // Load from localStorage on mount
    useEffect(() => {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            try {
                setTasks(JSON.parse(raw));
            } catch (e) {
                console.error('Failed to parse tasks', e);
            }
        }
    }, []);

    // Save whenever tasks change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        console.log('Tasks saved:', tasks); // Learning: see state changes
    }, [tasks]);

    const addTask = (name, description = '') => {
        const newTask = {
            id: crypto.randomUUID(),
            name: name.trim(),
            description: description.trim(),
            completed: false,
            createdAt: new Date().toISOString(),
        };
        setTasks((prev) => [...prev, newTask]);
    };

    const toggleTask = (id) => {
        setTasks((prev) =>
            prev.map((t) => (t.id === id ? {...t, completed: !t.completed } : t))
        );
    };

    const deleteTask = (id) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
    };

    return { tasks, addTask, toggleTask, deleteTask };
}