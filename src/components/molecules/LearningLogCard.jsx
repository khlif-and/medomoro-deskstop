import React from 'react';
import { Settings, Calendar as CalendarIcon, Trash2, PenTool } from 'lucide-react';

const LearningLogCard = ({ log, onDelete, onEdit }) => {
    return (
        <div
            onClick={() => onEdit(log)}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group cursor-pointer mb-4"
        >
            <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded-md uppercase tracking-wide">
                    {log.topic || 'General'}
                </span>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(log.id); }}
                        className="text-gray-300 hover:text-red-500 p-1"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight">
                {log.title || 'Untitled Log'}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line line-clamp-2 mb-4">
                {log.content}
            </p>

            <div className="flex items-center text-xs text-gray-400 gap-4 border-t border-gray-50 pt-3">
                <span className="flex items-center gap-1">
                    <CalendarIcon size={12} /> {log.date}
                </span>
            </div>
        </div>
    );
};

export default LearningLogCard;
