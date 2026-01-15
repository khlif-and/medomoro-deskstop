import React from 'react';
import { X } from 'lucide-react';

const StickyNote = ({ note, onDelete, onUpdate }) => {
    return (
        <div className={`${note.color} p-4 rounded-xl shadow-sm transition-all duration-200 relative group animate-in zoom-in`}>
            <button
                onClick={() => onDelete(note.id)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-500 transition-opacity bg-white/50 rounded-full p-1"
            >
                <X size={14} />
            </button>
            <textarea
                className="w-full h-32 bg-transparent border-none resize-none focus:ring-0 outline-none text-gray-800 placeholder-gray-500/50 text-sm leading-relaxed custom-textarea-no-scrollbar font-medium"
                placeholder="Write something..."
                value={note.content}
                onChange={(e) => onUpdate(note.id, e.target.value)}
            />
        </div>
    );
};

export default StickyNote;
