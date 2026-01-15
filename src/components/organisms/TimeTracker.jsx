import React, { useEffect } from 'react';
import { ArrowUpRight, Play, Pause, Clock, Brain, Coffee, Battery } from 'lucide-react';
import { usePomodoroStore } from '../../store/usePomodoroStore';
import { useNavigate } from 'react-router-dom';

const TimeTracker = () => {
    const navigate = useNavigate();
    const { timeLeft, isActive, progress, mode, toggleTimer, syncTime, tick } = usePomodoroStore();

    // Icon mapping
    const icons = {
        pomodoro: Brain,
        shortBreak: Coffee,
        longBreak: Battery
    };
    const CurrentIcon = icons[mode] || Brain;
    const modeLabel = {
        pomodoro: 'Focus Time',
        shortBreak: 'Short Break',
        longBreak: 'Long Break'
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Sync time on mount
    useEffect(() => {
        syncTime();
    }, []);

    // Also run tick here if dashboard is active to ensure UI updates smoothly
    // The store tick handles logic safely even if called from multiple places (state updates batching usually handles this, 
    // but better to have one "Driver". Ideally, App.jsx or a layout should drive the tick globally).
    // For now, to ensure Dashboard updates even if PomodoroWidget is NOT mounted:
    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                tick();
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive, tick]);

    // Circular Progress Props
    const radius = 80;
    const circumference = 2 * Math.PI * radius; // ~502
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    // Colors
    const colors = {
        pomodoro: '#F43F5E', // rose-500
        shortBreak: '#14B8A6', // teal-500
        longBreak: '#3B82F6'  // blue-500
    };

    return (
        <div className="bg-white rounded-[32px] p-6 shadow-sm h-[320px] flex flex-col relative w-full group">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-medium text-gray-900">Time tracker</h3>
                <button
                    onClick={() => navigate('/pomodoro')}
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                >
                    <ArrowUpRight size={16} />
                </button>
            </div>

            <div className="flex-1 flex items-center justify-center relative">
                {/* Circular Progress */}
                <div className="relative w-48 h-48 flex items-center justify-center">
                    {/* Background Circle */}
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="96"
                            cy="96"
                            r={radius}
                            stroke="#F3F4F6"
                            strokeWidth="8"
                            fill="transparent"
                        />
                        {/* Dashed ticks circle (Optional decoration) */}
                        <circle
                            cx="96"
                            cy="96"
                            r="65"
                            stroke="#E5E7EB"
                            strokeWidth="2"
                            fill="transparent"
                            strokeDasharray="4 6"
                        />
                        {/* Progress Circle */}
                        <circle
                            cx="96"
                            cy="96"
                            r={radius}
                            stroke={colors[mode]}
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            className="transition-all duration-1000 ease-linear"
                        />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-light text-gray-900 tabular-nums tracking-tighter">
                            {formatTime(timeLeft)}
                        </span>
                        <div className="flex items-center gap-1.5 mt-1 text-gray-400">
                            <CurrentIcon size={14} />
                            <span className="text-sm font-medium">{modeLabel[mode]}</span>
                        </div>
                    </div>
                </div>

                {/* Floating Play Button */}
                <div className="absolute bottom-4 left-4 flex gap-2">
                    <button
                        onClick={toggleTimer}
                        className={`w-10 h-10 rounded-full border shadow-sm flex items-center justify-center transition-all ${isActive
                            ? 'bg-amber-100 border-amber-200 text-amber-600 hover:bg-amber-200'
                            : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50'}`}
                    >
                        {isActive ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
                    </button>
                </div>

                {/* Floating Timer Badge (Link to full page) */}
                <div className="absolute bottom-4 right-4">
                    <button
                        onClick={() => navigate('/pomodoro')}
                        className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 shadow-sm flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
                    >
                        <Clock size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TimeTracker;
