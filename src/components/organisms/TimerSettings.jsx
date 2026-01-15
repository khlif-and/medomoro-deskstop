import React, { useState } from 'react';

const TimerSettings = ({ isOpen, onClose, durations, onSave }) => {
    const [tempDurations, setTempDurations] = useState(durations);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(tempDurations);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl animate-in fade-in zoom-in duration-200">
                <h2 className="text-xl font-semibold mb-6 text-gray-900">Timer Settings</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Focus Duration (min)</label>
                        <input
                            type="number"
                            min="1"
                            max="120"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-0 outline-none transition-all"
                            value={tempDurations.pomodoro}
                            onChange={e => setTempDurations({ ...tempDurations, pomodoro: parseInt(e.target.value) || 0 })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Short Break (min)</label>
                        <input
                            type="number"
                            min="1"
                            max="60"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-0 outline-none transition-all"
                            value={tempDurations.shortBreak}
                            onChange={e => setTempDurations({ ...tempDurations, shortBreak: parseInt(e.target.value) || 0 })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Long Break (min)</label>
                        <input
                            type="number"
                            min="1"
                            max="60"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-0 outline-none transition-all"
                            value={tempDurations.longBreak}
                            onChange={e => setTempDurations({ ...tempDurations, longBreak: parseInt(e.target.value) || 0 })}
                        />
                    </div>

                    <div className="flex gap-3 mt-8 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 rounded-xl bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TimerSettings;
