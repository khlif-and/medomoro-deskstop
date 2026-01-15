import React from 'react';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';

const TimerControls = ({ isActive, onToggle, onReset, onSettings }) => {
    return (
        <div className="flex items-center gap-6 mb-8">
            <button
                onClick={onReset}
                className="p-4 rounded-full bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors shadow-sm border border-gray-100"
            >
                <RotateCcw size={24} />
            </button>

            <button
                onClick={onToggle}
                className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-105 transition-all duration-300 ${isActive ? 'bg-amber-400' : 'bg-gray-900'}`}
            >
                {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
            </button>

            <button
                onClick={onSettings}
                className="p-4 rounded-full bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors shadow-sm border border-gray-100"
            >
                <Settings size={24} />
            </button>
        </div>
    );
};

export default TimerControls;
