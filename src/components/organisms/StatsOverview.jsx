import React from 'react';
import { usePomodoroStore } from '../../store/usePomodoroStore';

const StatsOverview = () => {
    const { streak, totalActivityTime, totalShortBreakTime, totalLongBreakTime } = usePomodoroStore();

    const totalTime = totalActivityTime + totalShortBreakTime + totalLongBreakTime;
    const focusPct = totalTime > 0 ? Math.round((totalActivityTime / totalTime) * 100) : 0;
    const shortBreakPct = totalTime > 0 ? Math.round((totalShortBreakTime / totalTime) * 100) : 0;
    const longBreakPct = totalTime > 0 ? Math.round((totalLongBreakTime / totalTime) * 100) : 0;

    return (
        <div className="flex gap-4 mb-2">
            {totalTime === 0 ? (
                <div className="bg-gray-100 flex-1 py-2.5 rounded-full text-center text-sm text-gray-400">
                    Start a timer to see stats
                </div>
            ) : (
                <>
                    {focusPct > 0 && (
                        <div
                            title={`Focus Time: ${totalActivityTime} mins`}
                            className="bg-gray-900 text-white rounded-full flex items-center justify-center gap-2 text-sm font-medium transition-all duration-500 cursor-help"
                            style={{ width: `${focusPct}%`, minWidth: '60px', padding: '10px 0' }}
                        >
                            {focusPct}%
                        </div>
                    )}

                    {shortBreakPct > 0 && (
                        <div
                            title={`Short Break: ${totalShortBreakTime} mins`}
                            className="bg-amber-300 text-gray-900 rounded-full flex items-center justify-center gap-2 text-sm font-medium transition-all duration-500 cursor-help"
                            style={{ width: `${shortBreakPct}%`, minWidth: '60px', padding: '10px 0' }}
                        >
                            {shortBreakPct}%
                        </div>
                    )}

                    {longBreakPct > 0 && (
                        <div
                            title={`Long Break: ${totalLongBreakTime} mins`}
                            className="bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-500 cursor-help"
                            style={{ width: `${longBreakPct}%`, minWidth: '60px', height: '42px' }}
                        >
                            <div className="absolute inset-0 opacity-20"
                                style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '10px 10px' }}>
                            </div>
                            <span className="relative z-10 text-sm font-medium text-gray-600">{longBreakPct}%</span>
                        </div>
                    )}
                </>
            )}

            <div className="flex gap-8 ml-auto items-center">
                <div className="text-center">
                    <div className="text-3xl font-light font-sans text-gray-900">{new Date().getDate()}</div>
                    <div className="text-xs text-gray-500 font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'short' })}</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-light font-sans text-gray-900">{new Date().toLocaleDateString('en-US', { month: 'short' })}</div>
                    <div className="text-xs text-gray-500 font-medium">{new Date().getFullYear()}</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-light font-sans text-gray-900">{streak || 0}</div>
                    <div className="text-xs text-gray-500 font-medium">Streak Ways</div>
                </div>
            </div>
        </div>
    );
};

export default StatsOverview;
