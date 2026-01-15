import React from 'react';

const SessionIndicator = ({ sessionsCompleted }) => {
    return (
        <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm mb-4">Sessions Completed: {sessionsCompleted % 3}/3</p>
            <div className="flex justify-center gap-2 mb-4">
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className={`w-3 h-3 rounded-full transition-colors ${(sessionsCompleted % 3) > i
                            ? 'bg-rose-500'
                            : 'bg-gray-200'
                            }`}
                    ></div>
                ))}
            </div>
            <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-2xl border border-gray-200 shadow-sm text-gray-700">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <span className="font-medium">Focusing on Work</span>
            </div>
        </div>
    );
};

export default SessionIndicator;
