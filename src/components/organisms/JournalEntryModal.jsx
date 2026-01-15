import React, { useState } from 'react';
import { X, Maximize2, MoreHorizontal, Calendar, Clock, Smile } from 'lucide-react';

const JournalEntryModal = ({ isOpen, onClose, onSave, initialData }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [mood, setMood] = useState('neutral');

    // Populate form if initialData exists (Edit Mode)
    React.useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setContent(initialData.content);
            setMood(initialData.mood || 'neutral');
        } else {
            // Reset for new entry
            setTitle('');
            setContent('');
            setMood('neutral');
        }
    }, [initialData, isOpen]);

    // Auto-resize textarea
    const textareaRef = React.useRef(null);

    React.useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset height
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'; // Set to scrollHeight
        }
    }, [content, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ title, content, mood });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[70] flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Drawer */}
            <div className="relative w-full max-w-4xl h-full bg-white shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
                <div className="flex items-center justify-between p-4 px-8 border-b border-gray-50">
                    <div className="flex items-center gap-2 text-gray-400">
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
                            <X size={20} />
                        </button>
                        {initialData && (
                            <>
                                <span className="h-4 w-[1px] bg-gray-200"></span>
                                <span className="text-xs font-medium uppercase tracking-wider flex items-center gap-1">
                                    Last edited {initialData.date}
                                </span>
                            </>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
                            <MoreHorizontal size={20} />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <form onSubmit={handleSubmit} className="px-12 py-8 max-w-3xl mx-auto space-y-8 min-h-full pb-32">
                        {/* Header Area */}
                        <div className="space-y-6">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Untitled"
                                    className="w-full text-5xl font-bold placeholder-gray-200 border-none focus:ring-0 outline-none p-0 text-gray-900 bg-transparent leading-tight"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    required
                                    autoFocus
                                />
                            </div>

                            {/* Metadata Row */}
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500 items-center">
                                <div className="flex items-center gap-2 px-1 py-1 rounded-md">
                                    <span className="text-gray-400 font-medium w-12">Mood</span>
                                    <div className="flex gap-1">
                                        {['happy', 'neutral', 'sad', 'productive', 'tired'].map(m => (
                                            <button
                                                key={m}
                                                type="button"
                                                onClick={() => setMood(m)}
                                                className={`w-7 h-7 rounded-sm flex items-center justify-center transition-all ${mood === m ? 'bg-gray-100 text-black' : 'text-gray-300 hover:text-gray-500 hover:bg-gray-50'}`}
                                                title={m}
                                            >
                                                {m === 'happy' && '😊'}
                                                {m === 'neutral' && '😐'}
                                                {m === 'sad' && '😔'}
                                                {m === 'productive' && '⚡'}
                                                {m === 'tired' && '😴'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Editor Area */}
                        <div className="w-full">
                            <textarea
                                ref={textareaRef}
                                placeholder="Press ' / ' for commands..."
                                className="w-full min-h-[500px] text-lg text-gray-700 placeholder-gray-300 border-none focus:ring-0 outline-none p-0 resize-none leading-loose font-serif overflow-hidden bg-transparent"
                                value={content}
                                onChange={e => setContent(e.target.value)}
                                required
                            />
                        </div>
                    </form>
                </div>

                {/* Floating Save Button */}
                <div className="absolute bottom-6 right-8">
                    <button
                        onClick={handleSubmit}
                        className="px-6 py-3 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl flex items-center gap-2"
                    >
                        <span>Save</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JournalEntryModal;
