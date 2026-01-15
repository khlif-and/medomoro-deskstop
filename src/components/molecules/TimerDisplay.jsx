import React from 'react';

const TimerDisplay = ({ timeLeft, isActive, progress, mode, modeColor }) => {
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Circular Progress Calculation
    const radius = 120;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative mb-8 group">
            {/* SVG Ring */}
            <svg className="transform -rotate-90 w-80 h-80 drop-shadow-xl">
                <circle
                    cx="160"
                    cy="160"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    className="text-gray-100"
                />
                <circle
                    cx="160"
                    cy="160"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className={`transition-all duration-1000 ease-linear ${modeColor}`}
                />
            </svg>

            {/* Center Content */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className={`text-7xl font-light tracking-tighter tabular-nums text-gray-800 transition-colors duration-300`}>
                    {formatTime(timeLeft)}
                </div>
                <div className="text-gray-400 font-medium uppercase tracking-widest text-sm mt-2">
                    {isActive ? 'Running' : 'Paused'}
                </div>
            </div>
        </div>
    );
};

export default TimerDisplay;
