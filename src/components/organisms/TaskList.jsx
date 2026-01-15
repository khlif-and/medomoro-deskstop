import React from 'react';
import { Monitor, Zap, MessageSquare, Briefcase, Link, CheckCircle2, Circle, Calendar } from 'lucide-react';
import { useTaskStore } from '../../store/useTaskStore';

const TaskList = () => {
    const { tasks, toggleTask } = useTaskStore();

    // Calculate Progress
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const progressPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    // Get incomplete tasks for "Onboarding Task" list (or just all tasks)
    // Let's show a mix, sorted by time maybe? For now just slice same as before.
    const displayTasks = tasks.slice(0, 5);

    // Helper to pick icon based on project/title (optional dynamic logic)
    // For now simple default or random for variety if not stored
    const getIcon = (index) => {
        const icons = [Monitor, Zap, MessageSquare, Briefcase, Link];
        return icons[index % icons.length];
    };

    return (
        <div className="flex flex-col gap-6 w-full h-full">
            {/* Onboarding Widget */}
            <div className="w-full bg-amber-50 rounded-[32px] p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-medium text-gray-900">Task Completion</h3>
                    <span className="text-3xl font-light text-gray-900">{progressPercentage}%</span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-gray-900 w-[30%]">On Track</span>
                    <span className="text-xs font-medium text-gray-500 w-[25%]">Pending</span>
                </div>

                <div className="flex h-12 w-full rounded-2xl overflow-hidden gap-1">
                    <div
                        className="bg-amber-300 flex items-center justify-center text-xs font-bold text-gray-900 transition-all duration-500"
                        style={{ width: `${progressPercentage}%`, minWidth: progressPercentage > 0 ? '10%' : '0' }}
                    >
                        {progressPercentage > 20 ? 'Done' : ''}
                    </div>
                    <div className="flex-1 bg-gray-900 rounded-lg"></div>
                </div>
            </div>

            {/* Task List Interface */}
            <div className="flex-1 bg-gray-900 rounded-[32px] p-6 text-white min-h-[400px] relative overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-medium">Your Tasks</h3>
                    <span className="text-3xl font-light">{completedTasks}/{totalTasks}</span>
                </div>

                {/* Tasks */}
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4 pb-6">
                    {displayTasks.length === 0 ? (
                        <div className="text-gray-500 text-center py-10 flex flex-col items-center">
                            <Calendar size={32} className="mb-2 opacity-50" />
                            <p className="text-sm">No tasks yet.</p>
                        </div>
                    ) : (
                        displayTasks.map((task, index) => {
                            const Icon = getIcon(index);
                            return (
                                <div key={task.id} className="flex items-center gap-4 group hover:bg-white/5 p-2 rounded-xl transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 group-hover:bg-amber-300 group-hover:text-gray-900 transition-colors flex-shrink-0">
                                        <Icon size={18} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className={`text-sm font-medium truncate ${task.completed ? 'text-gray-500 line-through decoration-gray-600' : 'text-white'}`}>
                                            {task.title}
                                        </h4>
                                        <p className="text-xs text-gray-500">{task.time} • {task.project || 'General'}</p>
                                    </div>
                                    <button
                                        onClick={() => toggleTask(task.id)}
                                        className="text-gray-600 hover:text-amber-300 transition-colors flex-shrink-0"
                                    >
                                        {task.completed ? <CheckCircle2 size={20} className="text-amber-300" /> : <Circle size={20} />}
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskList;
