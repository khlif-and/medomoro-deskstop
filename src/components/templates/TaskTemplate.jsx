import React, { useState, useEffect } from 'react';
import { Plus, Calendar, Trash2, Edit2, CheckCircle, Circle, Clock } from 'lucide-react';
import { useTaskStore } from '../../store/useTaskStore';

const TaskTemplate = () => {
    // 1. Realtime Date Logic
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentDate(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formattedDate = new Intl.DateTimeFormat('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(currentDate);

    // 2. Global Task State
    const { tasks, addTask, editTask, deleteTask, toggleTask } = useTaskStore();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null); // For editing
    const [formData, setFormData] = useState({ project: '', title: '', time: '' });

    // Handlers
    const openModal = (task = null) => {
        if (task) {
            setCurrentTask(task);
            setFormData({ project: task.project, title: task.title, time: task.time });
        } else {
            setCurrentTask(null);
            setFormData({ project: '', title: '', time: '' });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentTask) {
            editTask(currentTask.id, formData);
        } else {
            addTask(formData);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="w-full h-full p-4 pt-28 max-w-5xl mx-auto">
            {/* Header Section */}
            <div className="flex items-end justify-between mb-8">
                <div>
                    <h2 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Today's Schedule</h2>
                    <h1 className="text-4xl font-light text-gray-900">{formattedDate}</h1>
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors shadow-lg"
                >
                    <Plus size={20} />
                    <span className="font-medium">Add New Task</span>
                </button>
            </div>

            {/* Task List */}
            <div className="space-y-4">
                {tasks.length === 0 ? (
                    <div className="text-center py-20 text-gray-400">
                        <Calendar size={48} className="mx-auto mb-4 opacity-30" />
                        <p>No tasks for today. Enjoy your day!</p>
                    </div>
                ) : (
                    tasks.map((task) => (
                        <div key={task.id} className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all flex items-center gap-6">
                            {/* Time */}
                            <div className="flex flex-col items-center min-w-[80px]">
                                <span className="text-lg font-bold text-gray-800">{task.time}</span>
                                <div className="h-8 w-px bg-gray-200 my-1 group-last:hidden"></div>
                            </div>

                            {/* Status Icon */}
                            <button onClick={() => toggleTask(task.id)} className={`flex-shrink-0 transition-colors ${task.completed ? 'text-green-500' : 'text-gray-300 hover:text-gray-400'}`}>
                                {task.completed ? <CheckCircle size={24} weight="fill" /> : <Circle size={24} />}
                            </button>

                            {/* Content */}
                            <div className={`flex-1 ${task.completed ? 'opacity-50 line-through' : ''}`}>
                                <h3 className="text-xl font-medium text-gray-900">{task.title}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full font-medium">
                                        {task.project}
                                    </span>
                                </div>
                            </div>

                            {/* Actions (Visible on Hover) */}
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => openModal(task)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                                    <Edit2 size={18} />
                                </button>
                                <button onClick={() => deleteTask(task.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Simple Modal Form */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-900">{currentTask ? 'Edit Task' : 'New Task'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-0 outline-none transition-all"
                                    placeholder="e.g. Website Redesign"
                                    value={formData.project}
                                    onChange={e => setFormData({ ...formData, project: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-0 outline-none transition-all"
                                    placeholder="What needs to be done?"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                                <div className="relative">
                                    <Clock className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                    <input
                                        type="time"
                                        required
                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-0 outline-none transition-all"
                                        value={formData.time}
                                        onChange={e => setFormData({ ...formData, time: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 mt-8 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-6 py-3 rounded-xl bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
                                >
                                    {currentTask ? 'Save Changes' : 'Create Task'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskTemplate;
