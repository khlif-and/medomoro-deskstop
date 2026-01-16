import React, { useState, useEffect } from 'react';
import { PenTool, Plus } from 'lucide-react';

// Organisms
import MoodTracker from '../organisms/MoodTracker';
import StickyNotesBoard from '../organisms/StickyNotesBoard';
import JournalList from '../organisms/JournalList';
import JournalEntryModal from '../organisms/JournalEntryModal';

const JournalTemplate = () => {
    // --- State: Mood ---
    const [selectedMood, setSelectedMood] = useState(() => {
        return localStorage.getItem('journal-mood') || null;
    });

    // --- State: Sticky Notes ---
    const [stickyNotes, setStickyNotes] = useState(() => {
        const saved = localStorage.getItem('journal-stickies');
        return saved ? JSON.parse(saved) : [];
    });

    // --- State: Entries ---
    const [entries, setEntries] = useState(() => {
        const saved = localStorage.getItem('journal-entries');
        return saved ? JSON.parse(saved) : [];
    });

    const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);

    const [editingEntry, setEditingEntry] = useState(null);

    // --- Persistence ---
    useEffect(() => {
        localStorage.setItem('journal-mood', selectedMood || '');
    }, [selectedMood]);

    useEffect(() => {
        localStorage.setItem('journal-stickies', JSON.stringify(stickyNotes));
    }, [stickyNotes]);

    useEffect(() => {
        localStorage.setItem('journal-entries', JSON.stringify(entries));
    }, [entries]);

    // --- Handlers: Entries ---
    const handleSaveEntry = ({ title, content, mood }) => {
        if (editingEntry) {
            // Edit existing
            setEntries(entries.map(e => e.id === editingEntry.id ? { ...e, title, content, mood } : e));
            setEditingEntry(null);
        } else {
            // Create new
            const newEntry = {
                id: Date.now(),
                date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
                time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
                title,
                content,
                mood,
                tags: ['Personal']
            };
            setEntries([newEntry, ...entries]);
        }
        setIsEntryModalOpen(false);
    };

    const handleEditEntry = (entry) => {
        setEditingEntry(entry);
        setIsEntryModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsEntryModalOpen(false);
        setEditingEntry(null); // Clear editing state when closing
    };

    const handleDeleteEntry = (id) => {
        setEntries(entries.filter(e => e.id !== id));
    };

    // --- Handlers: Sticky Notes ---
    const addStickyNote = (color) => {
        const newNote = {
            id: Date.now(),
            content: '',
            color: color
        };
        setStickyNotes([...stickyNotes, newNote]);
    };

    const updateStickyNote = (id, content) => {
        setStickyNotes(stickyNotes.map(note => note.id === id ? { ...note, content } : note));
    };

    const deleteStickyNote = (id) => {
        setStickyNotes(stickyNotes.filter(note => note.id !== id));
    };

    return (
        <div className="w-full h-full p-4 pt-28 overflow-y-auto pb-20 custom-scrollbar">

            {/* Top Grid: Mood & Sticky Notes */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
                <MoodTracker
                    selectedMood={selectedMood}
                    onSelectMood={setSelectedMood}
                />
                <StickyNotesBoard
                    notes={stickyNotes}
                    onAddNote={addStickyNote}
                    onDeleteNote={deleteStickyNote}
                    onUpdateNote={updateStickyNote}
                />
            </div>

            {/* Middle: Actions */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <PenTool className="text-gray-400" size={24} />
                    Journal Entries
                </h2>
                <button
                    onClick={() => setIsEntryModalOpen(true)}
                    className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-transform hover:scale-105 shadow-lg"
                >
                    <Plus size={20} />
                    <span>New Entry</span>
                </button>
            </div>

            {/* Bottom: Masonry Grid of Entries */}
            <JournalList
                entries={entries}
                onDeleteEntry={handleDeleteEntry}
                onEditEntry={handleEditEntry}
            />

            {/* New Entry Modal */}
            <JournalEntryModal
                isOpen={isEntryModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveEntry}
                initialData={editingEntry}
            />
        </div>
    );
};

export default JournalTemplate;
