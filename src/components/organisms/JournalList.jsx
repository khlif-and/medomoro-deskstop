import React from 'react';
import JournalEntryCard from '../molecules/JournalEntryCard';

const JournalList = ({ entries, onDeleteEntry, onEditEntry }) => {
    return (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {entries.length === 0 ? (
                <div className="col-span-full py-20 text-center text-gray-400 break-inside-avoid">
                    <p>No stories yet. Start writing your journey today.</p>
                </div>
            ) : (
                entries.map((entry) => (
                    <JournalEntryCard
                        key={entry.id}
                        entry={entry}
                        onDelete={onDeleteEntry}
                        onEdit={onEditEntry}
                    />
                ))
            )}
        </div>
    );
};

export default JournalList;
