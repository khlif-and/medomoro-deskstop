import React from 'react';

const ModeSelector = ({ modes, currentMode, onSwitch }) => {
    return (
        <div className="bg-white p-2 rounded-full shadow-sm border border-gray-100 mb-12 flex gap-2">
            {Object.values(modes).map((m) => (
                <button
                    key={m.id}
                    onClick={() => onSwitch(m.id)}
                    className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${currentMode === m.id
                        ? `${m.bg} ${m.color} shadow-inner`
                        : 'text-gray-500 hover:bg-gray-50'
                        }`}
                >
                    <m.icon size={16} />
                    {m.label}
                </button>
            ))}
        </div>
    );
};

export default ModeSelector;
