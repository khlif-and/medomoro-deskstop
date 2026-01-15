import React from 'react';

const MoodButton = ({ mood, isSelected, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-200 ${isSelected
                    ? `${mood.bg} ring-2 ring-offset-1 ring-${mood.color.split('-')[1]}-400`
                    : 'hover:bg-gray-50 border border-transparent'
                }`}
        >
            <mood.icon className={`${mood.color} mb-2`} size={24} />
            <span className="text-xs font-medium text-gray-600">{mood.label}</span>
        </button>
    );
};

export default MoodButton;
