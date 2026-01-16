import React, { useState, useMemo, useEffect } from 'react';
import { Plus, CheckCircle, Circle, Clock, Trash2 } from 'lucide-react';
import { useTaskStore } from '../../store/useTaskStore';

const CalendarDayView = ({ currentDate, tasks }) => {
    const { addTask, toggleTask, deleteTask } = useTaskStore();
    const [isAdding, setIsAdding] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskTime, setNewTaskTime] = useState('09:00');

    // Filter tasks for the selected date
    const dayTasks = useMemo(() => {
        // Use local date string for consistent comparison with task data
        const dateStr = currentDate.toLocaleDateString('en-CA');
        return tasks.filter(t => t.date === dateStr).sort((a, b) => a.time.localeCompare(b.time));
    }, [tasks, currentDate]);

    const handleAddTask = (e) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;

        addTask({
            title: newTaskTitle,
            time: newTaskTime,
            project: 'General', // Default project
            date: currentDate.toLocaleDateString('en-CA')
        });

        setNewTaskTitle('');
        setIsAdding(false);
    };

    const hours = Array.from({ length: 24 }, (_, i) => i); // 00:00 to 23:00

    // Auto-scroll to earliest task or 8 AM on mount
    useEffect(() => {
        let targetHour = 8; // Default to 08:00 AM

        if (dayTasks.length > 0) {
            const firstTaskTime = dayTasks[0].time;
            const hour = parseInt(firstTaskTime.split(':')[0], 10);
            targetHour = isNaN(hour) ? 8 : hour;
        }

        const element = document.getElementById(`hour-${targetHour}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [dayTasks]);

    return (
        <div className="flex flex-col h-full bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-900">
                        {currentDate.toLocaleDateString('en-GB', { weekday: 'long' })}
                    </h2>
                    <p className="text-gray-500">
                        {currentDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                </div>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors shadow-lg text-sm"
                >
                    <Plus size={16} />
                    <span>Add Task</span>
                </button>
            </div>

            {/* Compact Add Form */}
            {isAdding && (
                <form onSubmit={handleAddTask} className="p-4 bg-amber-50 border-b border-amber-100 flex gap-4 items-center animate-in slide-in-from-top-2">
                    <input
                        type="time"
                        value={newTaskTime}
                        onChange={(e) => setNewTaskTime(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                    <input
                        type="text"
                        placeholder="What needs to be done?"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        autoFocus
                        className="flex-1 px-3 py-2 rounded-lg border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                    <button type="submit" className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 font-medium">
                        Save
                    </button>
                </form>
            )}

            {/* Timeline Scroll Area */}
            <div className="flex-1 overflow-y-auto p-6 relative custom-scrollbar">
                {/* Time Grid */}
                <div className="absolute left-16 top-6 bottom-6 w-px bg-gray-100 h-full pointer-events-none"></div>

                <div className="space-y-6 pb-20">
                    {hours.map(hour => {
                        const timeStr = `${hour.toString().padStart(2, '0')}:00`;
                        const tasksInSlot = dayTasks.filter(t => t.time.startsWith(hour.toString().padStart(2, '0')));

                        return (
                            <div key={hour} id={`hour-${hour}`} className="flex gap-6 group min-h-[60px]">
                                {/* Time Label */}
                                <div className="w-12 text-xs font-semibold text-gray-400 text-right pt-2 font-mono">
                                    {timeStr}
                                </div>

                                {/* Content Area */}
                                <div className="flex-1 space-y-2 pt-1">
                                    {/* Horizontal Guide Line */}
                                    <div className="border-t border-gray-100 w-full absolute left-16 right-0 group-hover:border-gray-200 transition-colors"></div>

                                    {/* Tasks */}
                                    {tasksInSlot.map(task => (
                                        <div
                                            key={task.id}
                                            className={`
                                                relative z-10 p-3 rounded-xl border transition-all flex items-center gap-3
                                                ${task.completed
                                                    ? 'bg-gray-50 border-gray-100 opacity-60'
                                                    : 'bg-white border-gray-200 shadow-sm hover:shadow-md hover:border-amber-200'
                                                }
                                            `}
                                        >
                                            <button
                                                onClick={() => toggleTask(task.id)}
                                                className={task.completed ? 'text-green-500' : 'text-gray-300 hover:text-amber-500'}
                                            >
                                                {task.completed ? <CheckCircle size={20} /> : <Circle size={20} />}
                                            </button>

                                            <div className="flex-1">
                                                <h4 className={`text-sm font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                                                    {task.title}
                                                </h4>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <Clock size={12} className="text-gray-400" />
                                                    <span className="text-xs text-gray-500">{task.time}</span>
                                                    <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                                        {task.project}
                                                    </span>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => deleteTask(task.id)}
                                                className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-red-50 rounded-lg"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CalendarDayView;
