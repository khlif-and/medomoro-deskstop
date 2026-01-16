import React, { useMemo, useState, useEffect, useRef } from 'react';
import { User, Clock, CheckCircle } from 'lucide-react';
import { useTaskStore } from '../../store/useTaskStore';

const CalendarTimeline = () => {
    // 1. Get Real Tasks
    const { tasks } = useTaskStore();
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Get schedule for Selected Date
    const displayedTasks = useMemo(() => {
        const dateStr = selectedDate.toLocaleDateString('en-CA');
        return tasks.filter(t => t.date === dateStr).sort((a, b) => a.time.localeCompare(b.time));
    }, [tasks, selectedDate]);

    // Generate dynamic days header
    const today = new Date();
    const currentWeekMonday = new Date(today);
    const day = currentWeekMonday.getDay() || 7;
    if (day !== 1) currentWeekMonday.setHours(-24 * (day - 1));

    const weekDays = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(currentWeekMonday);
        d.setDate(currentWeekMonday.getDate() + i);

        const isSelected = d.getDate() === selectedDate.getDate() &&
            d.getMonth() === selectedDate.getMonth() &&
            d.getFullYear() === selectedDate.getFullYear();

        return {
            dateObj: d,
            day: d.toLocaleDateString('en-US', { weekday: 'short' }),
            date: d.getDate(),
            isSelected: isSelected
        };
    });

    const displayMonth = selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const hours = Array.from({ length: 24 }, (_, i) => i); // 00:00 to 23:00

    // Auto-scroll to earliest task or 8 AM (Safe Implementation)
    const containerRef = useRef(null);

    useEffect(() => {
        let targetHour = 8; // Default to 08:00 AM

        if (displayedTasks.length > 0) {
            const firstTaskTime = displayedTasks[0].time;
            const hour = parseInt(firstTaskTime.split(':')[0], 10);
            targetHour = isNaN(hour) ? 8 : hour;
        }

        const element = document.getElementById(`dash-hour-${targetHour}`);
        if (element && containerRef.current) {
            // Calculate offset relative to container to avoid scrolling the whole window
            const container = containerRef.current;
            const offsetTop = element.offsetTop;

            // Scroll container to that position
            container.scrollTo({
                top: offsetTop - 20, // 20px buffer
                behavior: 'smooth'
            });
        }
    }, [selectedDate, displayedTasks]);

    return (
        <div className="bg-amber-50 rounded-[32px] p-8 w-full h-[500px] flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">{displayMonth}</h3>
            </div>

            {/* Days Strip */}
            <div className="flex justify-between border-b border-gray-200/50 pb-4 mb-4">
                {weekDays.map((d) => (
                    <button
                        key={d.day}
                        onClick={() => setSelectedDate(d.dateObj)}
                        className={`text-center transition-all duration-200 rounded-xl px-2 py-1
                            ${d.isSelected
                                ? 'opacity-100 scale-110 bg-white shadow-sm ring-1 ring-gray-100'
                                : 'opacity-40 hover:opacity-70 hover:bg-white/50'
                            }
                        `}
                    >
                        <div className="text-xs font-medium text-gray-500 mb-1">{d.day}</div>
                        <div className={`text-lg font-semibold ${d.isSelected ? 'text-gray-900' : 'text-gray-500'}`}>{d.date}</div>
                    </button>
                ))}
            </div>

            {/* Timeline scrollable area (Full 24h Grid) */}
            <div ref={containerRef} className="space-y-6 relative flex-1 overflow-y-auto custom-scrollbar pr-2">
                <div className="absolute left-[54px] top-0 bottom-0 w-px bg-gray-200 border-l border-dashed border-gray-300 pointer-events-none"></div>

                {hours.map(hour => {
                    const timeStr = `${hour.toString().padStart(2, '0')}:00`;
                    const tasksInSlot = displayedTasks.filter(t => t.time.startsWith(hour.toString().padStart(2, '0')));

                    return (
                        <div key={hour} id={`dash-hour-${hour}`} className="flex items-start gap-6 group min-h-[40px]">
                            {/* Time Label */}
                            <span className="text-xs font-medium text-gray-400 w-10 pt-1 font-mono text-right">{timeStr}</span>

                            {/* Content */}
                            <div className="flex-1 space-y-2">
                                {/* Invisible guide line for empty slots */}
                                <div className="h-px w-full bg-transparent group-hover:bg-gray-200/50 transition-colors mt-2.5"></div>

                                {tasksInSlot.map((task) => (
                                    <div key={task.id} className={`p-3 rounded-2xl flex items-center justify-between shadow-sm transition-all -mt-4 relative z-10
                                        ${task.completed
                                            ? 'bg-white/60 text-gray-400 border border-transparent'
                                            : 'bg-white text-gray-900 border border-white hover:border-amber-200 hover:shadow-md'
                                        }
                                    `}>
                                        <div>
                                            <h4 className={`font-medium text-sm ${task.completed ? 'line-through' : ''}`}>{task.title}</h4>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-[10px] bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full border border-gray-100">
                                                    {task.project}
                                                </span>
                                                <span className="text-[10px] text-gray-400 flex items-center gap-1">
                                                    <Clock size={10} /> {task.time}
                                                </span>
                                            </div>
                                        </div>
                                        {task.completed && <CheckCircle size={16} className="text-green-500" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CalendarTimeline;
