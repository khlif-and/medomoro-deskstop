import React from 'react';
import { usePomodoroStore } from '../../store/usePomodoroStore';
import { Play, Pause, Maximize2, RefreshCcw } from 'lucide-react';

const MiniTimerTemplate = ({ onExpand }) => {
    const { timeLeft, isActive, toggleTimer, resetTimer, mode } = usePomodoroStore();

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const modeColors = {
        pomodoro: 'text-rose-500',
        shortBreak: 'text-teal-500',
        longBreak: 'text-blue-500'
    };

    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div
            className="w-full h-screen bg-white flex flex-col items-start justify-center relative overflow-hidden ring-1 ring-gray-200 pt-10 pl-20 pb-6"
            style={{ WebkitAppRegion: 'drag' }}
        >
            {/* Draggable Header Area - Removed explicit div, using whole container */}

            {/* Time Display */}
            <div className={`text-6xl font-bold tabular-nums tracking-tight ${modeColors[mode] || 'text-gray-800'}`}>
                {formatTime(timeLeft)}
            </div>

            <div className="text-xs font-medium text-gray-400 uppercase tracking-widest mt-2 mb-6 opacity-80 pl-1 ml-9">
                {mode.replace(/([A-Z])/g, ' $1').trim()}
            </div>

            {/* Controls - Must be no-drag to be clickable */}
            <div className="flex items-center gap-5 z-10 ml-5" style={{ WebkitAppRegion: 'no-drag' }}>
                <button
                    onClick={toggleTimer}
                    className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                >
                    {isActive ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                </button>

                <button
                    onClick={onExpand}
                    className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors group"
                    title="Expand"
                >
                    <Maximize2 size={24} className="group-hover:scale-110 transition-transform" />
                </button>
            </div>
        </div>
    );
};

export default MiniTimerTemplate;
