import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePomodoroStore } from '../../store/usePomodoroStore';

const CalendarMonthView = ({ currentDate, tasks, onDateClick, onMonthChange }) => {
    const { dailyHistory } = usePomodoroStore();

    // Helper to get days in month
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    // Helper to get first day offset
    const getFirstDayOfMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month, 1).getDay(); // 0 = Sunday
    };

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);

    const blanks = Array.from({ length: firstDay }, (_, i) => i);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const getDayKey = (day) => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const date = new Date(year, month, day);
        return date.toLocaleDateString('en-CA');
    };

    const getTasksForDay = (day) => {
        const key = getDayKey(day);
        return tasks.filter(t => t.date === key);
    };

    const getDayStatusStyle = (day) => {
        const dateKey = getDayKey(day);
        const dayDate = new Date(dateKey); // Local midnight
        const todayStr = new Date().toLocaleDateString('en-CA');
        const todayDate = new Date(todayStr);

        // Reset hours for comparison
        dayDate.setHours(0, 0, 0, 0);
        todayDate.setHours(0, 0, 0, 0);

        if (dateKey === todayStr) {
            return 'bg-yellow-100 border-yellow-300 hover:border-yellow-400 text-yellow-900'; // Today = Yellow
        }

        if (dayDate < todayDate) {
            // Past
            const activity = dailyHistory[dateKey] || 0;
            if (activity > 0) {
                return 'bg-green-100 border-green-300 hover:border-green-400 text-green-900'; // Streak (Active) = Green
            } else {
                return 'bg-red-50 border-red-200 hover:border-red-300 text-red-900'; // Missed = Red
            }
        }

        // Future
        return 'bg-white border-gray-100 hover:border-amber-300 hover:shadow-md text-gray-700';
    };

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                <div className="flex gap-2">
                    <button onClick={() => onMonthChange(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ChevronLeft size={20} />
                    </button>
                    <button onClick={() => onMonthChange(1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-sm font-semibold text-gray-400 uppercase tracking-wider">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 grid-rows-6 gap-2 flex-1">
                {/* Empty slots for previous month */}
                {blanks.map(blank => (
                    <div key={`blank-${blank}`} className="p-2"></div>
                ))}

                {/* Days */}
                {days.map(day => {
                    const dayTasks = getTasksForDay(day);
                    const completedCount = dayTasks.filter(t => t.completed).length;
                    const totalCount = dayTasks.length;
                    const statusClass = getDayStatusStyle(day);

                    return (
                        <div
                            key={day}
                            onClick={() => onDateClick(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                            className={`
                                relative p-2 rounded-2xl border transition-all cursor-pointer min-h-[80px] group
                                flex flex-col items-start justify-between
                                ${statusClass}
                            `}
                        >
                            <span className="text-sm font-bold opacity-80">
                                {day}
                            </span>

                            {/* Task Indicators */}
                            <div className="flex gap-1 flex-wrap w-full mt-1">
                                {dayTasks.slice(0, 4).map((task, i) => (
                                    <div
                                        key={i}
                                        className={`h-1.5 w-1.5 rounded-full ${task.completed
                                                ? 'bg-gray-800' // Dark dots for contrast
                                                : 'bg-gray-300'
                                            }`}
                                    />
                                ))}
                                {dayTasks.length > 4 && (
                                    <span className="text-[8px] opacity-60">+</span>
                                )}
                            </div>

                            {/* Summary Text (Visible on Hover) */}
                            {totalCount > 0 && (
                                <div className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                                    {completedCount}/{totalCount} done
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CalendarMonthView;
