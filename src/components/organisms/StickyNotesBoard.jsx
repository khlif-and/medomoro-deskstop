import React from 'react';
import StickyNote from '../molecules/StickyNote';
import { Lightbulb } from 'lucide-react';

const StickyNotesBoard = ({ notes, onAddNote, onDeleteNote, onUpdateNote }) => {
    const stickyColors = [
        { name: 'yellow', bg: 'bg-yellow-200', hover: 'hover:bg-yellow-300' },
        { name: 'green', bg: 'bg-green-200', hover: 'hover:bg-green-300' },
        { name: 'blue', bg: 'bg-blue-200', hover: 'hover:bg-blue-300' },
        { name: 'rose', bg: 'bg-rose-200', hover: 'hover:bg-rose-300' },
        { name: 'purple', bg: 'bg-purple-200', hover: 'hover:bg-purple-300' },
    ];

    return (
        <div className="lg:col-span-9 bg-gray-50 rounded-3xl p-6 border border-gray-200 min-h-[320px] relative">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <Lightbulb size={20} className="text-amber-500" />
                    Sticky Notes
                </h2>
                <div className="flex gap-2 bg-white p-1 rounded-full shadow-sm border border-gray-100">
                    {stickyColors.map(color => (
                        <button
                            key={color.name}
                            onClick={() => onAddNote(color.bg)}
                            className={`w-6 h-6 rounded-full border border-gray-200 ${color.bg} ${color.hover} transition-colors`}
                            title={`Add ${color.name} note`}
                        ></button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {notes.length === 0 ? (
                    <div className="col-span-full py-12 text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                        Select a color above to add a note
                    </div>
                ) : (
                    notes.map((note) => (
                        <StickyNote
                            key={note.id}
                            note={note}
                            onDelete={onDeleteNote}
                            onUpdate={onUpdateNote}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default StickyNotesBoard;
