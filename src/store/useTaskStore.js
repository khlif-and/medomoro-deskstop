import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useTaskStore = create(
    persist(
        (set) => ({
            tasks: [],

            addTask: (task) => set((state) => ({
                tasks: [...state.tasks, {
                    ...task,
                    id: Date.now(),
                    completed: false,
                    date: task.date || new Date().toLocaleDateString('en-CA') // Default to YYYY-MM-DD (Local)
                }]
            })),

            deleteTask: (id) => set((state) => ({
                tasks: state.tasks.filter((t) => t.id !== id)
            })),

            toggleTask: (id) => set((state) => ({
                tasks: state.tasks.map((t) =>
                    t.id === id ? { ...t, completed: !t.completed } : t
                )
            })),

            editTask: (id, updatedData) => set((state) => ({
                tasks: state.tasks.map((t) =>
                    t.id === id ? { ...t, ...updatedData } : t
                )
            })),
        }),
        {
            name: 'pomodoro-tasks',
            storage: createJSONStorage(() => localStorage),
            version: 1, // Bump version to flush old dummy data
            migrate: (persistedState, version) => {
                if (version === 0) {
                    // Start fresh if coming from version 0 (or undefined)
                    return { tasks: [] };
                }
                return persistedState;
            },
        }
    )
);
