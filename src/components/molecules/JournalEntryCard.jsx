import React from 'react';
import { Trash2, Calendar as CalendarIcon, MoreHorizontal, PenTool } from 'lucide-react';

const JournalEntryCard = ({ entry, onDelete, onEdit }) => {
    return (
        <div
            onClick={() => onEdit(entry)}
            className="break-inside-avoid bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group relative mb-6 cursor-pointer"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md font-medium uppercase tracking-wide">
                        {entry.time}
                    </span>
                    {entry.mood && (
                        <span className={`text-xs px-2 py-1 rounded-md font-medium uppercase tracking-wide bg-blue-50 text-blue-600`}>
                            {entry.mood}
                        </span>
                    )}
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(entry.id); }}
                        className="text-gray-300 hover:text-red-500 p-1"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight">
                {entry.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line mb-4 break-words line-clamp-4 overflow-hidden text-ellipsis display-webkit-box box-orient-vertical">
                {entry.content}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                    <CalendarIcon size={12} /> {entry.date}
                </span>
                <button className="text-gray-300 hover:text-gray-600">
                    <MoreHorizontal size={18} />
                </button>
            </div>
        </div>
    );
};

export default JournalEntryCard;
