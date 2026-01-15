import React, { useState } from 'react';
import FlashcardItem from '../molecules/FlashcardItem';
import { Plus, ChevronLeft, ChevronRight, Layers, Trash2 } from 'lucide-react';

const FlashcardWidget = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flashcards, setFlashcards] = useState(() => {
        const saved = localStorage.getItem('memo-flashcards');
        return saved ? JSON.parse(saved) : [
            { id: 1, question: "What is Atomic Design?", answer: "A methodology for creating design systems by breaking them down into atoms, molecules, organisms, templates, and pages." }
        ];
    });

    // Create Mode State
    const [isCreating, setIsCreating] = useState(false);
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');

    React.useEffect(() => {
        localStorage.setItem('memo-flashcards', JSON.stringify(flashcards));
    }, [flashcards]);

    const nextCard = () => {
        setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    };

    const prevCard = () => {
        setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    };

    const handleAddCard = () => {
        if (!newQuestion.trim() || !newAnswer.trim()) return;
        const newCard = {
            id: Date.now(),
            question: newQuestion,
            answer: newAnswer
        };
        setFlashcards([...flashcards, newCard]);
        setNewQuestion('');
        setNewAnswer('');
        setIsCreating(false);
        // Go to new card
        setCurrentIndex(flashcards.length);
    };

    const handleDeleteCard = () => {
        const newCards = flashcards.filter((_, index) => index !== currentIndex);
        setFlashcards(newCards);
        if (currentIndex >= newCards.length) {
            setCurrentIndex(Math.max(0, newCards.length - 1));
        }
    };

    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 h-full flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <Layers className="text-blue-500" size={20} />
                    <h2 className="text-lg font-bold text-gray-800">Flashcards</h2>
                </div>
                <div className="flex gap-2">
                    {flashcards.length > 0 && !isCreating && (
                        <button
                            onClick={handleDeleteCard}
                            className="p-2 hover:bg-gray-50 rounded-full text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <Trash2 size={18} />
                        </button>
                    )}
                    <button
                        onClick={() => setIsCreating(!isCreating)}
                        className={`p-2 rounded-full transition-colors ${isCreating ? 'bg-gray-100 text-gray-900 rotate-45' : 'hover:bg-gray-50 text-gray-400 hover:text-gray-600'}`}
                    >
                        <Plus size={18} />
                    </button>
                </div>
            </div>

            {isCreating ? (
                <div className="flex-1 flex flex-col gap-4 animate-in fade-in zoom-in duration-200">
                    <div>
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block">Question</label>
                        <textarea
                            className="w-full bg-gray-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none resize-none h-20"
                            placeholder="Enter question..."
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block">Answer</label>
                        <textarea
                            className="w-full bg-gray-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none resize-none h-24"
                            placeholder="Enter answer..."
                            value={newAnswer}
                            onChange={(e) => setNewAnswer(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={handleAddCard}
                        className="w-full py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                    >
                        Add Card
                    </button>
                </div>
            ) : (
                <>
                    {flashcards.length > 0 ? (
                        <>
                            <div className="flex-1 flex items-center justify-center p-4 relative">
                                <FlashcardItem
                                    question={flashcards[currentIndex].question}
                                    answer={flashcards[currentIndex].answer}
                                />
                            </div>

                            <div className="flex items-center justify-between mt-6 px-2">
                                <button onClick={prevCard} className="p-2 hover:bg-gray-50 rounded-full text-gray-400 hover:text-gray-600">
                                    <ChevronLeft size={20} />
                                </button>
                                <span className="text-sm font-medium text-gray-400">
                                    {currentIndex + 1} / {flashcards.length}
                                </span>
                                <button onClick={nextCard} className="p-2 hover:bg-gray-50 rounded-full text-gray-400 hover:text-gray-600">
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                            <Layers size={48} className="mb-4 text-gray-200" />
                            <p>No cards yet.</p>
                            <button onClick={() => setIsCreating(true)} className="mt-2 text-blue-500 font-medium hover:underline">
                                Create one
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default FlashcardWidget;
